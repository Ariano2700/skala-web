import type { APIRoute } from "astro";

export const prerender = false;

// Proxy server-to-server hacia manager-skala. El navegador del consumidor
// SOLO habla con esta ruta (mismo origen que el resto del sitio); ni el
// write token de Sanity ni el x-api-key compartido con manager-skala pasan
// nunca por el bundle del cliente — viven únicamente en variables de
// entorno sin prefijo PUBLIC_, leídas acá en el servidor.
//
// Esta ruta también es la última línea de defensa de validación: nunca
// confía en lo que mande el formulario sin revisarlo, y arma el payload
// campo por campo (nunca hace spread del body) para no poder colar campos
// que no le corresponden a un consumidor (ej. "status").

const DOCUMENT_TYPES = new Set(["dni", "ce", "pasaporte", "ruc"]);
const COMPLAINT_TYPES = new Set(["queja", "reclamo"]);

interface ComplaintPayload {
  type: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  address?: string;
  phone?: string;
  email: string;
  contractedService: string;
  claimedAmount?: number;
  detail: string;
  consumerRequest: string;
  /** Honeypot: si viene con contenido, es un bot — se descarta en silencio. */
  website?: string;
}

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const POST: APIRoute = async ({ request }) => {
  let body: Partial<ComplaintPayload>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" });
  }

  // Honeypot: los bots suelen rellenar todos los inputs, incluido uno oculto
  // que un consumidor real nunca ve ni completa. Se responde 200 "falso" a
  // propósito para no delatar el honeypot a quien esté scrapeando el sitio.
  if (isNonEmptyString(body.website)) {
    return jsonResponse(200, { ok: true, complaintNumber: null });
  }

  const missing: string[] = [];
  if (!COMPLAINT_TYPES.has(body.type ?? "")) missing.push("type");
  if (!isNonEmptyString(body.fullName)) missing.push("fullName");
  if (!DOCUMENT_TYPES.has(body.documentType ?? "")) missing.push("documentType");
  if (!isNonEmptyString(body.documentNumber)) missing.push("documentNumber");
  if (!isNonEmptyString(body.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!))
    missing.push("email");
  if (!isNonEmptyString(body.contractedService)) missing.push("contractedService");
  if (!isNonEmptyString(body.detail)) missing.push("detail");
  if (!isNonEmptyString(body.consumerRequest)) missing.push("consumerRequest");

  let claimedAmount: number | undefined;
  if (body.claimedAmount !== undefined && body.claimedAmount !== null && body.claimedAmount !== ("" as unknown)) {
    const parsed = Number(body.claimedAmount);
    if (Number.isFinite(parsed) && parsed >= 0) {
      claimedAmount = parsed;
    } else {
      missing.push("claimedAmount");
    }
  }

  if (missing.length > 0) {
    return jsonResponse(400, { ok: false, error: "missing_fields", fields: missing });
  }

  const apiUrl = import.meta.env.MANAGER_SKALA_API_URL;
  const apiKey = import.meta.env.COMPLAINTS_SUBMIT_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error(
      "[complaints/create] Faltan MANAGER_SKALA_API_URL y/o COMPLAINTS_SUBMIT_API_KEY en el entorno del servidor.",
    );
    return jsonResponse(503, { ok: false, error: "not_configured" });
  }

  // Payload campo por campo — nunca `...body` — para que un cliente
  // malicioso no pueda inyectar `status`, `companyResponse` u otro campo de
  // gestión interna que ese endpoint de manager-skala no debería aceptar de
  // una fuente pública.
  const payload = {
    type: body.type,
    fullName: body.fullName!.trim(),
    documentType: body.documentType,
    documentNumber: body.documentNumber!.trim(),
    address: isNonEmptyString(body.address) ? body.address!.trim() : undefined,
    phone: isNonEmptyString(body.phone) ? body.phone!.trim() : undefined,
    email: body.email!.trim(),
    contractedService: body.contractedService!.trim(),
    claimedAmount,
    detail: body.detail!.trim(),
    consumerRequest: body.consumerRequest!.trim(),
  };

  try {
    const upstream = await fetch(
      `${apiUrl.replace(/\/$/, "")}/api/public/complaints/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      console.error(
        `[complaints/create] manager-skala respondió ${upstream.status}: ${text.slice(0, 300)}`,
      );
      return jsonResponse(502, { ok: false, error: "upstream_error" });
    }

    const data = await upstream.json().catch(() => ({}) as Record<string, unknown>);
    return jsonResponse(200, {
      ok: true,
      complaintNumber: typeof data.complaintNumber === "number" ? data.complaintNumber : null,
    });
  } catch (error) {
    console.error("[complaints/create] Error de red hacia manager-skala:", error);
    return jsonResponse(502, { ok: false, error: "network_error" });
  }
};
