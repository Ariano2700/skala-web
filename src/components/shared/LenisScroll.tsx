import Lenis from "lenis";
import { useEffect, useRef } from "react";

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

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

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
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default LenisScroll;