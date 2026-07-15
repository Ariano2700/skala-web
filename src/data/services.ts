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
  FiHeart,
  FiBriefcase,
  FiSmile,
  FiEdit3,
  FiInstagram,
} from "react-icons/fi";

export const services = [
  // 1. Producción Audiovisual
  {
    icon: FiHeart,
    title: "Eventos Sociales",
    description:
      "Cobertura cinematográfica para matrimonios y quinceañeros, enfocada en capturar la narrativa emocional y los momentos clave.",
    tags: ["Matrimonios", "Quinceañeros", "Cine"],
    category: "audiovisual",
  },
  {
    icon: FiSmile,
    title: "Celebraciones Privadas",
    description:
      "Registro profesional de cumpleaños, aniversarios y fiestas con un estilo dinámico.",
    tags: ["Cumpleaños", "Aniversarios", "Fiestas"],
    category: "audiovisual",
  },
  {
    icon: FiBriefcase,
    title: "Sector Corporativo",
    description:
      "Producción de videos institucionales, grabación de conferencias, lanzamientos de marca y contenido empresarial.",
    tags: ["Institucional", "Conferencias", "Lanzamientos"],
    category: "audiovisual",
  },
  {
    icon: FiCamera,
    title: "Fotografía Profesional",
    description:
      "Cobertura de eventos, sesiones de retrato corporativo, marca personal y fotografía de producto.",
    tags: ["Retrato", "Producto", "Eventos"],
    category: "audiovisual",
  },
  {
    icon: FiEdit3,
    title: "Edición y Montaje",
    description:
      "Servicio de edición avanzada, transiciones profesionales y diseño sonoro.",
    tags: ["Edición", "Transiciones", "Diseño sonoro"],
    category: "audiovisual",
  },
  {
    icon: FiFilm,
    title: "Corrección de Color",
    description:
      "Tratamiento estético para lograr acabados cinematográficos y una identidad visual coherente.",
    tags: ["Color", "Cinematográfico", "Identidad"],
    category: "audiovisual",
  },
  // 2. Marketing y Contenido Digital
  {
    icon: FiInstagram,
    title: "Social Media Content",
    description:
      "Creación de Reels, TikToks y videos verticales optimizados para generar impacto e interacción.",
    tags: ["Reels", "TikTok", "Vertical"],
    category: "marketing",
  },
  {
    icon: FiVideo,
    title: "Publicidad Dinámica",
    description:
      "Spots publicitarios breves y estratégicos para campañas en plataformas digitales.",
    tags: ["Spots", "Campañas", "Digital"],
    category: "marketing",
  },
  {
    icon: FiPlay,
    title: "Cobertura de Experiencias",
    description:
      "Registro de activaciones de marca y eventos de marketing para difusión inmediata.",
    tags: ["Activaciones", "Eventos", "Difusión"],
    category: "marketing",
  },
  {
    icon: FiMessageCircle,
    title: "Community Manager",
    description:
      "Programación de la parrilla de contenido y gestión de la comunidad en redes sociales.",
    tags: ["Parrilla", "Comunidad", "RRSS"],
    category: "marketing",
  },
  // 3. Diseño Gráfico y Creatividad
  {
    icon: FiPenTool,
    title: "Identidad Visual",
    description:
      "Diseño de logotipos, selección de paletas de colores y creación de manuales de marca para empresas o proyectos.",
    tags: ["Logo", "Paleta", "Manual"],
    category: "diseno",
  },
  {
    icon: FiShare2,
    title: "Diseño para Redes Sociales",
    description:
      "Creación de flyers, banners y piezas gráficas personalizadas para historias y publicaciones estáticas.",
    tags: ["Flyers", "Banners", "Piezas"],
    category: "diseno",
  },
  {
    icon: FiLayers,
    title: "Material Corporativo",
    description:
      "Diseño de tarjetas de presentación, catálogos digitales, presentaciones de ventas y papelería institucional.",
    tags: ["Tarjetas", "Catálogos", "Papelería"],
    category: "diseno",
  },
] as const;

// Etiquetas de las categorías de servicios (para agrupar en la UI).
export const serviceCategories = [
  { id: "audiovisual", label: "Producción Audiovisual" },
  { id: "marketing", label: "Marketing y Contenido Digital" },
  { id: "diseno", label: "Diseño Gráfico y Creatividad" },
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
