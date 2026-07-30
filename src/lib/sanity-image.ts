type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "max" | "crop" | "fill" | "clip";
};

/**
 * Agrega parámetros de transformación a una URL de cdn.sanity.io.
 * Si la URL no es de Sanity (ej. video poster externo), la devuelve tal cual.
 */
export function sanityImageUrl(
  url: string,
  { width, height, quality = 75, fit = "max" }: SanityImageOptions = {},
) {
  if (!url || !url.includes("cdn.sanity.io")) return url;

  const params = new URLSearchParams();
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  params.set("q", String(quality));
  params.set("fit", fit);
  params.set("auto", "format"); // sirve WebP/AVIF automáticamente

  return `${url}?${params.toString()}`;
}

/** Genera un srcset para la grilla, con varios anchos. */
export function sanitySrcSet(url: string, widths: number[], quality = 75) {
  if (!url || !url.includes("cdn.sanity.io")) return undefined;
  return widths
    .map((w) => `${sanityImageUrl(url, { width: w, quality })} ${w}w`)
    .join(", ");
}
