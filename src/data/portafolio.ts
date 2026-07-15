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

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
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
  details?: {
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    tools: string[];
    duration: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "steffy_boutique",
    title: "Steffy Boutique",
    client: "Steffy Boutique",
    categories: ["foto"],
    categoryLabel: "Fotografía",
    layout: "third",
    accent: "#35d9f1",
    overlay: "Ver galería",
    media: [
      {
        type: "image",
        src: "/portafolio/steffy_boutique/steffy_boutique.jpeg",
        alt: "Steffy Boutique",
      },
      { type: "video", src: "/portafolio/steffy_boutique/steffy_boutique.mp4" },
    ],
    details: {
      description:
        "Sesión de moda y video para Steffy Boutique, con foco en producto y estilo.",
      challenge: "Mostrar la ropa con estilo editorial y dinámico.",
      solution: "Fotografía de producto y reel de tendencias.",
      results: ["Catálogo visual", "Reel de tendencias"],
      tools: ["Lightroom", "CapCut"],
      duration: "1 semana",
    },
  },
  {
    id: "psicologa_fiorella",
    title: "Psicóloga Fiorella",
    client: "Fiorella",
    categories: ["social"],
    categoryLabel: "Social Media",
    layout: "third",
    accent: "#f135a0",
    overlay: "Ver resultados",
    media: [
      {
        type: "image",
        src: "/portafolio/psicologa_fiorella/psicologa_fiorella.jpeg",
        alt: "Psicóloga Fiorella",
      },
      {
        type: "video",
        src: "/portafolio/psicologa_fiorella/psicologa_fiorella.mp4",
      },
    ],
    details: {
      description:
        "Contenido para redes de Psicóloga Fiorella, con imagen y video de acercamiento humano.",
      challenge: "Generar cercanía y confianza con la audiencia.",
      solution: "Piezas visuales cálidas y reel de presentación.",
      results: ["Contenido para RRSS", "Reel de presentación"],
      tools: ["Canva", "Premiere Pro"],
      duration: "2 semanas",
    },
  },
  {
    id: "mamma_pizza",
    title: "Mamma Pizza",
    client: "Mamma Pizza",
    categories: ["foto"],
    categoryLabel: "Fotografía",
    layout: "narrow tall",
    accent: "#35d9f1",
    overlay: "Ver galería",
    media: [
      {
        type: "image",
        src: "/portafolio/mamma_pizza/mamma_pizza.jpeg",
        alt: "Mamma Pizza",
      },
      { type: "video", src: "/portafolio/mamma_pizza/mamma_pizza.mp4" },
    ],
    details: {
      description:
        "Fotografía de producto y video corto para Mamma Pizza, pensado para redes y carta digital.",
      challenge:
        "Hacer que la comida se vea apetitosa y coherente con la marca.",
      solution:
        "Iluminación cálida, dirección de arte y edición de reel corto.",
      results: ["Fotos para carta y RRSS", "Reel promocional"],
      tools: ["Lightroom", "CapCut"],
      duration: "1 semana",
    },
  },
  {
    id: "lions",
    title: "Lions",
    client: "Lions",
    categories: ["brand"],
    categoryLabel: "Branding",
    layout: "wide",
    accent: "#f1a135",
    overlay: "Ver proyecto",
    media: [
      { type: "image", src: "/portafolio/lions/lions.jpeg", alt: "Lions" },
      { type: "video", src: "/portafolio/lions/lions.mp4" },
    ],
    details: {
      description:
        "Identidad visual y pieza audiovisual para Lions, con dirección de arte y edición de video.",
      challenge:
        "Comunicar la personalidad de la marca con recursos reales de imagen y video.",
      solution:
        "Producimos sesión fotográfica y video promocional con estilo coherente.",
      results: ["Identidad aplicada", "Pieza en video lista para redes"],
      tools: ["Photoshop", "Premiere Pro"],
      duration: "3 semanas",
    },
  },
  {
    id: "casa_forno",
    title: "Casa Forno",
    client: "Casa Forno",
    categories: ["video"],
    categoryLabel: "Video",
    layout: "half",
    accent: "#f135a0",
    overlay: "Ver video",
    media: [{ type: "video", src: "/portafolio/casa-forno.mp4" }],
    details: {
      description: "Pieza audiovisual para Casa Forno.",
      challenge: "Comunicar el producto con una sola pieza en video.",
      solution: "Edición de video promocional.",
      results: ["Video promocional listo"],
      tools: ["Premiere Pro"],
      duration: "1 semana",
    },
  },

  {
    id: "orthodentix",
    title: "Orthodentix",
    client: "Orthodentix",
    categories: ["video"],
    categoryLabel: "Video",
    layout: "half",
    accent: "#f135a0",
    overlay: "Ver video",
    media: [{ type: "video", src: "/portafolio/orthodentix.mp4" }],
    details: {
      description: "Pieza audiovisual para Orthodentix.",
      challenge: "Explicar el servicio con una pieza en video.",
      solution: "Edición de video institucional.",
      results: ["Video institucional listo"],
      tools: ["Premiere Pro"],
      duration: "1 semana",
    },
  },
];

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
  return project.media.find((m) => m.type === "image") ?? project.media[0];
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

  return {
    id: project.slug || project.id,
    title: project.title,
    client: project.client ?? "Skala",
    categories,
    categoryLabel: primaryLabel,
    layout: "third",
    accent,
    overlay: "Ver proyecto",
    media,
    featured: project.featured,
    details: {
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      results: project.results.map((r) => r.text),
      tools: project.tools,
      duration: project.duration ?? "",
    },
  };
};

/** Adapta una lista de `Project` de Sanity al modelo `PortfolioProject[]`. */
export const adaptSanityProjects = (projects: Project[]): PortfolioProject[] =>
  projects
    .map(adaptSanityProject)
    .filter((p): p is PortfolioProject => p !== null);
