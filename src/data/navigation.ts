export interface NavLink {
  label: string;
  href: string;
  subLinks?: NavLink[];
}

// Navegación del header (desktop + mobile) y del footer. Es estática a
// propósito: antes "Cobertura Eventos" era un acordeón con un sublink por
// evento, armado con getAllEvents() de Sanity — y como SiteNav y SiteFooter
// lo pedían cada uno, eran 2 consultas a Sanity en CADA render de página
// sólo para el menú. Ahora "Coberturas" es un link directo al listado
// (/cobertura-eventos), donde ya se ven todos los eventos.
export const navLinks: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Proceso", href: "#proceso" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
  { label: "Más Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Coberturas", href: "/cobertura-eventos" },
  {
    label: "Nosotros",
    href: "/nosotros",
    subLinks: [
      { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
    ],
  },
];
