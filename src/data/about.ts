import {
  FiBarChart2,
  FiFilm,
  FiPenTool,
  FiShare2,
} from "react-icons/fi";

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
