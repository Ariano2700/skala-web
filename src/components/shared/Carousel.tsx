import { useRef } from "react";
import type { PortfolioProjectItem } from "../portfolio/portfolio-data";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

type ProjectMedia = PortfolioProjectItem["media"][number];

interface CarouselProps {
  media: ProjectMedia[];
  current: number;
  total: number;
  title: string;
  playing: number | null;
  videoRefs: React.RefObject<Array<HTMLVideoElement | null>>;
  onGoTo: (index: number) => void;
  onPlay: (index: number) => void;
  onPause: (index: number) => void;
}

export default function Carousel({
  media,
  current,
  total,
  title,
  playing,
  videoRefs,
  onGoTo,
  onPause,
  onPlay,
}: CarouselProps) {
  const startX = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 40) onGoTo(current + (diff < 0 ? 1 : -1));
  };

  return (
    <div
      className="relative aspect-square w-full select-none overflow-hidden"
      data-carousel
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {media.map((m, i) => {
        const active = i === current;
        return (
          <div
            key={i}
            className={`project-slide absolute inset-0 ${
              active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            data-slide-index={i}
          >
            {m.type === "image" ? (
              <img
                src={m.src}
                alt={m.alt ?? title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={m.src}
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                  data-slide-video
                />
                {playing !== i ? (
                  <button
                    type="button"
                    aria-label="Reproducir video"
                    className="absolute inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-skala-accent/90 text-skala-text-secondary shadow-[0_10px_30px_rgba(92,216,252,0.3)] transition hover:scale-105"
                    onClick={() => onPlay(i)}
                  >
                    <FaPlay />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label="Pausar video"
                    className="absolute inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-skala-accent/90 text-skala-text-secondary shadow-[0_10px_30px_rgba(92,216,252,0.3)] transition hover:scale-105"
                    onClick={() => onPause(i)}
                  >
                    <FaPause />
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => onGoTo(current - 1)}
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-skala-accent hover:text-skala-text-secondary"
          >
            <GrCaretPrevious />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => onGoTo(current + 1)}
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-skala-accent hover:text-skala-text-secondary"
          >
            <GrCaretNext />
          </button>
          <div
            className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
            data-carousel-dots
          >
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a recurso ${i + 1}`}
                className={`h-2 w-2 rounded-full transition ${
                  i === current ? "bg-skala-accent" : "bg-white/30"
                }`}
                onClick={() => onGoTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
