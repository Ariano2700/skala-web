// Modelo de datos del portafolio.
// Cada proyecto puede tener múltiples recursos (imagen y/o video).
// Los assets viven en /public/portafolio/<slug>/... o en la raíz para videos sueltos.

export type PortfolioCategoryValue = "all" | (string & {});

export interface PortfolioMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
  /** Poster para videos (opcional, mejora la carga). */
  poster?: string;
}

/** Una imagen del comparador antes/después. */
export interface PortfolioBeforeAfterImage {
  src: string;
  alt?: string;
}

/** Un par antes/después dentro de la galería comparativa de un proyecto. */
export interface PortfolioBeforeAfterPair {
  title?: string;
  caption?: string;
  before: PortfolioBeforeAfterImage;
  after: PortfolioBeforeAfterImage;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  /** Slug del cliente registrado (schema `client`), si el proyecto está
   * vinculado a uno. Permite enlazar a `/clientes/[slug]` en el detalle. */
  clientSlug?: string;
  /** Logo del cliente registrado, si tiene uno cargado. Distingue en el
   * detalle un cliente vinculado (con marca visible) de uno en texto libre. */
  clientLogoUrl?: string;
  mainImage?: string;
  /** ISO datetime de la última modificación en Sanity (ausente en proyectos de la data estática). Usado para el `lastmod` del sitemap. */
  updatedAt?: string;
  /** Categorías del proyecto (un proyecto puede tener varias). */
  categories: string[];
  /** Etiqueta de la categoría principal (para mostrar en la tarjeta/modal). */
  categoryLabel: string;
  layout: "wide" | "narrow tall" | "narrow" | "half" | "third" | "full";
  /** Color de acento (hex) dinámico desde Sanity. */
  accent: string;
  overlay: string;
  /** Recursos del proyecto (imagen y/o video). */
  media: PortfolioMedia[];
  featured?: boolean;
  /**
   * Pares de imágenes para el slider comparativo antes/después en la página
   * de detalle. Opcional: solo se pinta la sección cuando hay al menos un par
   * completo (ver `src/pages/proyecto/[slug].astro`). Viene del campo
   * `beforeAfterGallery` en Sanity.
   */
  beforeAfterGallery?: PortfolioBeforeAfterPair[];
  /** SEO editorial desde Sanity: si falta, la página cae a sus valores por defecto. */
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
  details?: {
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    tools: string[];
    duration: string;
    year?: number;
    externalUrl?: string;
  };
}

export type PortfolioProjectItem = PortfolioProject;

export const getPortfolioGridClass = (
  project: PortfolioProjectItem,
): string => {
  if (project.layout === "wide") return "col-span-12 lg:col-span-8";
  if (project.layout === "narrow tall")
    return "col-span-12 lg:col-span-4 lg:row-span-2";
  if (project.layout === "narrow") return "col-span-12 lg:col-span-4";
  if (project.layout === "half") return "col-span-12 md:col-span-6";
  if (project.layout === "third")
    return "col-span-12 md:col-span-6 lg:col-span-4";
  return "col-span-12";
};

/**
 * Devuelve el estilo CSS en línea para el color de acento del proyecto.
 * El acento es dinámico (hex) y viene de Sanity; si no hay color, usa el
 * acento por defecto del tema.
 */
export const getPortfolioAccentStyle = (
  project: PortfolioProjectItem,
): Record<string, string> => {
  return project.accent
    ? { backgroundColor: project.accent }
    : { backgroundColor: "var(--color-skala-accent)" };
};

/** Recurso de portada: prioriza imagen, si no hay usa el primer video. */
export const getCoverMedia = (
  project: PortfolioProjectItem,
): PortfolioMedia => {
  return project.mainImage ? { type: "image", src: project.mainImage } : project.media[0];
};

/** Conteo de recursos por tipo para mostrar en el modal. */
export const countMedia = (
  project: PortfolioProjectItem,
): { images: number; videos: number } => {
  return {
    images: project.media.filter((m) => m.type === "image").length,
    videos: project.media.filter((m) => m.type === "video").length,
  };
};

// ---------------------------------------------------------------------------
// Adaptador Sanity -> modelo de portafolio
// ---------------------------------------------------------------------------
// El modelo de Sanity (`Project`) usa `categories[]`, `mainImage` y `gallery`,
// mientras que los componentes del portafolio esperan `categories`, `categoryLabel`,
// `layout`, `accent`, `overlay` y `media[]`. Este adaptador traduce un proyecto
// de Sanity al formato `PortfolioProject` para reutilizar toda la UI existente.
//
// IMPORTANTE: las categorías son 100% dinámicas. No hay un mapa fijo de
// slugs -> valores: el slug, la etiqueta y el color de acento se toman
// directamente de cada documento `category` en Sanity.

import type { Project, ProjectMedia } from "../sanity/project/project-mapper";
import type { Category } from "../sanity/category/category-mapper";

/** Color de acento por defecto (tema) cuando una categoría no define color. */
const DEFAULT_ACCENT = "#5cd8fc";

/**
 * Detecta si una URL de Sanity corresponde a un video.
 * Los videos de Sanity viven bajo `/files/` y las imágenes bajo `/images/`.
 * Como respaldo, también se reconocen extensiones de video comunes.
 */
const isVideoUrl = (url: string): boolean => {
  if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(url)) return true;
  return /\/files\//i.test(url) || /cdn\.sanity\.io\/.*\/files\//i.test(url);
};

/** Convierte la galería de Sanity (imagen/video) al formato `PortfolioMedia`. */
const mapGalleryToMedia = (gallery: ProjectMedia[]): PortfolioMedia[] => {
  if (gallery.length === 0) return [];
  return gallery.map((item) => ({
    type: isVideoUrl(item.url) ? "video" : "image",
    src: item.url,
    alt: "alt" in item ? item.alt : item.caption,
  }));
};

/**
 * Devuelve el color de acento de una categoría (dinámico desde Sanity).
 * Fallback al color por defecto del tema si la categoría no define ninguno.
 */
const categoryAccent = (category?: Category): string =>
  category?.accent || DEFAULT_ACCENT;

/**
 * Adapta un `Project` de Sanity al modelo `PortfolioProject`.
 * Si el proyecto no tiene galería, devuelve `null` (se filtra en la capa de página).
 *
 * Nota: la `mainImage` NO se incluye en `media` (es solo portada), por lo que
 * los KPIs de imágenes/videos solo cuentan la galería real del proyecto.
 */
export const adaptSanityProject = (
  project: Project,
): PortfolioProject | null => {
  // Categorías dinámicas: usamos el slug real de Sanity como valor.
  const categories = Array.from(
    new Set((project.categories ?? []).map((c) => c.slug).filter(Boolean)),
  );
  if (categories.length === 0) categories.push("sin-categoria");

  // Presentación basada en la primera categoría (para acento y etiqueta).
  const primary = project.categories?.[0];
  const primaryLabel = primary?.title || categories[0];
  const accent = categoryAccent(primary);

  // Galería (imagen/video) — excluye la mainImage para no duplicar en los KPIs.
  const media = mapGalleryToMedia(project.gallery);

  if (media.length === 0) return null;

  // Antes/Después: cada par solo entra si trae las dos imágenes completas.
  const beforeAfterGallery = (project.beforeAfterGallery ?? [])
    .filter((pair) => pair.before?.url && pair.after?.url)
    .map((pair) => ({
      title: pair.title,
      caption: pair.caption,
      before: { src: pair.before!.url, alt: pair.before!.alt },
      after: { src: pair.after!.url, alt: pair.after!.alt },
    }));

  return {
    id: project.slug || project.id,
    title: project.title,
    client: project.client ?? "Skala",
    clientSlug: project.clientRef?.slug,
    clientLogoUrl: project.clientRef?.logoUrl,
    mainImage: project.mainImage?.url,
    updatedAt: project.updatedAt,
    categories,
    categoryLabel: primaryLabel,
    layout: "third",
    accent,
    overlay: "Ver proyecto",
    media,
    featured: project.featured,
    beforeAfterGallery:
      beforeAfterGallery.length > 0 ? beforeAfterGallery : undefined,
    seo: project.seo
      ? {
          metaTitle: project.seo.metaTitle,
          metaDescription: project.seo.metaDescription,
          ogImageUrl: project.seo.ogImageUrl,
        }
      : undefined,
    details: {
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      results: project.results.map((r) => r.text),
      tools: project.tools,
      duration: project.duration ?? "",
      externalUrl: project.externalUrl,
      year: project.year,
    },
  };
};

/** Adapta una lista de `Project` de Sanity al modelo `PortfolioProject[]`. */
export const adaptSanityProjects = (projects: Project[]): PortfolioProject[] =>
  projects
    .map(adaptSanityProject)
    .filter((p): p is PortfolioProject => p !== null);
