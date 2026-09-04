import type { APIRoute } from "astro";
import { getProjectsPage } from "../../../sanity/project/api";
import { adaptSanityProjects } from "../../../data/portafolio";

export const prerender = false;

// Página de proyectos para el scroll infinito de /portafolio (ver
// PortfolioGridClient.tsx + useInfinitePortfolio.ts). Mismo patrón que
// /api/events/[slug]/gallery.ts: offset/limit, respuesta liviana con
// `hasMore` para que el cliente sepa si sigue pidiendo.
export const GET: APIRoute = async ({ url }) => {
  const category = url.searchParams.get("category") || "all";
  const offsetParam = Number(url.searchParams.get("offset") ?? "0");
  const limitParam = Number(url.searchParams.get("limit") ?? "9");

  const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0;
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 24)
    : 9;

  const { items, total } = await getProjectsPage({ category, offset, limit });
  const adapted = adaptSanityProjects(items);

  return new Response(
    JSON.stringify({
      items: adapted,
      total,
      hasMore: offset + items.length < total,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
      },
    },
  );
};
