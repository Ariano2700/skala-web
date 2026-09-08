import type { APIRoute } from "astro";
import { CONTACT_DATA } from "../data/contact_data";

// /llms.txt — guía en Markdown para modelos de lenguaje/crawlers de IA
// (ver https://llmstxt.org): un H1 con el nombre del sitio, un blockquote
// de resumen y listas de enlaces por sección. Se sirve como endpoint (igual
// que robots.txt.ts y sitemap.xml.ts) en vez de un archivo estático en
// /public para que la URL base salga siempre de Astro.site y no quede
// hardcodeada ni se desincronice si cambia el dominio.
const getLlmsTxt = (baseUrl: URL) => {
  const url = (path: string) => new URL(path, baseUrl).href;

  return `# Skala Agencia

> Agencia de branding, diseño gráfico, desarrollo web y producción audiovisual (foto/video de eventos) con sede en Trujillo, Perú.

Skala ayuda a negocios y marcas a construir una identidad visual sólida y una presencia digital profesional: branding, sitios web, diseño gráfico y cobertura fotográfica/audiovisual de eventos. Este archivo resume las secciones principales del sitio para asistentes y modelos de lenguaje; el contenido completo, actualizado, vive en las páginas HTML enlazadas abajo.

## Páginas principales

- [Inicio](${url("/")}): presentación de Skala, servicios, marcas que confían en la agencia y equipo.
- [Servicios](${url("/servicios")}): catálogo completo de servicios (branding, diseño gráfico, desarrollo web, foto/video de eventos).
- [Nosotros](${url("/nosotros")}): quiénes somos, equipo y forma de trabajo.
- [Portafolio](${url("/portafolio")}): proyectos y trabajos realizados para clientes.
- [Cobertura de eventos](${url("/cobertura-eventos")}): galería de eventos cubiertos por el equipo audiovisual.
- [Preguntas frecuentes](${url("/preguntas-frecuentes")}): dudas comunes sobre servicios, tiempos y precios.

## Contacto

- WhatsApp: ${CONTACT_DATA.WHATSAPP_NUMBER}
- Email: ${CONTACT_DATA.EMAIL_ADDRESS}
- Instagram: ${CONTACT_DATA.INSTAGRAM_LINK}
- Facebook: ${CONTACT_DATA.FACEBOOK_LINK}
- TikTok: ${CONTACT_DATA.TIKTOK_LINK}

## Optional

- [Mapa del sitio](${url("/sitemap.xml")}): listado XML de todas las URLs indexables.
- [Política de privacidad](${url("/politica-de-privacidad")})
- [Política de cookies](${url("/politica-de-cookies")})
- [Términos y condiciones](${url("/terminos-y-condiciones")})
`;
};

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site
    ? new URL(site)
    : new URL("https://skalaagencia.netlify.app");

  return new Response(getLlmsTxt(baseUrl), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
