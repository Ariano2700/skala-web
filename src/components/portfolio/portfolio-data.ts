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
  },
] as const;

export type PortfolioCategory = (typeof portfolioFilters)[number]["value"];

export type PortfolioProject = (typeof portfolioProjects)[number];

export const getPortfolioGridClass = (project: PortfolioProject) => {
  if (project.layout === "wide") return "col-span-12 lg:col-span-8";
  if (project.layout === "narrow tall")
    return "col-span-12 lg:col-span-4 lg:row-span-2";
  if (project.layout === "narrow") return "col-span-12 lg:col-span-4";
  if (project.layout === "half") return "col-span-12 md:col-span-6";
  if (project.layout === "third")
    return "col-span-12 md:col-span-6 lg:col-span-4";
  return "col-span-12";
};

export const getPortfolioAccentClass = (project: PortfolioProject) => {
  if (project.accent === "brand") return "bg-[#f1a135]";
  if (project.accent === "foto") return "bg-[#35d9f1]";
  if (project.accent === "video") return "bg-[#f135a0]";
  return "bg-skala-accent";
};
