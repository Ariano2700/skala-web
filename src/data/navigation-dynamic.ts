import { getAllCategoriesByOrder } from "../sanity/category/api";
import { getAllEvents } from "../sanity/event/api";
import type { NavLink } from "./navigation";

/**
 * Builds dynamic navigation links for "Cobertura Eventos" from Sanity events
 */
export async function buildDynamicNavLinks(): Promise<NavLink[]> {
  try {
    const events = await getAllEvents();

    const subLinks: NavLink[] = events.map((event) => ({
      label: event.title,
      href: `/cobertura-eventos/${event.slug}`,
    }));

    return [
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
      { label: "Proceso", href: "#proceso" },
      { label: "Equipo", href: "#equipo" },
      { label: "Contacto", href: "#contacto" },
      { label: "Portafolio", href: "/portafolio" },
      { label: "Más Servicios", href: "/servicios" },
      {
        label: "Cobertura Eventos",
        href: "/cobertura-eventos",
        subLinks,
      },
    ];
  } catch (error) {
    console.error("Error building dynamic nav links:", error);
    // Fallback to static navigation
    return getStaticNavLinks();
  }
}

/**
 * Static fallback navigation links
 */
export function getStaticNavLinks(): NavLink[] {
  return [
    { label: "Servicios", href: "#servicios" },
    { label: "Planes", href: "#planes" },
    { label: "Proceso", href: "#proceso" },
    { label: "Equipo", href: "#equipo" },
    { label: "Contacto", href: "#contacto" },
    { label: "Portafolio", href: "/portafolio" },
    { label: "Más Servicios", href: "/servicios" },
    {
      label: "Cobertura Eventos",
      href: "/cobertura-eventos",
    },
  ];
}
