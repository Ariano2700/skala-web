import type { APIRoute } from "astro";

const pages = [
  {
    loc: "/",
    lastmod: "2026-06-20",
    changefreq: "monthly" as const,
    priority: 1.0,
  },
  {
    loc: "/portafolio/",
    lastmod: "2026-06-20",
    changefreq: "monthly" as const,
    priority: 0.9,
  },
];

const getSiteMap = (siteUrl: URL) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl.href.replace(/\/$/, "")}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? new URL(site) : new URL("https://skala.netlify.app");
  return new Response(getSiteMap(baseUrl), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
