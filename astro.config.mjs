// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import icon from "astro-icon";

import sanity from "@sanity/astro";

import netlify from "@astrojs/netlify";

import partytown from "@astrojs/partytown";


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // gsap ships ESM in index.js but its package.json lacks "type": "module",
      // so Node fails to load it as externalized CJS in the SSR bundle.
      // Bundling it via esbuild fixes the ESM/CJS interop for Netlify SSR.
      noExternal: ["gsap", "@gsap/react"],
    },
    optimizeDeps: {
      // Sin esto, Vite recién "descubre" gsap/SplitText cuando el navegador
      // pide una página con <Team /> (el único componente que la usa) y
      // dispara una re-optimización de dependencias a mitad de sesión. Ese
      // re-optimize reemplaza node_modules/.vite/deps con un rename atómico
      // que en Windows puede fallar con EPERM (típico en unidades de red o
      // sincronizadas, ej. Google Drive) si algo más tiene un handle abierto
      // sobre esa carpeta — el resultado es un 503 en el chunk de
      // gsap/SplitText y el <script> de Team.astro nunca llega a correr, así
      // que las fotos del equipo se quedan invisibles (GSAP las deja en
      // opacity:0 hasta que su timeline de entrada las anima). Declarándolo
      // acá, Vite lo pre-empaqueta al arrancar el server, no a mitad de una
      // request.
      include: ["gsap", "gsap/SplitText", "gsap/ScrollTrigger", "@gsap/react"],
    },
  },
  site: "https://skalaagencia.netlify.app",
  output: "server",
  adapter: netlify(),
  build: {
    // El CSS scoped de los componentes de cada página se emite por defecto
    // como <link> externos: cada uno es una petición extra que bloquea el
    // primer pintado (PSI lo marca como "Solicitudes que bloquean el
    // renderizado"). Al inlinearlo en el <head> del propio HTML, ese CSS
    // llega en la misma respuesta que ya se está descargando, sin round
    // trips adicionales. Contrapartida: se pierde el cacheo entre páginas
    // de ese CSS (se reenvía en cada navegación); para este sitio, donde
    // Lighthouse audita landings de una sola página, compensa.
    inlineStylesheets: "always",
  },
  integrations: [
    react(),
    icon(),
    sanity({
      projectId: "6ksx455m",
      dataset: "production",
      useCdn: false,
    }),
    // Corre gtag.js (Google Analytics 4) en un web worker en vez del hilo
    // principal. "dataLayer.push" es la única llamada que necesitamos
    // reenviar al worker: es como gtag() encola comandos (config, consent,
    // event) internamente.
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  image: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
});
