// Packs con precio para /servicios. Usan exactamente la misma forma de dato
// que src/data/plans.ts (name, tagline, price, period, colors{bg,text},
// features[], cta, cta_link_message) para poder renderizarse con el mismo
// componente <PlanCard /> que usa #planes en la home.
//
// Paleta: se reutilizan los 4 pares bg/text ya definidos en plans.ts — no se
// inventan colores nuevos, solo se rotan entre categorías.
//
// PackTier/PackFeature: mismo shape que PlanCardData (definido localmente en
// PlanCard.astro) — tipado acá para los packs nuevos (video, fotografía,
// cobertura de cumpleaños/quinceañero) en vez de inferir con "as const"
// como los packs previos, sin tocar esos para no arriesgar el tipado
// derivado que ya usa servicios.astro (pricedPacks, buildOffer).
export interface PackFeature {
  label: string;
  included: boolean;
}

export interface PackTier {
  name: string;
  tagline: string;
  price: string;
  period: string;
  badge?: string;
  colors: { bg: string; text: string };
  features: PackFeature[];
  cta: string;
  cta_link_message: string;
}

const PALETTE = {
  base: { bg: "#03132d", text: "#5CD8FC" },
  plus: { bg: "#B7E82A", text: "#141412" },
  pro: { bg: "#141412", text: "#FEFEFE" },
  skala: { bg: "#F4AC02", text: "#141412" },
} as const;

export const webDevPacks = [
  {
    name: "Landing Page",
    tagline:
      "Página única enfocada 100% en conversión: captar leads, ventas o contactos por WhatsApp.",
    price: "S/ 450 - S/ 900",
    period: "según diseño · 5-7 días hábiles",
    colors: PALETTE.base,
    features: [
      { label: "1 página (single page) con scroll a secciones", included: true },
      { label: "Diseño responsive (mobile-first)", included: true },
      { label: "Formulario de contacto + botón de WhatsApp directo", included: true },
      { label: "Optimización de velocidad de carga", included: true },
      { label: "Configuración básica de SEO (títulos, metas, sitemap)", included: true },
      { label: "Integración con Google Analytics", included: true },
      { label: "1 ronda de correcciones", included: true },
    ],
    cta: "Cotizar Landing Page",
    cta_link_message:
      "Hola, quiero cotizar el pack Landing Page (S/ 450 - S/ 900).",
  },
  {
    name: "Sitio Corporativo",
    tagline:
      "Web institucional de varias secciones para transmitir profesionalismo y posicionarte en Google.",
    price: "S/ 1,300 - S/ 2,800",
    period: "según personalización · 2-3 semanas hábiles",
    colors: PALETTE.pro,
    features: [
      { label: "Web de 4 a 8 secciones (inicio, servicios, nosotros, contacto, etc.)", included: true },
      { label: "Diseño 100% a medida (no plantilla genérica)", included: true },
      { label: "Blog o sección de recursos", included: true },
      { label: "Formularios de contacto integrados", included: true },
      { label: "SEO técnico on-page (estructura, velocidad, indexación)", included: true },
      { label: "100% responsive, optimizado para Core Web Vitals", included: true },
      { label: "2 rondas de correcciones", included: true },
    ],
    cta: "Cotizar Sitio Corporativo",
    cta_link_message:
      "Hola, quiero cotizar el pack Sitio Corporativo (S/ 1,300 - S/ 2,800).",
  },
  {
    name: "Tienda Virtual / E-commerce",
    tagline: "Plataforma de venta online lista para operar en el mercado peruano.",
    price: "S/ 2,200 - S/ 4,500",
    period: "según integraciones · 4-6 semanas hábiles",
    badge: "Nuevo",
    colors: PALETTE.skala,
    features: [
      { label: "Catálogo de hasta 50 productos (ampliable)", included: true },
      { label: "Carrito de compras y checkout funcional", included: true },
      { label: "Integración con pasarela de pago local (Culqi, Mercado Pago o Izipay)", included: true },
      { label: "Soporte para Yape/Plin según pasarela elegida", included: true },
      { label: "Panel de administración para gestionar pedidos y stock", included: true },
      { label: "Páginas clave: inicio, tienda, nosotros, contacto, políticas", included: true },
      { label: "2 rondas de correcciones", included: true },
    ],
    cta: "Cotizar Tienda Virtual",
    cta_link_message:
      "Hola, quiero cotizar una Tienda Virtual / E-commerce (S/ 2,200 - S/ 4,500).",
  },
] as const;

export const brandingPacks = [
  {
    name: "Branding Básico",
    tagline: "Identidad esencial para arrancar con una marca sólida.",
    price: "S/ 350",
    period: "proyecto único",
    colors: PALETTE.base,
    features: [
      { label: "Diseño de logotipo, isologo y/o isotipo", included: true },
      { label: "2 propuestas de diseño", included: true },
      { label: "Versiones en positivo y negativo", included: true },
      { label: "Paleta de colores", included: true },
      { label: "Tipografía principal y secundaria", included: true },
      { label: "Archivos JPG, PNG y SVG", included: true },
      { label: "2 rondas de correcciones", included: true },
    ],
    cta: "Cotizar Branding Básico",
    cta_link_message: "Hola, quiero cotizar el pack Branding Básico (S/ 350).",
  },
  {
    name: "Branding Completo",
    tagline: "Identidad con sistema gráfico y mini guía de marca.",
    price: "S/ 650",
    period: "proyecto único",
    colors: PALETTE.plus,
    features: [
      { label: "Diseño de logotipo, isologo y/o isotipo", included: true },
      { label: "3 propuestas de diseño", included: true },
      { label: "Versiones en positivo y negativo", included: true },
      { label: "Paleta de colores", included: true },
      { label: "Tipografía principal y secundaria", included: true },
      { label: "Sistema de elementos gráficos (patterns, iconos, recursos)", included: true },
      { label: "Mini guía de marca (10–15 páginas aprox)", included: true },
      { label: "Highlights para Instagram", included: true },
      { label: "Archivos editables (AI, SVG, PDF) y formatos de exportación", included: true },
      { label: "3 rondas de correcciones", included: true },
    ],
    cta: "Cotizar Branding Completo",
    cta_link_message: "Hola, quiero cotizar el pack Branding Completo (S/ 650).",
  },
  {
    name: "Branding Premium",
    tagline: "Manual de identidad completo con papelería y lanzamiento.",
    price: "S/ 1,350",
    period: "proyecto único",
    badge: "Más completo",
    colors: PALETTE.skala,
    features: [
      { label: "Diseño de logotipo, isologo y/o isotipo", included: true },
      { label: "3 propuestas de diseño", included: true },
      { label: "Versiones en positivo y negativo", included: true },
      { label: "Paleta de colores", included: true },
      { label: "Sistema tipográfico", included: true },
      { label: "Elementos gráficos", included: true },
      { label: "Manual de identidad (25–40 páginas aprox)", included: true },
      { label: "Papelería (tarjeta, hoja membretada y firma de correo)", included: true },
      { label: "Highlights de Instagram", included: true },
      { label: "3 post para lanzamiento de marca", included: true },
      { label: "Archivos editables y de impresión", included: true },
      { label: "4 rondas de correcciones", included: true },
    ],
    cta: "Cotizar Branding Premium",
    cta_link_message: "Hola, quiero cotizar el pack Branding Premium (S/ 1,350).",
  },
] as const;

export const designPacks = [
  {
    name: "Diseño Básico",
    tagline: "Piezas gráficas mensuales para mantener tus redes activas.",
    price: "S/ 400",
    period: "mensual",
    colors: PALETTE.base,
    features: [
      { label: "9 diseños mensuales para publicaciones", included: true },
      { label: "3 destacadas de Instagram (Highlights)", included: true },
      { label: "Redacción de copys o captions para cada post", included: true },
      { label: "Entrega de archivos en formato para publicación", included: true },
    ],
    cta: "Cotizar Diseño Básico",
    cta_link_message: "Hola, quiero cotizar el pack Diseño Básico (S/ 400).",
  },
  {
    name: "Diseño Completo",
    tagline: "Más volumen y estrategia de parrilla mensual.",
    price: "S/ 700",
    period: "mensual",
    colors: PALETTE.plus,
    features: [
      { label: "12 diseños mensuales para publicaciones", included: true },
      { label: "5 destacadas de Instagram (Highlights)", included: true },
      { label: "Redacción de copys o captions para cada post", included: true },
      { label: "Definición de colores, tipografías y elementos gráficos para redes", included: true },
      { label: "Diseño y planificación de la parrilla (estrategia de contenido)", included: true },
      { label: "Reunión mensual de planificación", included: true },
      { label: "Entregas de archivos en formato para publicación", included: true },
    ],
    cta: "Cotizar Diseño Completo",
    cta_link_message: "Hola, quiero cotizar el pack Diseño Completo (S/ 700).",
  },
  {
    name: "Diseño Premium",
    tagline: "El máximo volumen mensual, con stories y adaptaciones incluidas.",
    price: "S/ 1,250",
    period: "mensual",
    badge: "Más completo",
    colors: PALETTE.skala,
    features: [
      { label: "20 diseños mensuales para publicaciones", included: true },
      { label: "6 diseños de stories de Instagram", included: true },
      { label: "Destacadas ilimitadas de Instagram (Highlights)", included: true },
      { label: "Redacción de copys o captions para cada post", included: true },
      { label: "Definición de colores, tipografías y elementos gráficos para redes", included: true },
      { label: "Diseño y planificación de la parrilla (estrategia de contenido)", included: true },
      { label: "Adaptaciones de formatos (feed, story, etc.)", included: true },
      { label: "Reunión mensual de planificación", included: true },
      { label: "Entregas de archivos en formato para publicación", included: true },
    ],
    cta: "Cotizar Diseño Premium",
    cta_link_message: "Hola, quiero cotizar el pack Diseño Premium (S/ 1,250).",
  },
] as const;

// --- Video, Fotografía y Cobertura de Eventos -------------------------------
// Reemplaza el antiguo borrador "A cotizar" (photoVideoEventPacks): estos 5
// grupos ya tienen precio y alcance reales, uno por línea de negocio.

export const videoPacks: PackTier[] = [
  {
    name: "Video Básico",
    tagline: "Material en bruto listo para que tú edites.",
    price: "S/ 200",
    period: "por sesión",
    colors: PALETTE.base,
    features: [
      { label: "Grabación de material en bruto (clips sueltos o toma continua)", included: true },
      { label: "Entrega en máximo 48 horas hábiles", included: true },
      { label: "Enlace de descarga por Google Drive", included: true },
      { label: "Archivos en formato vertical u horizontal", included: true },
      { label: "Material conservado 3-4 días (luego se elimina)", included: true },
      { label: "Edición y corrección de color", included: false },
    ],
    cta: "Cotizar Video Básico",
    cta_link_message: "Hola, quiero cotizar el pack Video Básico (S/ 200).",
  },
  {
    name: "Video Completo",
    tagline: "Grabación y edición lista para publicar.",
    price: "S/ 450",
    period: "por sesión",
    colors: PALETTE.plus,
    features: [
      { label: "Grabación y edición completa", included: true },
      { label: "Corrección de color básica", included: true },
      { label: "Efectos y música", included: true },
      { label: "Entrega en 4-5 días hábiles", included: true },
      { label: "Archivo MP4 vertical u horizontal", included: true },
      { label: "2 cambios incluidos", included: true },
      { label: "Video final retenido 1 semana", included: true },
      { label: "Material en bruto", included: false },
    ],
    cta: "Cotizar Video Completo",
    cta_link_message: "Hola, quiero cotizar el pack Video Completo (S/ 450).",
  },
  {
    name: "Video Premium",
    tagline: "Guion estratégico pensado para retener y convertir.",
    price: "S/ 650",
    period: "por sesión",
    badge: "Más completo",
    colors: PALETTE.skala,
    features: [
      { label: "Guionización, grabación y edición", included: true },
      { label: "Investigación de hooks, estructura y llamado a la acción", included: true },
      { label: "Guion enviado 2-3 días hábiles antes de grabar", included: true },
      { label: "Entrega final en 5-6 días hábiles", included: true },
      { label: "Archivo MP4 vertical u horizontal", included: true },
      { label: "1 cambio en el guion + 3 cambios en la edición final", included: true },
      { label: "Video retenido 2 semanas", included: true },
      { label: "Material en bruto", included: false },
    ],
    cta: "Cotizar Video Premium",
    cta_link_message: "Hola, quiero cotizar el pack Video Premium (S/ 650).",
  },
];

export const gastronomicPhotoPacks: PackTier[] = [
  {
    name: "Fotografía Gastronómica Básico",
    tagline: "Sesión corta en tu local, lista para redes.",
    price: "S/ 400",
    period: "por sesión",
    colors: PALETTE.base,
    features: [
      { label: "Moodboard con referencias fotográficas", included: true },
      { label: "Sesión de 2 horas en el local", included: true },
      { label: "Equipo profesional", included: true },
      { label: "1 modelo incluido", included: true },
      { label: "Entrega de fotografías editadas en JPG", included: true },
    ],
    cta: "Cotizar Fotografía Gastronómica Básico",
    cta_link_message:
      "Hola, quiero cotizar el pack Fotografía Gastronómica Básico (S/ 400).",
  },
  {
    name: "Fotografía Gastronómica Completo",
    tagline: "Más tiempo de sesión y un modelo adicional.",
    price: "S/ 650",
    period: "por sesión",
    colors: PALETTE.plus,
    features: [
      { label: "Moodboard con referencias fotográficas", included: true },
      { label: "Sesión de 3 horas en el local", included: true },
      { label: "Equipo profesional", included: true },
      { label: "2 modelos incluidos", included: true },
      { label: "Entrega de fotografías editadas en JPG", included: true },
    ],
    cta: "Cotizar Fotografía Gastronómica Completo",
    cta_link_message:
      "Hola, quiero cotizar el pack Fotografía Gastronómica Completo (S/ 650).",
  },
  {
    name: "Fotografía Gastronómica Premium",
    tagline: "Sesión extendida para catálogos completos.",
    price: "S/ 850",
    period: "por sesión",
    badge: "Más completo",
    colors: PALETTE.skala,
    features: [
      { label: "Moodboard con referencias fotográficas", included: true },
      { label: "Sesión de 4 horas en el local", included: true },
      { label: "Equipo profesional", included: true },
      { label: "2 modelos incluidos", included: true },
      { label: "Entrega de fotografías editadas en JPG", included: true },
    ],
    cta: "Cotizar Fotografía Gastronómica Premium",
    cta_link_message:
      "Hola, quiero cotizar el pack Fotografía Gastronómica Premium (S/ 850).",
  },
];

// El precio final varía según rubro gastronómico, horario, ubicación del
// local y número de modelos — se muestra como nota debajo de las cards en
// vez de repetirlo en cada tier (ver <PackNotes /> en servicios.astro).
export const gastronomicPhotoNotes = [
  "Rubro gastronómico.",
  "Horario de la sesión.",
  "Ubicación del local.",
  "Número de modelos requeridos: S/ 50 adicionales por modelo.",
];

export const corporatePhotoPacks: PackTier[] = [
  {
    name: "Sesión en Estudio Fotográfico",
    tagline: "Retrato corporativo con fondo e iluminación controlados.",
    price: "S/ 200",
    period: "por sesión",
    colors: PALETTE.base,
    features: [
      { label: "Moodboard con referencias fotográficas", included: true },
      { label: "Sesión de 1 hora en estudio", included: true },
      { label: "Equipo profesional", included: true },
      { label: "1 a 2 personas", included: true },
      { label: "Accesorios básicos", included: true },
      { label: "Entrega de fotografías editadas en JPG", included: true },
    ],
    cta: "Cotizar Sesión en Estudio",
    cta_link_message:
      "Hola, quiero cotizar la Sesión en Estudio Fotográfico (S/ 200).",
  },
  {
    name: "Sesión en Oficina o Instalaciones Propias",
    tagline: "Retrato de equipo en tu propio espacio de trabajo.",
    price: "S/ 350",
    period: "por sesión",
    colors: PALETTE.plus,
    features: [
      { label: "Moodboard con referencias fotográficas", included: true },
      { label: "Sesión de 2 horas", included: true },
      { label: "Equipo profesional", included: true },
      { label: "2 o más personas", included: true },
      { label: "Retoque básico con maquillaje", included: true },
      { label: "Entrega de fotografías editadas en JPG", included: true },
    ],
    cta: "Cotizar Sesión en Oficina",
    cta_link_message:
      "Hola, quiero cotizar la Sesión en Oficina o Instalaciones Propias (S/ 350).",
  },
  {
    name: "Sesión en Exterior u Otros Establecimientos",
    tagline: "Retrato de equipo fuera de tus instalaciones.",
    price: "S/ 400",
    period: "por sesión",
    colors: PALETTE.pro,
    features: [
      { label: "Moodboard con referencias fotográficas", included: true },
      { label: "Sesión de 2 horas", included: true },
      { label: "Equipo profesional", included: true },
      { label: "2 o más personas", included: true },
      { label: "Retoque básico con maquillaje", included: true },
      { label: "Entrega de fotografías editadas en JPG", included: true },
    ],
    cta: "Cotizar Sesión en Exterior",
    cta_link_message:
      "Hola, quiero cotizar la Sesión en Exterior u Otros Establecimientos (S/ 400).",
  },
];

export const birthdayPacks: PackTier[] = [
  {
    name: "Cumpleaños Infantil",
    tagline: "Cobertura completa de la fiesta, foto y video.",
    price: "S/ 600",
    period: "por evento",
    colors: PALETTE.base,
    features: [
      { label: "Cobertura de 5 horas", included: true },
      { label: "100 fotografías digitales en JPG", included: true },
      { label: "Video de 2 horas", included: true },
    ],
    cta: "Cotizar Cumpleaños Infantil",
    cta_link_message: "Hola, quiero cotizar la cobertura de Cumpleaños Infantil (S/ 600).",
  },
  {
    name: "Cumpleaños Adulto",
    tagline: "Cobertura completa de la fiesta, foto y video resumen.",
    price: "S/ 650",
    period: "por evento",
    colors: PALETTE.plus,
    features: [
      { label: "Cobertura de 5 horas", included: true },
      { label: "100 fotografías digitales en JPG", included: true },
      { label: "Video resumen de 2 horas", included: true },
    ],
    cta: "Cotizar Cumpleaños Adulto",
    cta_link_message: "Hola, quiero cotizar la cobertura de Cumpleaños Adulto (S/ 650).",
  },
];

export const birthdayNotes = [
  "Hora adicional de cobertura: S/ 50.",
  "Fotografías impresas: S/ 1 por foto, desde 50 fotografías.",
  "Tomas con dron: S/ 200.",
  "Tiempo de entrega: 1 a 2 semanas.",
  "Fotografías y video entregados en una memoria USB.",
];

export const quinceañeraPacks: PackTier[] = [
  {
    name: "Quinceañero Básico",
    tagline: "Cobertura del evento, foto y video.",
    price: "S/ 700",
    period: "por evento",
    colors: PALETTE.base,
    features: [
      { label: "Cobertura de 4 horas", included: true },
      { label: "100 fotografías digitales en JPG", included: true },
      { label: "Video de 2 horas", included: true },
    ],
    cta: "Cotizar Quinceañero Básico",
    cta_link_message: "Hola, quiero cotizar el pack Quinceañero Básico (S/ 700).",
  },
  {
    name: "Quinceañero Completo",
    tagline: "Suma sesión pre-evento y sesión en la Plaza de Armas.",
    price: "S/ 1,100",
    period: "por evento",
    badge: "Más completo",
    colors: PALETTE.skala,
    features: [
      { label: "Cobertura de 4 horas", included: true },
      { label: "100 fotografías digitales en JPG", included: true },
      { label: "Video resumen de 2 horas", included: true },
      { label: "Sesión fotográfica pre-quinceañero", included: true },
      { label: "Sesión fotográfica en la Plaza de Armas", included: true },
    ],
    cta: "Cotizar Quinceañero Completo",
    cta_link_message: "Hola, quiero cotizar el pack Quinceañero Completo (S/ 1,100).",
  },
];

export const quinceañeraNotes = [
  "Hora adicional de cobertura: S/ 50.",
  "Fotografías impresas: S/ 1 por foto, desde 50 fotografías.",
  "Tomas con dron: S/ 200.",
  "Cuadro para la entrada de la fiesta: S/ 150.",
  "Tiempo de entrega: 1 a 2 semanas.",
  "Fotografías y video entregados en una memoria USB.",
];
