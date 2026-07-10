import { FaWandMagicSparkles } from "react-icons/fa6";
import {
  FiBarChart2,
  FiCamera,
  FiCompass,
  FiFilm,
  FiLayers,
  FiMessageCircle,
  FiPenTool,
  FiPlay,
  FiShare2,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiVideo,
} from "react-icons/fi";

export const services = [
  {
    icon: FiPenTool,
    title: "Branding & Identidad Visual",
    description:
      "Construimos la personalidad visual de tu marca o la reordenamos para que comunique mejor y con más fuerza.",
    tags: ["Logo", "Brandbook", "Paleta", "Tipografía"],
  },
  {
    icon: FiVideo,
    title: "Producción Audiovisual",
    description:
      "Dirección, grabación y producción de contenido audiovisual profesional: spots, reels, corporativos y más.",
    tags: ["Spots", "Reels", "Corporativo", "Docu-style"],
  },
  {
    icon: FiCamera,
    title: "Fotografía",
    description:
      "Sesiones de producto, retrato y cobertura de eventos con dirección de arte incluida.",
    tags: ["Retrato", "Producto", "Coberturas", "Editorial"],
  },
  {
    icon: FiPlay,
    title: "Edición & Post Producción",
    description:
      "Color, motion graphics, subtítulos y retoque fotográfico con acabado profesional.",
    tags: ["Color", "Motion", "Retoque", "Subtítulos"],
  },
  {
    icon: FiMessageCircle,
    title: "Social Media & Community",
    description:
      "Estrategia de redes, publicación, comunidad y respuesta con foco en continuidad.",
    tags: ["Instagram", "TikTok", "LinkedIn", "Calendario"],
  },
  {
    icon: FiTrendingUp,
    title: "Marketing & Campañas",
    description:
      "Planificación de campañas, análisis de métricas y optimización para escalar resultados.",
    tags: ["Meta Ads", "Google", "Métricas", "Estrategia"],
  },
] as const;

export const singleServices = [
  {
    icon: FiCamera,
    label: "Sesión de fotos retrato",
    cta_message: "Hola, quiero saber más sobre la sesión de fotos de retrato.",
  },
  {
    icon: FaWandMagicSparkles,
    label: "Sesión de fotos producto",
    cta_message: "Hola, quiero saber más sobre la sesión de fotos de producto.",
  },
  {
    icon: FiFilm,
    label: "Cobertura de evento",
    cta_message: "Hola, quiero saber más sobre la cobertura de evento.",
  },
  {
    icon: FiPlay,
    label: "Edición de video",
    cta_message: "Hola, quiero saber más sobre la edición de video.",
  },
  {
    icon: FiPenTool,
    label: "Diseño de logo",
    cta_message: "Hola, quiero saber más sobre el diseño de logo.",
  },
  {
    icon: FiLayers,
    label: "Manual de marca",
    cta_message: "Hola, quiero saber más sobre el manual de marca.",
  },
  {
    icon: FiBarChart2,
    label: "Diseño de presentación",
    cta_message: "Hola, quiero saber más sobre el diseño de presentación.",
  },
  {
    icon: FiTarget,
    label: "Campaña puntual",
    cta_message: "Hola, quiero saber más sobre la campaña puntual.",
  },
  {
    icon: FiShare2,
    label: "Pack de contenido RRSS",
    cta_message: "Hola, quiero saber más sobre el pack de contenido para RRSS.",
  },
  {
    icon: FiVideo,
    label: "Spot publicitario",
    cta_message: "Hola, quiero saber más sobre el spot publicitario.",
  },
  {
    icon: FiCompass,
    label: "Brochure / catálogo",
    cta_message: "Hola, quiero saber más sobre el brochura o catálogo.",
  },
  {
    icon: FiStar,
    label: "Consultoría de marca",
    cta_message: "Hola, quiero saber más sobre la consultoría de marca.",
  },
] as const;
