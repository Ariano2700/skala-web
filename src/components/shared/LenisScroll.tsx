import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function LenisScroll() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // En móviles/táctil y cuando el usuario reduce animaciones, el scroll nativo suele ir mejor.
    if (reduceMotion || !finePointer) return;

    initialized.current = true;

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

    return () => {
      gsap.ticker.remove(onTick);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default LenisScroll;