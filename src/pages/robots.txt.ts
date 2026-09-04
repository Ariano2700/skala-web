import type { APIRoute } from "astro";

// Netlify inyecta CONTEXT en runtime: "production" | "deploy-preview" |
// "branch-deploy" | "dev". El sitio corre bajo SSR (output: "server"), así
// que este endpoint se ejecuta de nuevo en cada request y puede leerlo.
// Sin este chequeo, cualquier deploy preview o branch deploy serviría el
// mismo "Allow: /" (con Astro.site apuntando siempre a producción) — si un
// crawler descubre esa URL de preview, quedaría libre para indexarla.
const isProductionDeploy = () =>
  (process.env.CONTEXT ?? "production") === "production";

const getRobotsTxt = (sitemapURL: URL) => {
  if (!isProductionDeploy()) {
    return "User-agent: *\nDisallow: /\n";
  }

  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapURL.href}
`;
};

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site
    ? new URL(site)
    : new URL("https://skalaagencia.netlify.app");
  const sitemapURL = new URL("sitemap.xml", baseUrl);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
