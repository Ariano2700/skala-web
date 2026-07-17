import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioProjectItem } from "../../data/portafolio";
import { IoIosClose } from "react-icons/io";
import Carousel from "../shared/Carousel";
import DetailBlock from "../shared/DetailBlock";

export default function ModalPortfolio() {
  const [project, setProject] = useState<PortfolioProjectItem | null>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const media = project?.media ?? [];
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

  const open = useCallback((p: PortfolioProjectItem) => {
    setProject(p);
    setCurrent(0);
    setPlaying(null);
    document.body.classList.add("overflow-hidden");
  }, []);

  const close = useCallback(() => {
    setProject(null);
    setPlaying(null);
    document.body.classList.remove("overflow-hidden");
  }, []);

  const handlePlay = useCallback((index: number) => {
    videoRefs.current[index]?.play();
    setPlaying(index);
  }, []);

  const handlePause = useCallback((index: number) => {
    videoRefs.current[index]?.pause();
    setPlaying(null);
  }, []);

  // Abrir el modal desde las tarjetas del portafolio (Astro) por delegación.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest<HTMLElement>("[data-open-project]");
      if (!card) return;
      const raw = card.dataset.project;
      if (!raw) return;
      try {
        open(JSON.parse(raw) as PortfolioProjectItem);
      } catch {
        /* ignora datos inválidos */
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  // Teclado: Escape cierra, flechas navegan el carrusel.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goTo(current - 1);
      else if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, current, close, goTo]);

  if (!project) return null;

  const d = project.details;
  const categoryLabels = project.categories.filter(Boolean).join(" · ");

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 mt-10"
      data-project-modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#020a1a]/80 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div
        className="project-modal-panel relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-4xl border border-skala-border bg-skala-surface-strong shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
        data-project-modal-panel
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="cursor-pointer absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-skala-text transition duration-200 hover:bg-skala-accent/10 focus-visible:ring-2 focus-visible:ring-skala-accent/60"
        >
          <IoIosClose />
        </button>

        <div className="overflow-y-auto" data-project-modal-scroll>
          <div className="relative bg-black" data-project-modal-media>
            <Carousel
              media={media}
              current={current}
              total={total}
              title={project.title}
              playing={playing}
              videoRefs={videoRefs}
              onGoTo={goTo}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>

          <div className="p-6 md:p-8">
            <p className="m-0 text-[0.68rem] font-black uppercase tracking-[0.22em] text-skala-accent">
              {categoryLabels}
            </p>
            <h3
              id="project-modal-title"
              className="mt-2 font-display text-2xl font-black leading-tight tracking-[-0.04em] text-skala-text md:text-3xl"
            >
              {project.title}
            </h3>
            <div className="flex flex-col">
              <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
                Cliente
              </p>
              <p className="m-0 text-sm font-medium text-skala-text">
                {project.client}
              </p>
            </div>

            {d && (
              <div
                data-project-modal-details
                className="mt-6 flex flex-col gap-5"
              >
                <DetailBlock label="Descripción" value={d.description} />
                <DetailBlock label="Desafío" value={d.challenge} />
                <DetailBlock label="Solución" value={d.solution} />

                {d.results.length > 0 && (
                  <div>
                    <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
                      Resultados
                    </p>
                    <ul className="m-0 flex flex-col gap-1.5">
                      {d.results.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-skala-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-skala-accent" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {d.tools.length > 0 && (
                  <div>
                    <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
                      Herramientas
                    </p>
                    <ul className="m-0 flex flex-wrap gap-2">
                      {d.tools.map((tool, i) => (
                        <li
                          key={i}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-skala-muted"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(d.duration || d.year || d.externalUrl) && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {d.duration && (
                      <div className="flex flex-col">
                        <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
                          Duración
                        </p>
                        <p className="m-0 text-sm text-skala-muted">
                          {d.duration}
                        </p>
                      </div>
                    )}

                    {d.year && (
                      <div className="flex flex-col">
                        <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
                          Año
                        </p>
                        <p className="m-0 text-sm text-skala-muted">{d.year}</p>
                      </div>
                    )}

                    {d.externalUrl && (
                      <div className="flex flex-col">
                        <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
                          Enlace
                        </p>
                        <a
                          href={d.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-2 rounded-full border border-skala-accent/40 bg-skala-accent/10 px-4 py-2 text-sm font-semibold text-skala-accent shadow-[0_6px_20px_rgba(92,216,252,0.15)] transition hover:scale-[1.03] hover:bg-skala-accent hover:text-skala-text-secondary"
                        >
                          Ver publicación
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
