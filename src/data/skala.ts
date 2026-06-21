import { FaWandMagicSparkles } from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiBarChart2,
  FiCamera,
  FiCompass,
  FiFilm,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiPenTool,
  FiPlay,
  FiRefreshCw,
  FiSend,
  FiShare2,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiVideo,
} from "react-icons/fi";
import { CONTACT_DATA } from "./contact_data";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
  { label: "Portafolio", href: "/portafolio" },
] as const;

export const marqueeItems = [
  "Branding",
  "Producción audiovisual",
  "Social content",
  "Sesiones de foto",
  "Identidad visual",
  "Edición de video",
  "Marketing digital",
  "Campañas",
  "Estrategia",
  "Community management",
  "Coberturas",
  "Motion graphics",
  "Sitios web",
] as const;

export const heroSignals = [
  { icon: FiVideo, label: "Contenido", value: "12+ piezas por semana" },
  { icon: FiCamera, label: "Imagen", value: "Foto + video + arte" },
  {
    icon: FiTrendingUp,
    label: "Crecimiento",
    value: "Estrategia y performance",
  },
] as const;

export const heroActions = [
  {
    label: "Ver planes",
    href: "#planes",
    icon: FiArrowUpRight,
    variant: "primary" as const,
  },
  {
    label: "Hablemos",
    href: "#contacto",
    icon: FiSend,
    variant: "secondary" as const,
  },
] as const;

export const aboutPills = [
  {
    icon: FiFilm,
    title: "Productora",
    description:
      "Dirección, rodaje, edición y postproducción con ritmo de marca.",
  },
  {
    icon: FiPenTool,
    title: "Agencia Creativa",
    description:
      "Branding, identidad visual y diseño con criterio estratégico.",
  },
  {
    icon: FiShare2,
    title: "Contenido",
    description: "Piezas para redes, campañas y comunicación continua.",
  },
  {
    icon: FiBarChart2,
    title: "Marketing",
    description: "Medición, pauta y optimización para crecer con intención.",
  },
] as const;

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

export const plans = [
  {
    name: "Esencial",
    tagline: "Para marcas que arrancan y necesitan presencia real.",
    featured: false,
    price: "Consultar",
    period: "mensual",
    features: [
      { label: "Gestión de 1 red social", included: true },
      { label: "8 posts mensuales con diseño", included: true },
      { label: "1 sesión de fotos al mes", included: true },
      { label: "Calendario de contenido", included: true },
      { label: "Reporte mensual básico", included: true },
      { label: "Video producción", included: false },
      { label: "Campañas pagas", included: false },
      { label: "Branding", included: false },
    ],
    cta: "Arrancar",
    cta_link_message: "Hola, quiero saber más sobre el plan Esencial.",
  },
  {
    name: "Crecimiento",
    tagline: "Para marcas listas para escalar su presencia digital.",
    featured: false,
    price: "Consultar",
    period: "mensual",
    features: [
      { label: "Gestión de 2 redes sociales", included: true },
      { label: "16 posts mensuales", included: true },
      { label: "2 sesiones de fotos al mes", included: true },
      { label: "1 video mensual (reels/short)", included: true },
      { label: "Community management", included: true },
      { label: "Estrategia de contenido", included: true },
      { label: "Reporte mensual completo", included: true },
      { label: "Campañas pagas", included: false },
    ],
    cta: "Escalar",
    cta_link_message: "Hola, quiero saber más sobre el plan Crecimiento.",
  },
  {
    name: "Skala Pro",
    tagline: "La experiencia completa. Agencia + Productora activada.",
    featured: true,
    price: "Consultar",
    period: "mensual",
    badge: "Más elegido",
    features: [
      { label: "Gestión de 3 redes sociales", included: true },
      { label: "20+ posts mensuales", included: true },
      { label: "Sesiones ilimitadas de foto", included: true },
      { label: "2 videos de producción al mes", included: true },
      { label: "Community management full", included: true },
      { label: "Estrategia + métricas avanzadas", included: true },
      { label: "Campañas pagas incluidas", included: true },
      { label: "Reunión semanal de equipo", included: true },
    ],
    cta: "Lo quiero",
    cta_link_message: "Hola, quiero saber más sobre el plan Skala Pro.",
  },
  {
    name: "Corporativo",
    tagline: "Para empresas con necesidades específicas y alto volumen.",
    featured: false,
    price: "A medida",
    period: "según proyecto",
    features: [
      { label: "Todo lo del plan Pro", included: true },
      { label: "Branding & identidad visual", included: true },
      { label: "Producción audiovisual completa", included: true },
      { label: "Coberturas de eventos", included: true },
      { label: "Equipo dedicado", included: true },
      { label: "Gestor de cuenta exclusivo", included: true },
      { label: "Reportes ejecutivos", included: true },
      { label: "Prioridad en agenda", included: true },
    ],
    cta: "Conversar",
    cta_link_message: "Hola, quiero saber más sobre el plan Corporativo.",
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

export const processSteps = [
  {
    icon: FiCompass,
    name: "Brief",
    description:
      "Entendemos la marca, objetivos y la oportunidad real de contenido.",
  },
  {
    icon: FiTarget,
    name: "Estrategia",
    description:
      "Trazamos el enfoque creativo, los formatos y la dirección visual.",
  },
  {
    icon: FiVideo,
    name: "Producción",
    description:
      "Ejecutamos con equipo técnico, dirección y ritmo de publicación.",
  },
  {
    icon: FiRefreshCw,
    name: "Revisión",
    description:
      "Ajustamos piezas, copy y formatos hasta cerrar el estándar final.",
  },
  {
    icon: FiSend,
    name: "Entrega",
    description:
      "Publicamos, entregamos y medimos impacto para seguir iterando.",
  },
] as const;

export const ctaLinks = [
  {
    label: "Escribirnos",
    href: `mailto:${CONTACT_DATA.EMAIL_ADDRESS}`,
    icon: FiMail,
    variant: "solid" as const,
  },
  {
    label: "WhatsApp",
    href: CONTACT_DATA.WHATSAPP_LINK(
      "Hola, quiero saber más sobre sus servicios.",
    ),
    icon: FaWhatsapp,
    variant: "outline" as const,
  },
  {
    label: "Instagram",
    href: CONTACT_DATA.INSTAGRAM_LINK,
    icon: BsInstagram,
    variant: "outline" as const,
  },
  {
    label: "TikTok",
    href: CONTACT_DATA.TIKTOK_LINK,
    icon: BsTiktok,
    variant: "outline" as const,
  },
  {
    label: "Facebook",
    href: CONTACT_DATA.FACEBOOK_LINK,
    icon: BsFacebook,
    variant: "outline" as const,
  },
] as const;
