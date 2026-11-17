import { defineMiddleware } from "astro:middleware";

// Caché en el CDN de Netlify para las páginas SSR (las que leen Sanity en
// cada visita: /portafolio, /proyecto/[slug], /cobertura-eventos,
// /clientes, ...). Sin esto, CADA visita esperaba la consulta a Sanity
// (useCdn: false) antes de recibir el primer byte de HTML.
//
// - Netlify-CDN-Cache-Control (sólo lo lee el CDN de Netlify):
//     s-maxage=60                 → 1 minuto se sirve directo del CDN.
//     stale-while-revalidate=1d   → pasado ese minuto, el CDN sigue
//                                   respondiendo al instante con la copia
//                                   que tiene y regenera la página en
//                                   segundo plano. El contenido nuevo de
//                                   Sanity aparece solo, sin redeploy.
//     durable                     → la copia se comparte entre todos los
//                                   nodos del CDN (no sólo el más cercano).
// - Cache-Control (navegador): siempre revalida, así nadie ve una versión
//   vieja guardada en su propio navegador.
//
// Las páginas prerenderizadas (prerender = true) ya son archivos estáticos
// del CDN: este middleware sólo corre al construirlas y no les afecta.
const CDN_CACHE =
  "public, durable, s-maxage=60, stale-while-revalidate=86400";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (
    context.isPrerendered ||
    context.request.method !== "GET" ||
    response.status !== 200 ||
    !response.headers.get("content-type")?.includes("text/html") ||
    response.headers.has("Netlify-CDN-Cache-Control")
  ) {
    return response;
  }

  // Los headers de la respuesta que arma Astro pueden venir inmutables:
  // se copian a una Response nueva (mismo body en streaming, sin buffer).
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("Netlify-CDN-Cache-Control", CDN_CACHE);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
