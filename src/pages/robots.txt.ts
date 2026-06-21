import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? new URL(site) : new URL("https://skalaagencia.netlify.app");
  const sitemapURL = new URL("sitemap.xml", baseUrl);
  return new Response(getRobotsTxt(sitemapURL));
};
