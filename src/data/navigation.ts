interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
  { label: "Equipo", href: "#equipo" },
  { label: "Portafolio", href: "/portafolio" },
  //TEMPORAL
  { label: "Desfile Canino", href: "/desfile-canino" },
  { label: "Galería Canino", href: "/galeria-desfile-canino" },
];
