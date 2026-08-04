import type { APIRoute } from "astro";
import { adaptSanityProjects } from "../data/portafolio";
import { getAllProjects } from "../sanity/project/api";
import { getAllEvents } from "../sanity/event/api";

const staticPages = [
  {
    loc: "/",
    lastmod: "2026-07-30",
    changefreq: "monthly" as const,
    priority: 1.0,
  },
  {
    loc: "/portafolio/",
    lastmod: "2026-07-30",
    changefreq: "monthly" as const,
    priority: 0.9,
  },
  {
    loc: "/servicios/",
    lastmod: "2026-08-04",
    changefreq: "monthly" as const,
    priority: 0.9,
  },
  {
    loc: "/cobertura-eventos/",
    lastmod: "2026-07-30",
    changefreq: "weekly" as const,
    priority: 0.8,
  },
];

// Proyectos desde Sanity (CMS) con respaldo en la data estática local.
const sanityProjects = await getAllProjects();
const sourceProjects =
  sanityProjects.length > 0 ? adaptSanityProjects(sanityProjects) : [];

const projectPages = sourceProjects.map((project) => ({
  loc: `/proyecto/${project.id}/`,
  lastmod: "2026-07-30",
  changefreq: "monthly" as const,
  priority: 0.8,
}));

const events = await getAllEvents();
const eventPages = events.map((event) => ({
  loc: `/cobertura-eventos/${event.slug}/`,
  lastmod: "2026-07-30",
  changefreq: "weekly" as const,
  priority: 0.7,
}));

const pages = [...staticPages, ...projectPages, ...eventPages];

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
  const baseUrl = site ? new URL(site) : new URL("https://skalaagencia.netlify.app");
  return new Response(getSiteMap(baseUrl), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
