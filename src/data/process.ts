import {
  FiCompass,
  FiRefreshCw,
  FiSend,
  FiTarget,
  FiVideo,
} from "react-icons/fi";

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
