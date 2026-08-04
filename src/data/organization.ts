// Fuente única de verdad para el JSON-LD de la entidad "Skala" (Organization /
// ProfessionalService). Antes este bloque estaba repetido a mano en 4 páginas
// (index, servicios, portafolio, cobertura-eventos) más una segunda entidad
// "Organization" suelta en Team.astro — desincronizadas entre sí (ej. el
// teléfono era distinto en index.astro que en el resto del sitio).
//
// Ahora hay un solo @id fijo (`ORGANIZATION_ID`) que todas las páginas y
// bloques relacionados (WebSite.publisher, Service.provider, Team) referencian
// en vez de declarar la entidad de nuevo.
import { CONTACT_DATA } from "./contact_data";
import { TeamData } from "./team.data";

export const SITE_URL = "https://skalaagencia.netlify.app";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Referencia liviana: úsala en cualquier propiedad (publisher, provider,
// organizer, etc.) que deba apuntar a la entidad sin volver a declararla.
export const organizationRef = { "@id": ORGANIZATION_ID } as const;

const baseOrganization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: "Skala",
  url: SITE_URL,
  image: `${SITE_URL}/logotype.jpg`,
  logo: `${SITE_URL}/logotype.jpg`,
  telephone: CONTACT_DATA.WHATSAPP_NUMBER,
  areaServed: "Trujillo, Peru",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Trujillo",
    addressRegion: "La Libertad",
    addressCountry: "PE",
  },
  sameAs: [
    CONTACT_DATA.INSTAGRAM_LINK,
    CONTACT_DATA.FACEBOOK_LINK,
    CONTACT_DATA.TIKTOK_LINK,
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
};

// Bloque base: úsalo en cualquier página que solo necesite declarar la
// entidad (servicios, portafolio, cobertura-eventos).
export function getOrganizationSchema() {
  return { ...baseOrganization };
}

// Variante con el equipo (employee[]) para la home, que es la única página
// que renderiza <Team /> — reemplaza el JSON-LD "Organization" que antes
// emitía Team.astro por su cuenta.
export function getOrganizationWithTeamSchema() {
  return {
    ...baseOrganization,
    employee: TeamData.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      worksFor: organizationRef,
    })),
  };
}
