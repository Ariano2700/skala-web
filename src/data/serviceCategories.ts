// Landings SEO por categoría (/servicios/[categoria]) — cada una es un
// "spoke" de la página hub /servicios: mismos packs y componentes
// (PlanCard, PackNotes), pero con copy propio orientado a una intención de
// búsqueda específica ("diseño web trujillo", "branding trujillo", etc.) en
// vez de competir por las mismas keywords genéricas que la página hub.
//
// IMPORTANTE al agregar una categoría nueva: el `slug` es la única fuente de
// verdad de la ruta (/servicios/[categoria].astro la lee vía
// getStaticPaths); agregarla acá basta, no hay que tocar la página.
import type { IconType } from "react-icons";
import { FiGlobe, FiPenTool, FiLayers, FiVideo } from "react-icons/fi";
import {
  webDevPacks,
  brandingPacks,
  designPacks,
  videoPacks,
  gastronomicPhotoPacks,
  gastronomicPhotoNotes,
  corporatePhotoPacks,
  birthdayPacks,
  birthdayNotes,
  quinceañeraPacks,
  quinceañeraNotes,
} from "./servicePacks";
import type { FaqClusterId } from "./faq";

// Estructural (no importa PackTier de servicePacks.ts) a propósito: algunos
// grupos de packs se declaran con `as const` (arrays/objetos profundamente
// readonly) y otros como PackTier[] (mutable) — PackTier no acepta ambos a
// la vez. Esta forma, igual de estricta pero solo de lectura, sí las acepta
// todas (mismo criterio que ya usa PlanCard.astro con su propio tipo local).
export interface ServiceCategoryPack {
  name: string;
  tagline: string;
  price: string;
  period: string;
  badge?: string;
  colors: { bg: string; text: string };
  features: readonly { label: string; included: boolean }[];
  cta: string;
  cta_link_message: string;
}

export interface ServiceCategorySection {
  id: string;
  heading: string;
  description?: string;
  packs: readonly ServiceCategoryPack[];
  notesTitle?: string;
  notesItems?: readonly string[];
}

export interface ServiceCategory {
  slug: string;
  navLabel: string;
  icon: IconType;
  kicker: string;
  h1: string;
  intro: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  whatsappMessage: string;
  sections: ServiceCategorySection[];
  /** Clusters de src/data/faq.ts relevantes a esta categoría (se muestran al final de la landing). */
  faqClusterIds?: FaqClusterId[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "desarrollo-web",
    navLabel: "Desarrollo Web",
    icon: FiGlobe,
    kicker: "Desarrollo Web",
    h1: "Páginas web que cargan rápido y sí convierten.",
    intro: [
      "Landing pages, sitios corporativos y tiendas online con precio y alcance publicados desde el inicio — nada de \"a cotizar\" para todo.",
      "Diseño 100% a medida (no plantillas genéricas), responsive, con SEO técnico y velocidad de carga optimizada desde el primer entregable.",
    ],
    metaTitle: "Desarrollo Web en Trujillo | Landing, Corporativo y Tienda Online — Skala",
    metaDescription:
      "Páginas web en Trujillo desde S/450: landing pages, sitios corporativos y tiendas online. Diseño a medida, SEO técnico y entrega en días, no meses.",
    keywords:
      "paginas web trujillo, diseño web trujillo, desarrollo web peru, tienda online trujillo, landing page precio peru",
    whatsappMessage: "Hola, quiero cotizar una página web.",
    sections: [
      {
        id: "dev-web",
        heading: "Desarrollo Web",
        description:
          "Los precios no incluyen hosting, dominio ni mantenimiento mensual — se cotizan aparte. El precio final dentro de cada rango depende del número de páginas o productos, el nivel de personalización y las integraciones adicionales (CRM, ERP, facturación SUNAT, etc.).",
        packs: webDevPacks,
      },
    ],
    faqClusterIds: ["web"],
  },
  {
    slug: "branding",
    navLabel: "Branding",
    icon: FiPenTool,
    kicker: "Branding",
    h1: "Identidad de marca que se sostiene en el tiempo.",
    intro: [
      "Logotipo, paleta, tipografía y sistema gráfico pensados para funcionar igual de bien en una tarjeta que en un Reel.",
      "Tres niveles de profundidad — desde una identidad esencial hasta un manual de marca completo con papelería y lanzamiento — para que elijas según en qué etapa está tu negocio.",
    ],
    metaTitle: "Branding e Identidad de Marca en Trujillo | Skala",
    metaDescription:
      "Diseño de logo, identidad visual y manual de marca en Trujillo desde S/350. Tres niveles de branding según la etapa de tu negocio.",
    keywords:
      "diseño de logo trujillo, branding trujillo, identidad de marca peru, manual de marca precio, diseño de identidad visual",
    whatsappMessage: "Hola, quiero cotizar branding para mi marca.",
    sections: [
      {
        id: "branding",
        heading: "Branding",
        packs: brandingPacks,
      },
    ],
  },
  {
    slug: "diseno-grafico",
    navLabel: "Diseño Gráfico",
    icon: FiLayers,
    kicker: "Diseño Gráfico",
    h1: "Redes sociales con una parrilla que no se nota improvisada.",
    intro: [
      "Diseño mensual de publicaciones, historias y destacadas de Instagram, con copys incluidos y una estrategia de parrilla real detrás — no piezas sueltas sin hilo conductor.",
      "Pensado para marcas que publican seguido y necesitan que cada pieza se vea parte de la misma identidad, mes tras mes.",
    ],
    metaTitle: "Diseño Gráfico para Redes Sociales en Trujillo | Skala",
    metaDescription:
      "Diseño mensual de contenido para redes sociales en Trujillo desde S/400: publicaciones, historias, copys y estrategia de parrilla incluidos.",
    keywords:
      "diseño grafico para redes sociales, diseño de contenido instagram trujillo, parrilla de contenido precio, community manager diseño trujillo",
    whatsappMessage: "Hola, quiero cotizar diseño gráfico para mis redes.",
    sections: [
      {
        id: "diseno",
        heading: "Diseño Gráfico",
        packs: designPacks,
      },
    ],
  },
  {
    slug: "foto-video-eventos",
    navLabel: "Foto, Video & Eventos",
    icon: FiVideo,
    kicker: "Producción audiovisual",
    h1: "Fotografía, video y cobertura de eventos con entrega real.",
    intro: [
      "Desde un video suelto para redes hasta la cobertura completa de una boda, quinceañero o evento corporativo — con equipo profesional propio, no subcontratado.",
      "Cada línea tiene precio por sesión o por evento, así que sabes qué vas a pagar antes de escribirnos.",
    ],
    metaTitle: "Fotografía, Video y Cobertura de Eventos en Trujillo | Skala",
    metaDescription:
      "Video para redes, fotografía gastronómica y corporativa, y cobertura de cumpleaños y quinceañeros en Trujillo. Precios por sesión o evento, sin sorpresas.",
    keywords:
      "cobertura de eventos trujillo, video para redes sociales trujillo, fotografia de quinceañero trujillo, fotografia gastronomica trujillo, video para negocios peru",
    whatsappMessage: "Hola, quiero cotizar una cobertura de foto/video.",
    sections: [
      {
        id: "video",
        heading: "Video",
        packs: videoPacks,
      },
      {
        id: "foto-gastronomica",
        heading: "Fotografía Gastronómica",
        packs: gastronomicPhotoPacks,
        notesTitle: "Variables de precio",
        notesItems: gastronomicPhotoNotes,
      },
      {
        id: "foto-corporativa",
        heading: "Fotografía Corporativa",
        packs: corporatePhotoPacks,
      },
      {
        id: "cumpleanos",
        heading: "Cobertura de Cumpleaños",
        packs: birthdayPacks,
        notesTitle: "Adicionales y condiciones",
        notesItems: birthdayNotes,
      },
      {
        id: "quinceañero",
        heading: "Cobertura de Quinceañero",
        packs: quinceañeraPacks,
        notesTitle: "Adicionales y condiciones",
        notesItems: quinceañeraNotes,
      },
    ],
    faqClusterIds: ["audiovisual", "eventos"],
  },
];

export const getServiceCategoryBySlug = (slug: string) =>
  serviceCategories.find((category) => category.slug === slug);
