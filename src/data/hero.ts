import {
  FiArrowUpRight,
  FiCamera,
  FiSend,
  FiTrendingUp,
  FiVideo,
} from "react-icons/fi";

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
