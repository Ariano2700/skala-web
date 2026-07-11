// Modelo de datos del portafolio.
// Cada proyecto puede tener múltiples recursos (imagen y/o video).
// Los assets viven en /public/portafolio/<slug>/... o en la raíz para videos sueltos.

export type PortfolioCategoryValue =
  | "all"
  | "brand"
  | "foto"
  | "video"
  | "social";

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
  category: Exclude<PortfolioCategoryValue, "all">;
  categoryLabel: string;
  layout: "wide" | "narrow tall" | "narrow" | "half" | "third" | "full";
  accent: "brand" | "foto" | "video" | "social";
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
    category: "foto",
    categoryLabel: "Fotografía",
    layout: "third",
    accent: "foto",
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
    category: "social",
    categoryLabel: "Social Media",
    layout: "third",
    accent: "social",
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
    category: "foto",
    categoryLabel: "Fotografía",
    layout: "narrow tall",
    accent: "foto",
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
    category: "brand",
    categoryLabel: "Branding",
    layout: "wide",
    accent: "brand",
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
    category: "video",
    categoryLabel: "Video",
    layout: "half",
    accent: "video",
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
    category: "video",
    categoryLabel: "Video",
    layout: "half",
    accent: "video",
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

export const portfolioFilters: {
  label: string;
  value: PortfolioCategoryValue;
}[] = [
  { label: "Todos", value: "all" },
  { label: "Branding", value: "brand" },
  { label: "Fotografía", value: "foto" },
  { label: "Video", value: "video" },
  { label: "Social Media", value: "social" },
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

export const getPortfolioAccentClass = (
  project: PortfolioProjectItem,
): string => {
  if (project.accent === "brand") return "bg-[#f1a135]";
  if (project.accent === "foto") return "bg-[#35d9f1]";
  if (project.accent === "video") return "bg-[#f135a0]";
  return "bg-skala-accent";
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
