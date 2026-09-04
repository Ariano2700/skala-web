import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import type { PortfolioMedia } from "../../data/portafolio";
import Carousel from "../shared/Carousel";

interface Props {
  media: PortfolioMedia[];
  title: string;
}

// Visor de galería a pantalla completa para la página de detalle de un
// proyecto. Se monta una sola vez (client:load) y escucha clicks en
// [data-gallery-open] delegados desde ProjectGallery.astro (data-index le
// dice qué recurso abrir), así el HTML de las miniaturas se queda 100%
// estático y liviano.
export default function ProjectGalleryLightbox({ media, title }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const total = media.length;

  const pauseVideos = useCallback(() => {
    videoRefs.current.forEach((v) => v?.pause());
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      pauseVideos();
      setPlaying(null);
      setCurrent(((index % total) + total) % total);
    },
    [total, pauseVideos],
  );

  const close = useCallback(() => {
    pauseVideos();
    setOpen(false);
    setPlaying(null);
    document.body.classList.remove("overflow-hidden");
  }, [pauseVideos]);

  const handlePlay = useCallback((index: number) => {
    videoRefs.current[index]?.play();
    setPlaying(index);
  }, []);

  const handlePause = useCallback((index: number) => {
    videoRefs.current[index]?.pause();
    setPlaying(null);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest<HTMLElement>("[data-gallery-open]");
      if (!trigger) return;
      const index = Number(trigger.dataset.index ?? 0);
      setCurrent(Number.isFinite(index) ? index : 0);
      setOpen(true);
      document.body.classList.add("overflow-hidden");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goTo(current - 1);
      else if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, current, close, goTo]);

  if (!open || total === 0) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      data-gallery-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${title}`}
    >
      <div
        className="absolute inset-0 bg-[#020a1a]/88"
        onClick={close}
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-4xl border border-skala-border bg-black shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar galería"
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-2xl text-white transition duration-200 hover:bg-skala-accent hover:text-skala-text-secondary focus-visible:ring-2 focus-visible:ring-skala-accent/70"
        >
          <IoIosClose />
        </button>

        <span className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white">
          {current + 1} / {total}
        </span>

        <Carousel
          media={media}
          current={current}
          total={total}
          title={title}
          playing={playing}
          videoRefs={videoRefs}
          onGoTo={goTo}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
    </div>
  );
}
