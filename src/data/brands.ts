// Marcas/clientes reales cuyos logos viven en src/assets/brands. Sumar una
// marca nueva es: soltar el archivo en esa carpeta + importarlo acá + agregar
// una línea en el arreglo (BrandsMarquee.astro no necesita ningún otro
// cambio). Se importan como assets (en vez de servirlos crudos desde
// /public) para que Astro los optimice y genere un tamaño acorde al que se
// muestra (80–98px): los originales pesaban hasta 3240x3241px y ~130 KiB
// cada uno, ver auditoría "Mejorar la entrega de imágenes" de Lighthouse.
import type { ImageMetadata } from "astro";
import fisioHelp from "../assets/brands/fisio_help.png";
import isaacNewton from "../assets/brands/isaac_newton.png";
import pucaraMarketing from "../assets/brands/pucara_marketing.png";

export interface Brand {
  name: string;
  logo: ImageMetadata;
  url: string;
}

export const brands: Brand[] = [
  { name: "Fisio Help", logo: fisioHelp, url: "https://www.instagram.com/fisiohelptrujillo/" },
  { name: "Colegio Isaac Newton", logo: isaacNewton, url: "https://www.instagram.com/coleisaacnewton/" },
  { name: "Pucará Marketing", logo: pucaraMarketing, url: "https://www.instagram.com/pucaramarketing/" },
];
