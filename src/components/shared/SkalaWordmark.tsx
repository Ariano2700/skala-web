import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useId, useRef } from "react";
import fullLogo from "../../icons/logotype.svg?raw";

const getPathData = (svg: string) =>
  svg.match(/<path\b[^>]*>/)?.[0].match(/d="([^"]+)"/)?.[1] ?? "";

const logoPath = getPathData(fullLogo);
const wordmarkWidth = 1628;
const wordmarkHeight = 741;
const splitX = wordmarkWidth / 2;

export default function SkalaWordmark() {
  const wordmarkRef = useRef<SVGSVGElement | null>(null);
  const uid = `skala-wordmark-${useId().replaceAll(":", "")}`;

  useGSAP(
    () => {
      const root = wordmarkRef.current;
      if (!root) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) {
        document.documentElement.classList.add("skala-wordmark-ready");
        return;
      }

      const leftHalf = root.querySelector<SVGPathElement>(".skala-half-left");
      const rightHalf = root.querySelector<SVGPathElement>(".skala-half-right");
      if (!leftHalf || !rightHalf) return;

      gsap.set([leftHalf, rightHalf], {
        autoAlpha: 0,
        scale: 0.92,
      });

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .set([leftHalf, rightHalf], {
          transformOrigin: "50% 50%",
        })
        .fromTo(
          leftHalf,
          {
            x: -36,
            autoAlpha: 0,
            scale: 0.92,
          },
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.82,
          },
          0,
        )
        .fromTo(
          rightHalf,
          {
            x: 36,
            autoAlpha: 0,
            scale: 0.92,
          },
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.82,
          },
          0.08,
        )
        .to(
          root,
          {
            scale: 1.04,
            duration: 0.2,
            ease: "power2.out",
          },
          ">-0.08",
        )
        .to(root, {
          scale: 1.025,
          duration: 0.45,
          ease: "power3.out",
        })
        .to(leftHalf, {
          x: 1,
          duration: 0.18,
          ease: "power2.out",
        })
        .to(
          rightHalf,
          {
            x: -2,
            duration: 0.18,
            ease: "power2.out",
          },
          "<",
        );

      document.documentElement.classList.add("skala-wordmark-ready");
    },
    { scope: wordmarkRef },
  );

  return (
    <svg
      ref={wordmarkRef}
      className="text-skala-accent skala-wordmark pointer-events-none inline-block h-2em w-[3.45em] translate-y-[0.08em] align-[-0.1em] overflow-visible"
      viewBox={`0 0 ${wordmarkWidth} ${wordmarkHeight}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`${uid}-left`}>
          <rect x="0" y="0" width={splitX} height={wordmarkHeight} />
        </clipPath>
        <clipPath id={`${uid}-right`}>
          <rect x={splitX} y="0" width={splitX} height={wordmarkHeight} />
        </clipPath>
      </defs>

      <path
        className="skala-half skala-half-left"
        d={logoPath}
        fill="currentColor"
        clipPath={`url(#${uid}-left)`}
      />
      <path
        className="skala-half skala-half-right"
        d={logoPath}
        fill="currentColor"
        clipPath={`url(#${uid}-right)`}
      />
    </svg>
  );
}
