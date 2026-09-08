import { useEffect, useRef } from "react";

function LenisScroll() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // En móviles/táctil y cuando el usuario reduce animaciones, el scroll
    // nativo suele ir mejor. Por eso gsap/ScrollTrigger + lenis se importan
    // dinámicamente recién acá adentro: en touch (la mayoría del tráfico
    // mobile) ese chunk (~25KB gzip) ni se descarga ni se ejecuta, en vez de
    // bajarlo siempre para terminar sin usarlo.
    if (reduceMotion || !finePointer) return;

    initialized.current = true;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([{ default: gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.075,
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Sin esto, ScrollTrigger escucha el evento "scroll" nativo y queda un
      // frame por detrás del scroll suavizado de Lenis: cualquier scrub (como
      // el fundido del hero en HeroOverlapReveal.astro) se ve con micro-tirones.
      // Enganchar ambos al mismo ticker de GSAP los mantiene en el mismo reloj.
      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const handleAnchorClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        e.preventDefault();
        lenis.scrollTo(targetEl, { duration: 0.9 });
      };

      document.addEventListener("click", handleAnchorClick);

      cleanup = () => {
        gsap.ticker.remove(onTick);
        document.removeEventListener("click", handleAnchorClick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

export default LenisScroll;