import type { APIRoute } from "astro";
import { adaptSanityProjects } from "../data/portafolio";
import { getAllProjects } from "../sanity/project/api";
import { getAllEvents } from "../sanity/event/api";
import { serviceCategories } from "../data/serviceCategories";

interface SitemapImage {
  loc: string;
  title?: string;
}

interface SitemapEntry {
  loc: string;
  /** YYYY-MM-DD. Se omite cuando no hay una fecha real de modificación —
   * un valor inventado es peor para el crawler que no declarar lastmod. */
  lastmod?: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
  images?: SitemapImage[];
}

// Páginas 100% estáticas (no vienen de un CMS): no hay una fuente confiable
// de "última modificación" real, así que no se declara lastmod para ellas.
const staticPages: SitemapEntry[] = [
  { loc: "/", changefreq: "monthly", priority: 1.0 },
  { loc: "/portafolio/", changefreq: "monthly", priority: 0.9 },
  { loc: "/servicios/", changefreq: "monthly", priority: 0.9 },
  { loc: "/cobertura-eventos/", changefreq: "weekly", priority: 0.8 },
  { loc: "/nosotros/", changefreq: "monthly", priority: 0.7 },
  { loc: "/preguntas-frecuentes/", changefreq: "monthly", priority: 0.7 },
  ...serviceCategories.map(
    (category): SitemapEntry => ({
      loc: `/servicios/${category.slug}/`,
      changefreq: "monthly",
      priority: 0.8,
    }),
  ),
  // Legales: baja prioridad (no compiten por tráfico), pero indexables.
  { loc: "/politica-de-privacidad/", changefreq: "monthly", priority: 0.2 },
  { loc: "/politica-de-cookies/", changefreq: "monthly", priority: 0.2 },
  { loc: "/terminos-y-condiciones/", changefreq: "monthly", priority: 0.2 },
  { loc: "/libro-de-reclamaciones/", changefreq: "monthly", priority: 0.2 },
];

const toDateOnly = (iso?: string) => iso?.slice(0, 10);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderImage = (image: SitemapImage) => `
    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>${
        image.title
          ? `\n      <image:title>${escapeXml(image.title)}</image:title>`
          : ""
      }
    </image:image>`;

const renderUrl = (siteUrl: URL, page: SitemapEntry) => `  <url>
    <loc>${siteUrl.href.replace(/\/$/, "")}${page.loc}</loc>${
      page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
    }
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${(page.images ?? []).map(renderImage).join("")}
  </url>`;

const getSiteMap = (siteUrl: URL, pages: SitemapEntry[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map((page) => renderUrl(siteUrl, page)).join("\n")}
</urlset>
`;

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site
    ? new URL(site)
    : new URL("https://skalaagencia.netlify.app");

  // Se buscan dentro del handler (no a nivel de módulo) para que cada
  // request traiga la lista vigente de Sanity, en vez de quedarse con la
  // que se resolvió cuando la función serverless arrancó en frío.
  const sanityProjects = await getAllProjects();
  const sourceProjects = adaptSanityProjects(sanityProjects);

  const projectPages: SitemapEntry[] = sourceProjects.map((project) => ({
    loc: `/proyecto/${project.id}/`,
    lastmod: toDateOnly(project.updatedAt),
    changefreq: "monthly",
    priority: 0.8,
    images: project.mainImage
      ? [{ loc: project.mainImage, title: project.title }]
      : undefined,
  }));

  const events = await getAllEvents();
  const eventPages: SitemapEntry[] = events.map((event) => ({
    loc: `/cobertura-eventos/${event.slug}/`,
    lastmod: toDateOnly(event.updatedAt),
    changefreq: "weekly",
    priority: 0.7,
    images: event.hero.imageUrl
      ? [{ loc: event.hero.imageUrl, title: event.title }]
      : undefined,
  }));

  const pages = [...staticPages, ...projectPages, ...eventPages];

  return new Response(getSiteMap(baseUrl, pages), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
