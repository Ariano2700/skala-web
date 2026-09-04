// Marcas/clientes reales cuyos logos viven en /public/brands. Sumar una
// marca nueva es: soltar el archivo en esa carpeta + agregar una línea acá
// (BrandsMarquee.astro y su data no necesitan ningún otro cambio).

export interface Brand {
  name: string;
  /** Ruta dentro de /public. */
  logo: string;
  url: string;
}

export const brands: Brand[] = [
  { name: "Fisio Help", logo: "/brands/fisio_help.png", url:"https://www.instagram.com/fisiohelptrujillo/" },
  { name: "Colegio Isaac Newton", logo: "/brands/isaac_newton.png", url: "https://www.instagram.com/coleisaacnewton/" },
  { name: "Pucará Marketing", logo: "/brands/pucara_marketing.png", url: "https://www.instagram.com/pucaramarketing/" },
];
