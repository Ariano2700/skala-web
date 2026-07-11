export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const TeamData: TeamMember[] = [
  {
    id: 1,
    name: "Claudia",
    role: "CEO",
    image: "/team/claudia.jpeg",
  },
  {
    id: 2,
    name: "Fernando",
    role: "PROJECT MANAGER",
    image: "/team/fernando.jpeg",
  },
  {
    id: 3,
    name: "Josemiguel",
    role: "TRAFFICKER DIGITAL", //ESTAFADOR PRO
    image: "/team/josemiguel.jpeg",
  },
  {
    id: 4,
    name: "Ariano",
    role: "Desarrollador Fullstack",
    image: "/team/ariano.jpeg",
  },
  {
    id: 5,
    name: "Valeria",
    role: "Diseñadora grafica",
    image: "/team/valeria.jpeg",
  },
  {
    id: 6,
    name: "Juan",
    role: "REALIZADOR AUDIOVISUAL",
    image: "/team/juan.jpeg",
  },
  {
    id: 7,
    name: "Joseph",
    role: "REALIZADOR AUDIOVISUAL",
    image: "/team/joseph.jpeg",
  },
  {
    id: 8,
    name: "Kevin",
    role: "DIRECTOR DE OPERACIONES",
    image: "/team/kevin.jpeg",
  }
];
