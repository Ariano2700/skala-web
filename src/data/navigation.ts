interface NavLink {
  label: string;
  href: string;
  subLinks?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Proceso", href: "#proceso" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
  { label: "Portafolio", href: "/portafolio" },
  //TEMPORAL
  { label: "Desfile Canino", href: "/desfile-canino" },
  { label: "Galería Desfile Canino", href: "/galeria-desfile-canino" },
];
