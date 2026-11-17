// Bloqueo de scroll de la página mientras hay un modal abierto (lightbox de
// eventos y de proyectos).
//
// - overflow: hidden en <html> (no sólo en <body>): es <html> quien scrollea
//   la página, así que es el que hay que frenar.
// - Lenis (scroll suave en desktop, ver LenisScroll.tsx) mueve la página por
//   JS con window.scrollTo, así que ignora el overflow: hay que pausarlo
//   aparte con lenis.stop().
// - Se compensa el ancho de la barra de scroll con padding-right para que
//   el contenido no "salte" hacia la derecha al desaparecer la barra.
// - Contador: si se abren dos modales anidados, sólo se libera al cerrar
//   el último.

type LenisLike = { stop: () => void; start: () => void };

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;

  const html = document.documentElement;
  const scrollbarWidth = window.innerWidth - html.clientWidth;
  html.style.overflow = "hidden";
  if (scrollbarWidth > 0) html.style.paddingRight = `${scrollbarWidth}px`;
  window.__lenis?.stop();
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;

  const html = document.documentElement;
  html.style.overflow = "";
  html.style.paddingRight = "";
  window.__lenis?.start();
}
