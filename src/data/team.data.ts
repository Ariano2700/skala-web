import type { ImageMetadata } from "astro";
import ariano from "../assets/team/ariano.jpeg";
import claudia from "../assets/team/claudia.jpeg";
import fernando from "../assets/team/fernando.jpeg";
import josemiguel from "../assets/team/josemiguel.jpeg";
import joseph from "../assets/team/joseph.jpeg";
import juan from "../assets/team/juan.jpeg";
import kevin from "../assets/team/kevin.jpeg";
import valeria from "../assets/team/valeria.jpeg";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: ImageMetadata;
}

export const TeamData: TeamMember[] = [
  {
    id: 1,
    name: "Claudia",
    role: "CEO",
    image: claudia,
  },
  {
    id: 2,
    name: "Fernando",
    role: "PROJECT MANAGER",
    image: fernando,
  },
  {
    id: 3,
    name: "Josemiguel",
    role: "TRAFFICKER DIGITAL", //ESTAFADOR PRO
    image: josemiguel,
  },
  {
    id: 4,
    name: "Ariano",
    role: "Desarrollador Fullstack",
    image: ariano,
  },
  {
    id: 5,
    name: "Valeria",
    role: "Diseñadora grafica",
    image: valeria,
  },
  {
    id: 6,
    name: "Juan",
    role: "REALIZADOR AUDIOVISUAL",
    image: juan,
  },
  {
    id: 7,
    name: "Joseph",
    role: "REALIZADOR AUDIOVISUAL",
    image: joseph,
  },
  {
    id: 8,
    name: "Kevin",
    role: "DIRECTOR DE OPERACIONES",
    image: kevin,
  }
];
