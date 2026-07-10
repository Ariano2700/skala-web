export const portfolioFilters = [
  { label: "Todos", value: "all" },
  { label: "Branding", value: "brand" },
  { label: "Fotografía", value: "foto" },
  { label: "Video", value: "video" },
  { label: "Social Media", value: "social" },
] as const;

export const portfolioProjects = [
  {
    id: "identidad-visual-completa",
    title: "Identidad Visual Completa",
    client: "Marca A",
    category: "brand",
    categoryLabel: "Branding",
    layout: "wide",
    accent: "brand",
    overlay: "Ver proyecto",
    visual: {
      type: "gradient",
      label: "Brand system",
      gradient:
        "linear-gradient(135deg, #1a1208 0%, #2d1f05 50%, #1a0f00 100%)",
    },
    details: {
      description: "Desarrollo integral de identidad de marca desde la conceptualización hasta la implementación completa.",
      challenge: "Crear una identidad única que reflejara los valores y la personalidad de la marca en un mercado competitivo.",
      solution: "Diseñamos un sistema de identidad visual coherente que incluye logotipo, paleta de colores, tipografía y aplicaciones.",
      results: ["Reconocimiento de marca incrementado 40%", "Consistencia visual en todos los touchpoints", "Mejora en la percepción de marca"],
      tools: ["Illustrator", "Photoshop", "Figma"],
      duration: "8 semanas",
    },
  },
  {
    id: "sesion-retrato-editorial",
    title: "Sesión Retrato Editorial",
    client: "Marca B",
    category: "foto",
    categoryLabel: "Fotografía",
    layout: "narrow tall",
    accent: "foto",
    overlay: "Ver galería",
    visual: {
      type: "gradient",
      label: "Retrato",
      gradient: "linear-gradient(180deg, #080d1a 0%, #0d1525 100%)",
    },
    details: {
      description: "Sesión fotográfica editorial con enfoque en narrativa visual y estilo artístico.",
      challenge: "Capturar la esencia del cliente en un formato editorial que pudiera ser utilizado en múltiples plataformas.",
      solution: "Utilizamos iluminación profesional y dirección creativa para obtener imágenes impactantes.",
      results: ["200+ fotos editadas", "Publicación en revista digital", "Campaña en redes sociales"],
      tools: ["Canon EOS R5", "Profoto B10", "Lightroom"],
      duration: "2 días",
    },
  },
  {
    id: "gestion-estrategia-redes",
    title: "Gestión & Estrategia de Redes",
    client: "Marca C",
    category: "social",
    categoryLabel: "Social Media",
    layout: "third",
    accent: "social",
    overlay: "Ver resultados",
    visual: {
      type: "gradient",
      label: "Social",
      gradient: "linear-gradient(135deg, #0a1a0a 0%, #0d200d 100%)",
    },
    details: {
      description: "Estrategia integral de redes sociales con contenido orgánico y paid media.",
      challenge: "Aumentar el engagement y seguidores de manera orgánica en Instagram y TikTok.",
      solution: "Desarrollamos un calendario de contenido, estrategia de hashtags y colaboraciones con influencers.",
      results: ["+150% seguidores en 3 meses", "Engagement rate 8.5%", "Ventas incrementadas 35%"],
      tools: ["Meta Business Suite", "Canva", "Later"],
      duration: "3 meses",
    },
  },
  {
    id: "spot-publicitario",
    title: "Spot Publicitario",
    client: "Marca D",
    category: "video",
    categoryLabel: "Video",
    layout: "third",
    accent: "video",
    overlay: "Ver video",
    visual: {
      type: "gradient",
      label: "Spot",
      gradient: "linear-gradient(135deg, #1a0010 0%, #250018 100%)",
    },
    details: {
      description: "Producción audiovisual de spot publicitario para campaña de lanzamiento.",
      challenge: "Crear un spot de 30 segundos que comunicara los beneficios del producto de manera creativa.",
      solution: "Desarrollamos guion, producción y post-producción con enfoque en storytelling visual.",
      results: ["Spot emitido en TV regional", "1M+ views en redes", "ROI 240%"],
      tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      duration: "4 semanas",
    },
  },
  {
    id: "brandbook-sistema-identidad",
    title: "Brandbook & Sistema de Identidad 360°",
    client: "Marca F · Proyecto integral",
    category: "brand",
    categoryLabel: "Branding · Proyecto destacado",
    layout: "full",
    accent: "brand",
    featured: true,
    overlay: "Ver caso completo",
    visual: {
      type: "gradient",
      label: "Proyecto destacado",
      gradient: "linear-gradient(90deg, #0d0800 0%, #1a1000 40%, #0d0800 100%)",
    },
    details: {
      description: "Proyecto integral de creación de marca desde cero, incluyendo naming, identidad visual y aplicaciones.",
      challenge: "Crear una marca nueva desde cero que destacara en el mercado y conectara con el público objetivo.",
      solution: "Desarrollamos naming, identidad visual completa, brandbook y guía de aplicación 360°.",
      results: ["Marca lanzada exitosamente", "Reconocimiento inmediato", "Expansión a 3 mercados"],
      tools: ["Figma", "Illustrator", "Brand strategy workshops"],
      duration: "12 semanas",
    },
  },
  {
    id: "cobertura-evento",
    title: "Cobertura de Evento",
    client: "Marca G",
    category: "video",
    categoryLabel: "Video",
    layout: "half",
    accent: "video",
    overlay: "Ver video",
    visual: {
      type: "gradient",
      label: "Evento",
      gradient: "linear-gradient(135deg, #100818 0%, #180d22 100%)",
    },
    details: {
      description: "Cobertura audiovisual completa de evento corporativo con múltiples cámaras.",
      challenge: "Capturar momentos clave y emociones del evento para contenido posterior.",
      solution: "Equipo de 3 cámaras, edición en tiempo real y entrega de highlights.",
      results: ["Video highlights 2 min", "300+ fotos", "Contenido para redes sociales"],
      tools: ["Sony FX6", "DJI Ronin", "Premiere Pro"],
      duration: "1 día + 1 semana edición",
    },
  },
  {
    id: "campana-digital-metricas",
    title: "Campaña Digital + Métricas",
    client: "Marca H",
    category: "social",
    categoryLabel: "Social Media",
    layout: "half",
    accent: "social",
    overlay: "Ver resultados",
    visual: {
      type: "gradient",
      label: "Campaña",
      gradient: "linear-gradient(135deg, #0a1505 0%, #0f1f08 100%)",
    },
    details: {
      description: "Campaña digital con enfoque en métricas y optimización continua.",
      challenge: "Generar leads cualificados y medir ROI de manera precisa.",
      solution: "Implementamos tracking avanzado y optimización basada en datos.",
      results: ["+500 leads generados", "CPL reducido 45%", "ROAS 320%"],
      tools: ["Google Analytics", "Meta Ads", "Hotjar"],
      duration: "2 meses",
    },
  },
  {
    id: "diseno-logo-papeleria",
    title: "Diseño de Logo & Papelería",
    client: "Marca I",
    category: "brand",
    categoryLabel: "Branding",
    layout: "narrow",
    accent: "brand",
    overlay: "Ver proyecto",
    visual: {
      type: "gradient",
      label: "Logo",
      gradient: "linear-gradient(135deg, #180800 0%, #220d00 100%)",
    },
    details: {
      description: "Diseño de identidad visual básica con aplicaciones de papelería corporativa.",
      challenge: "Crear un logo memorable y versátil para aplicaciones múltiples.",
      solution: "Desarrollo de logo principal y variantes, tarjetas, papel membretado y más.",
      results: ["Logo versátil", "Kit de papelería completo", "Guía de uso"],
      tools: ["Illustrator", "InDesign", "Figma"],
      duration: "3 semanas",
    },
  },
  {
    id: "sesion-fotos-corporativa",
    title: "Sesión de Fotos Corporativa",
    client: "Marca J",
    category: "foto",
    categoryLabel: "Fotografía",
    layout: "wide",
    accent: "foto",
    overlay: "Ver galería",
    visual: {
      type: "gradient",
      label: "Corporativo",
      gradient: "linear-gradient(135deg, #080f18 0%, #0d1a28 100%)",
    },
    details: {
      description: "Sesión fotográfica corporativa para equipo y espacio de trabajo.",
      challenge: "Reflejar la cultura corporativa y profesionalismo de la empresa.",
      solution: "Fotografía en instalaciones con enfoque en naturalidad y confianza.",
      results: ["Equipo fotografiado", "Espacio corporativo", "Contenido para web"],
      tools: ["Canon EOS R5", "Softbox lighting", "Lightroom"],
      duration: "1 día",
    },
  },
  {
    id: "post-produccion-color",
    title: "Post Producción & Color",
    client: "Marca K",
    category: "video",
    categoryLabel: "Video",
    layout: "third",
    accent: "video",
    overlay: "Ver resultado",
    visual: {
      type: "gradient",
      label: "Color",
      gradient: "linear-gradient(135deg, #150010 0%, #200018 100%)",
    },
    details: {
      description: "Post producción y gradación de color para proyecto audiovisual.",
      challenge: "Corregir y mejorar la estética visual de material crudo.",
      solution: "Grading de color profesional, corrección de exposición y consistencia visual.",
      results: ["Video finalizado", "Paleta de color coherente", "Entrega en 4K"],
      tools: ["DaVinci Resolve", "Premiere Pro"],
      duration: "1 semana",
    },
  },
  {
    id: "lanzamiento-marca-redes",
    title: "Lanzamiento de Marca en Redes",
    client: "Marca L",
    category: "social",
    categoryLabel: "Social Media",
    layout: "third",
    accent: "social",
    overlay: "Ver caso",
    visual: {
      type: "gradient",
      label: "Launch",
      gradient: "linear-gradient(135deg, #061208 0%, #0a1a0d 100%)",
    },
    details: {
      description: "Estrategia de lanzamiento en redes sociales para nueva marca.",
      challenge: "Generar expectativa y alcance orgánico para el lanzamiento.",
      solution: "Teaser campaign, countdown y contenido de valor previo al lanzamiento.",
      results: ["10K seguidores en 2 semanas", "Trending topic local", "Agotamiento inicial"],
      tools: ["Instagram", "TikTok", "Twitter"],
      duration: "4 semanas",
    },
  },
  {
    id: "identidad-packaging",
    title: "Identidad Visual + Packaging",
    client: "Marca M",
    category: "brand",
    categoryLabel: "Branding",
    layout: "third",
    accent: "brand",
    overlay: "Ver proyecto",
    visual: {
      type: "gradient",
      label: "Packaging",
      gradient: "linear-gradient(135deg, #18100a 0%, #221808 100%)",
    },
    details: {
      description: "Desarrollo de packaging que refuerza la identidad de marca.",
      challenge: "Crear packaging funcional y atractivo que destacara en el punto de venta.",
      solution: "Diseño estructural y estético con enfoque en experiencia de usuario.",
      results: ["Packaging premiado", "Aumento ventas 28%", "Rediseño exitoso"],
      tools: ["Illustrator", "3D modeling", "Prototipado"],
      duration: "6 semanas",
    },
  },
] as const;

export type PortfolioCategory = (typeof portfolioFilters)[number]["value"];

export interface PortfolioProjectDetails {
  description: string;
  challenge: string;
  solution: string;
  results: readonly string[];
  tools: readonly string[];
  duration: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  categoryLabel: string;
  layout: string;
  accent: string;
  overlay: string;
  visual: {
    type: string;
    label: string;
    gradient: string;
  };
  featured?: boolean;
  details?: PortfolioProjectDetails;
}

export type PortfolioProjectItem = (typeof portfolioProjects)[number];

export const getPortfolioGridClass = (project: PortfolioProjectItem) => {
  if (project.layout === "wide") return "col-span-12 lg:col-span-8";
  if (project.layout === "narrow tall")
    return "col-span-12 lg:col-span-4 lg:row-span-2";
  if (project.layout === "narrow") return "col-span-12 lg:col-span-4";
  if (project.layout === "half") return "col-span-12 md:col-span-6";
  if (project.layout === "third")
    return "col-span-12 md:col-span-6 lg:col-span-4";
  return "col-span-12";
};

export const getPortfolioAccentClass = (project: PortfolioProjectItem) => {
  if (project.accent === "brand") return "bg-[#f1a135]";
  if (project.accent === "foto") return "bg-[#35d9f1]";
  if (project.accent === "video") return "bg-[#f135a0]";
  return "bg-skala-accent";
};
