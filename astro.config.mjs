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
  },
  site: "https://skalaagencia.netlify.app",
  output: "static",
  integrations: [
    react(),
    icon(),
    sanity({
      projectId: "6ksx455m",
      dataset: "production",
      useCdn: false,
    }),
    netlify(),
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
