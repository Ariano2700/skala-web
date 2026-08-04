// Packs con precio para /servicios. Usan exactamente la misma forma de dato
// que src/data/plans.ts (name, tagline, price, period, colors{bg,text},
// features[], cta, cta_link_message) para poder renderizarse con el mismo
// componente <PlanCard /> que usa #planes en la home.
//
// Paleta: se reutilizan los 4 pares bg/text ya definidos en plans.ts — no se
// inventan colores nuevos, solo se rotan entre categorías.
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
    price: "S/ 1350",
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
    cta_link_message: "Hola, quiero cotizar el pack Branding Premium (S/ 1350).",
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
    price: "S/ 1250",
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
    cta_link_message: "Hola, quiero cotizar el pack Diseño Premium (S/ 1250).",
  },
] as const;

// Fotografía, Video y Cobertura de Evento: el doc de precios original tenía
// el contenido de Branding copiado en los tres, así que -mientras se
// confirma el detalle real- se modelan como borrador ("A cotizar") a partir
// de las descripciones ya existentes en src/data/services.ts (categoría
// "audiovisual"), que sí describen correctamente cada servicio.
export const photoVideoEventPacks = [
  {
    name: "Fotografía",
    tagline: "Retrato, producto y cobertura de eventos con edición incluida.",
    price: "A cotizar",
    period: "según alcance",
    badge: "Contenido por confirmar",
    colors: PALETTE.base,
    features: [
      { label: "Cobertura de eventos", included: true },
      { label: "Sesiones de retrato corporativo", included: true },
      { label: "Fotografía de marca personal", included: true },
      { label: "Fotografía de producto", included: true },
      { label: "Precio final según alcance y locación", included: true },
    ],
    cta: "Cotizar Fotografía",
    cta_link_message: "Hola, quiero cotizar un servicio de fotografía.",
  },
  {
    name: "Video",
    tagline: "Edición, montaje y corrección de color con acabado cinematográfico.",
    price: "A cotizar",
    period: "según alcance",
    badge: "Contenido por confirmar",
    colors: PALETTE.pro,
    features: [
      { label: "Edición avanzada con transiciones profesionales", included: true },
      { label: "Diseño sonoro", included: true },
      { label: "Corrección de color y acabado cinematográfico", included: true },
      { label: "Identidad visual coherente en cada entrega", included: true },
      { label: "Precio final según duración y complejidad", included: true },
    ],
    cta: "Cotizar Video",
    cta_link_message: "Hola, quiero cotizar un servicio de video.",
  },
  {
    name: "Cobertura de Evento",
    tagline: "Registro social o corporativo, de la previa al cierre.",
    price: "A cotizar",
    period: "según alcance",
    badge: "Contenido por confirmar",
    colors: PALETTE.skala,
    features: [
      { label: "Cobertura cinematográfica de matrimonios y quinceañeros", included: true },
      { label: "Registro de cumpleaños, aniversarios y fiestas", included: true },
      { label: "Cobertura de conferencias y lanzamientos corporativos", included: true },
      { label: "Narrativa emocional y momentos clave en foto y video", included: true },
      { label: "Precio final según duración y alcance del evento", included: true },
    ],
    cta: "Cotizar Cobertura de Evento",
    cta_link_message: "Hola, quiero cotizar una cobertura de evento.",
  },
] as const;
