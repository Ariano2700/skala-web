export const plans = [
  {
    name: "Plan Base",
    tagline: "Ideal para emprendedores que recién arrancan su presencia.",
    featured: false,
    price: "S/ 600",
    period: "mensual",
    colors: { bg: "#03132d", text: "#5CD8FC" },
    features: [
      { label: "3 Reels", included: true },
      { label: "2 Carruseles", included: true },
      { label: "Sesión de fotos", included: true },
      { label: "Reunión con el cliente cada 1 semana", included: true },
      { label: "Grabación de contenido 1080p colorización básica", included: true },
    ],
    cta: "Elegir Base",
    cta_link_message: "Hola, quiero contratar el Plan Base (S/ 600).",
  },
  {
    name: "Plan Plus",
    tagline: "Más contenido y acompañamiento para crecer con orden.",
    featured: false,
    price: "S/ 950",
    period: "mensual",
    colors: { bg: "#B7E82A", text: "#141412" },
    features: [
      { label: "Grilla de contenido", included: true },
      { label: "4 Reels", included: true },
      { label: "2 Carruseles", included: true },
      { label: "Sesión de fotos", included: true },
      { label: "2 Historias a la semana", included: true },
      { label: "Reporte mensual", included: true },
      { label: "Grabación de contenido a 1080p colorizado", included: true },
    ],
    cta: "Elegir Plus",
    cta_link_message: "Hola, quiero contratar el Plan Plus (S/ 950).",
  },
  {
    name: "Plan Pro",
    tagline: "Producción 4K y community management para escalar.",
    featured: true,
    price: "S/ 1350",
    period: "mensual",
    badge: "Más elegido",
    colors: { bg: "#141412", text: "#FEFEFE" },
    features: [
      { label: "Grilla de contenido", included: true },
      { label: "6 Reels", included: true },
      { label: "3 Carruseles", included: true },
      { label: "5 Piezas Gráficas", included: true },
      { label: "4 Historias a la semana", included: true },
      { label: "Community manager", included: true },
      { label: "Reporte mensual", included: true },
      { label: "Grabación de contenido a 4k colorización básica", included: true },
    ],
    cta: "Elegir Pro",
    cta_link_message: "Hola, quiero contratar el Plan Pro (S/ 1350).",
  },
  {
    name: "Plan SKALA",
    tagline: "La experiencia completa en 4K con colorización pro.",
    featured: false,
    price: "S/ 2000",
    period: "mensual",
    colors: { bg: "#F4AC02", text: "#141412" },
    features: [
      { label: "Grilla de contenido", included: true },
      { label: "8 Reels", included: true },
      { label: "4 Carruseles", included: true },
      { label: "6 Piezas Gráficas", included: true },
      { label: "4 Historias a la semana", included: true },
      { label: "Community manager", included: true },
      { label: "Reportes mensuales", included: true },
      { label: "Grabación de contenido a 4k con colorización", included: true },
    ],
    cta: "Elegir SKALA",
    cta_link_message: "Hola, quiero contratar el Plan SKALA (S/ 2000).",
  },
];

// Servicios especiales: precio a cotizar con el cliente en reunión.
export const specialServices = {
  note: "Servicios especiales: cotizar precio con el cliente en una reunión.",
  travelNote: "70 pasajes por sesión",
  items: [
    {
      title: "Eventos Sociales",
      description:
        "Cobertura cinematográfica para matrimonios y quinceañeros, enfocada en capturar la narrativa emocional y los momentos clave.",
    },
    {
      title: "Celebraciones Privadas",
      description:
        "Registro profesional de cumpleaños, aniversarios y fiestas con un estilo dinámico.",
    },
    {
      title: "Sector Corporativo",
      description:
        "Producción de videos institucionales, grabación de conferencias, lanzamientos de marca y contenido empresarial.",
    },
    {
      title: "Fotografía Profesional",
      description:
        "Cobertura de eventos, sesiones de retrato corporativo, marca personal y fotografía de producto.",
    },
  ],
};
