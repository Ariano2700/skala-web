import { FiCalendar, FiGlobe, FiVideo } from "react-icons/fi";
import type { IconType } from "react-icons";

// Preguntas frecuentes agrupadas por cluster — misma segmentación que las 3
// líneas de negocio reales de Skala (ver src/data/services.ts): producción
// audiovisual, cobertura de eventos, desarrollo web.
//
// El contenido nace de un research de intención de búsqueda real
// (AnswerThePublic, clusterizado) pero cada respuesta se redactó solo con
// datos verificables del propio catálogo (services.ts, servicePacks.ts,
// plans.ts, organization.ts, contact_data.ts) — sin precios ni servicios
// que Skala no ofrezca hoy. Varias preguntas de búsqueda casi-duplicadas se
// fusionaron en una sola entrada; ver la conversación de curaduría para el
// detalle de qué se descartó y por qué (animación 2D/3D, streaming en vivo,
// cabinas fotográficas, registro de dominio .pe, recomendar plataformas o
// software de terceros: ninguno es un servicio real de Skala).

export type FaqClusterId = "audiovisual" | "eventos" | "web";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCluster {
  id: FaqClusterId;
  label: string;
  labelLower: string;
  icon: IconType;
  items: FaqItem[];
}

export const faqClusters: FaqCluster[] = [
  {
    id: "audiovisual",
    label: "Producción audiovisual",
    labelLower: "producción audiovisual",
    icon: FiVideo,
    items: [
      {
        q: "¿Cómo creo un video publicitario efectivo para redes sociales?",
        a: "Un video publicitario efectivo prioriza los primeros 3 segundos, usa formato vertical (9:16) pensado para el scroll y responde a un guion con un solo mensaje claro. En Skala partimos de una guionización y planificación de grilla antes de grabar, y entregamos piezas verticales optimizadas para Reels y TikTok, no un video de otro formato simplemente recortado.",
      },
      {
        q: "¿Qué servicios ofrece una agencia especializada en videos publicitarios?",
        a: "Cubre todo el proceso: rodaje, edición con transiciones profesionales, diseño sonoro y corrección de color para un acabado cinematográfico. Skala cubre las tres etapas (producción, edición y color) más la adaptación del video a spots publicitarios y contenido para redes.",
      },
      {
        q: "¿Cuánto cuesta un video publicitario profesional para una pyme?",
        a: "No hay un precio fijo publicado para un video suelto: se cotiza según duración, número de sesiones y complejidad de edición. Para contenido recurrente sí hay precio fijo en los planes mensuales, desde S/600 (Plan Base, 3 Reels) hasta S/2,000 (Plan SKALA, 8 Reels en 4K).",
      },
      {
        q: "¿Cuáles son las mejores productoras audiovisuales en Trujillo?",
        a: "Skala es una agencia y productora con sede en Trujillo (La Libertad), especializada en bodas, quinceañeros, eventos corporativos, fotografía, edición y corrección de color. Responde con propuesta inicial sin costo en menos de 24 horas y tiene portafolio de casos reales publicado en línea.",
      },
      {
        q: "¿Dónde contratar servicios de producción audiovisual en Trujillo?",
        a: "Por WhatsApp (+51 959 739 831) o email (skalaagenciayproductora@gmail.com), de lunes a viernes de 9:00 a.m. a 6:00 p.m. y sábados de 9:00 a.m. a 1:00 p.m.",
      },
      {
        q: "¿Puedo revisar un portafolio online antes de contratar?",
        a: "Sí. Skala publica su portafolio filtrable por categoría (bodas, corporativo, contenido de marca) con casos reales, no solo renders o ejemplos genéricos.",
      },
      {
        q: "¿Qué agencias en Trujillo ofrecen edición profesional de video?",
        a: "Skala incluye edición avanzada con transiciones profesionales, diseño sonoro y corrección de color como servicios propios, no subcontratados.",
      },
      {
        q: "¿Cómo elegir una productora audiovisual en Trujillo?",
        a: "Revisa portafolio verificable, qué incluye la entrega (edición y color, no solo el material crudo), cuántas rondas de correcciones ofrece y su tiempo de respuesta. Skala responde con propuesta inicial en 24 horas.",
      },
      {
        q: "¿Cuánto cuesta una producción audiovisual en Trujillo?",
        a: "No hay un precio único publicado porque depende del alcance (duración, sesiones, locación); se cotiza caso por caso. Para contenido recurrente sí hay precio fijo desde S/600 al mes.",
      },
      {
        q: "¿Cómo solicito una cotización para producción audiovisual?",
        a: "Por WhatsApp o email, contando el tipo de proyecto. Skala responde con una propuesta inicial sin costo en menos de 24 horas.",
      },
    ],
  },
  {
    id: "eventos",
    label: "Cobertura de eventos",
    labelLower: "cobertura de eventos",
    icon: FiCalendar,
    items: [
      {
        q: "¿Dónde contratar cobertura de eventos en Trujillo?",
        a: "Skala cubre eventos sociales (bodas, quinceañeros, cumpleaños, aniversarios) y corporativos (conferencias, lanzamientos) en Trujillo, con registro fotográfico y audiovisual enfocado en la narrativa emocional y los momentos clave.",
      },
      {
        q: "¿Hacen video de bodas con experiencia?",
        a: "Sí, la cobertura de matrimonios y quinceañeros es una de las líneas principales de Skala, con enfoque cinematográfico en capturar la narrativa emocional del evento.",
      },
      {
        q: "¿Cuánto cuesta la cobertura fotográfica de un evento en Trujillo?",
        a: "No hay tarifa fija publicada: el precio final depende de la duración y el alcance del evento, y se cotiza directamente por WhatsApp o email.",
      },
    ],
  },
  {
    id: "web",
    label: "Desarrollo web",
    labelLower: "desarrollo web",
    icon: FiGlobe,
    items: [
      {
        q: "¿Cuánto cuesta una página web básica en Perú?",
        a: "Una landing page (página única) cuesta entre S/450 y S/900, con entrega en 5-7 días hábiles. Incluye diseño responsive, botón de WhatsApp directo, formulario de contacto, SEO básico e integración con Google Analytics.",
      },
      {
        q: "¿Qué incluye un paquete estándar de creación de páginas web?",
        a: "Un sitio corporativo incluye de 4 a 8 secciones, diseño 100% a medida, blog o recursos, formularios integrados, SEO técnico on-page y optimización para Core Web Vitals, con 2 rondas de correcciones.",
      },
      {
        q: "¿Qué factores determinan el costo de un sitio web?",
        a: "El precio sube según el número de páginas, si el diseño es a medida o plantilla, las integraciones necesarias (pasarela de pago, panel de administración) y el tiempo de entrega. Por eso el rango va de S/450-900 (landing) a S/1,300-2,800 (sitio corporativo) y S/2,200-4,500 (tienda online).",
      },
      {
        q: "¿Dónde contratar una página web económica y profesional en Perú?",
        a: "Con agencias que publiquen precio y alcance claros desde el inicio. El pack de entrada de Skala (Landing Page) parte de S/450, con SEO básico y velocidad de carga optimizada incluidos.",
      },
      {
        q: "¿Cuánto cuesta crear una tienda online en Perú?",
        a: "Entre S/2,200 y S/4,500, con 4-6 semanas de desarrollo. Incluye catálogo de hasta 50 productos, carrito y checkout funcional, pasarela de pago local (Culqi, Mercado Pago o Izipay), soporte Yape/Plin y panel de administración.",
      },
      {
        q: "¿Cuáles son las empresas de diseño web con mejores precios en Perú?",
        a: 'Mejor que prometer "el más barato" es publicar precios propios y transparentes: los 3 tipos de web de Skala (landing, corporativo, e-commerce) tienen rango de precio declarado desde el inicio, sin cotización oculta.',
      },
      {
        q: "¿Cómo creo una página web profesional para mi negocio en Perú?",
        a: "Hay dos caminos: un builder DIY (rápido y barato, pero con diseño limitado) o una agencia con diseño a medida. Skala cubre ambos extremos: desde S/450 (landing) hasta un sitio corporativo 100% a medida (S/1,300-2,800).",
      },
      {
        q: "¿Dónde contratar servicios profesionales de desarrollo web?",
        a: "Con una agencia que entregue web 100% responsive, optimizada para velocidad y con SEO técnico incluido desde el paquete base, no solo una plantilla genérica.",
      },
      {
        q: "¿Qué características debe tener una página web para un negocio?",
        a: "Como mínimo: diseño responsive (mobile-first), botón de WhatsApp directo, formulario de contacto, buena velocidad de carga y SEO básico (títulos, metas, sitemap) configurado desde el lanzamiento.",
      },
      {
        q: "¿Cómo optimizo mi web para buscadores locales?",
        a: "El SEO técnico on-page (estructura, velocidad, indexación) es la base: Skala lo incluye desde el pack Sitio Corporativo. A nivel local también ayuda mantener consistentes el nombre, dirección y teléfono del negocio, y declarar la zona geográfica en los metadatos del sitio.",
      },
      {
        q: "¿Cuáles son las mejores empresas de diseño web en Trujillo?",
        a: "Skala, con sede en Trujillo, ofrece los 3 tipos de desarrollo web (landing, corporativo, tienda online) con precio y alcance publicados desde el inicio, más branding y diseño gráfico si la marca también los necesita.",
      },
      {
        q: "¿Cuánto cuesta una página web para un negocio en Trujillo?",
        a: "El mismo rango que a nivel nacional, porque el desarrollo es remoto: S/450-900 (landing), S/1,300-2,800 (sitio corporativo), S/2,200-4,500 (tienda online).",
      },
      {
        q: "¿Cómo elijo una empresa de diseño web en Trujillo?",
        a: 'Revisa que publiquen precio y alcance claros (no "a cotizar" para todo), cuántas rondas de correcciones incluyen, si el SEO técnico va incluido y el tiempo real de entrega.',
      },
    ],
  },
];

export const faqTotalCount = faqClusters.reduce(
  (total, cluster) => total + cluster.items.length,
  0,
);

// JSON-LD FAQPage — se importa desde la página que renderiza <FaqSection />
// (hoy solo index.astro) y se agrega al array de structuredData ya
// existente junto a Organization/WebSite, mismo criterio de
// src/data/organization.ts: una sola fuente de verdad, nunca texto
// duplicado a mano entre el componente visual y el schema.
export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqClusters.flatMap((cluster) =>
      cluster.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };
}
