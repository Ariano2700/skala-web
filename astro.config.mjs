// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import icon from "astro-icon";

import sanity from "@sanity/astro";

import netlify from "@astrojs/netlify";


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
  },
  site: "https://skalaagencia.netlify.app",
  output: "server",
  adapter: netlify(),
  integrations: [
    react(),
    icon(),
    sanity({
      projectId: "6ksx455m",
      dataset: "production",
      useCdn: false,
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
