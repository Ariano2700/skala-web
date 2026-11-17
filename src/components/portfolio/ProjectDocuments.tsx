import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiFileText,
  FiMaximize2,
  FiMinimize2,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
// Solo la URL del worker (string): pdf.js en sí se importa dinámicamente
// cuando el visor entra en pantalla, así no pesa en la carga inicial.
// Build "legacy" = compatible con Safari/iOS más antiguos.
import pdfWorkerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import type { PortfolioDocument } from "../../data/portafolio";

type PdfJs = typeof import("pdfjs-dist/legacy/build/pdf.mjs");
type PdfDocument = Awaited<ReturnType<PdfJs["getDocument"]>["promise"]>;
type RenderTask = ReturnType<
  Awaited<ReturnType<PdfDocument["getPage"]>>["render"]
>;

interface Props {
  documents: PortfolioDocument[];
  title: string;
  accent?: string;
}

const ZOOM_STEPS = [1, 1.25, 1.5, 2, 3];

let pdfjsPromise: Promise<PdfJs> | null = null;
const loadPdfJs = () => {
  pdfjsPromise ??= import("pdfjs-dist/legacy/build/pdf.mjs").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    return lib;
  });
  return pdfjsPromise;
};

const formatSize = (bytes?: number) =>
  typeof bytes === "number" && bytes > 0
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : null;

/**
 * Visor de PDFs del proyecto (brochures, catálogos…). Renderiza página por
 * página en un <canvas> con pdf.js: navegación con flechas/teclado/swipe,
 * zoom, pantalla completa y descarga. Si el navegador no puede con pdf.js,
 * cae a un enlace para abrir el PDF.
 */
export default function ProjectDocuments({ documents, title, accent }: Props) {
  const [active, setActive] = useState(0);
  const doc = documents[active];

  if (!doc) return null;

  return (
    <div className="space-y-4">
      {documents.length > 1 && (
        <div
          role="tablist"
          aria-label="Documentos del proyecto"
          className="flex flex-wrap gap-2"
        >
          {documents.map((d, i) => (
            <button
              key={`${d.url}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`inline-flex max-w-full items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                i === active
                  ? "border-skala-accent/60 bg-skala-accent/15 text-skala-text"
                  : "border-skala-border bg-white/[0.03] text-skala-muted hover:border-skala-border-strong hover:text-skala-text"
              }`}
            >
              <FiFileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{d.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* key: al cambiar de documento se reinicia el visor completo */}
      <PdfViewer key={doc.url} doc={doc} title={title} accent={accent} />
    </div>
  );
}

function PdfViewer({
  doc,
  title,
  accent = "var(--color-skala-accent)",
}: {
  doc: PortfolioDocument;
  title: string;
  accent?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [pdf, setPdf] = useState<PdfDocument | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);

  const numPages = pdf?.numPages ?? 0;
  const zoom = ZOOM_STEPS[zoomIndex];

  // 1. Cargar pdf.js + el documento solo cuando el visor está cerca de la
  //    pantalla (el PDF puede pesar varios MB).
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let cancelled = false;
    let loadingTask: ReturnType<PdfJs["getDocument"]> | null = null;

    const start = async () => {
      setStatus("loading");
      try {
        const pdfjs = await loadPdfJs();
        if (cancelled) return;
        loadingTask = pdfjs.getDocument({ url: doc.url });
        loadingTask.onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
          if (total > 0) setProgress(Math.min(100, Math.round((loaded / total) * 100)));
        };
        const loaded = await loadingTask.promise;
        if (cancelled) {
          loaded.destroy();
          return;
        }
        setPdf(loaded);
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("[ProjectDocuments] No se pudo cargar el PDF:", err);
          setStatus("error");
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      loadingTask?.destroy();
    };
  }, [doc.url]);

  // Liberar el documento al desmontar / cambiar.
  useEffect(() => () => void pdf?.destroy(), [pdf]);

  // 2. Medir el ancho disponible (responsive).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([entry]) => {
      setStageWidth(Math.floor(entry.contentRect.width));
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // 3. Renderizar la página actual.
  useEffect(() => {
    if (!pdf || !stageWidth || !canvasRef.current) return;
    let cancelled = false;

    const render = async () => {
      setIsRendering(true);
      try {
        const pdfPage = await pdf.getPage(page);
        if (cancelled) return;

        const base = pdfPage.getViewport({ scale: 1 });
        // Ajuste: entra a lo ancho y, sin zoom, también a lo alto (para que
        // una página vertical se vea completa sin hacer scroll).
        const maxHeight = isFullscreen
          ? window.innerHeight - 140
          : Math.max(420, window.innerHeight * 0.78);
        const fitScale = Math.min(stageWidth / base.width, maxHeight / base.height);
        const cssScale = fitScale * zoom;
        const viewport = pdfPage.getViewport({ scale: cssScale });
        // Nitidez en pantallas retina, con tope para no reventar la memoria
        // del celular con páginas enormes.
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const maxCanvasPixels = 16_000_000;
        const ratio = Math.min(
          pixelRatio,
          Math.sqrt(maxCanvasPixels / (viewport.width * viewport.height)),
        );

        const canvas = canvasRef.current!;
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        renderTaskRef.current?.cancel();
        const task = pdfPage.render({
          canvas,
          canvasContext: canvas.getContext("2d")!,
          viewport,
          transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : undefined,
        });
        renderTaskRef.current = task;
        await task.promise;

        // Pre-cargar la siguiente página para que el "siguiente" sea inmediato.
        if (page < pdf.numPages) void pdf.getPage(page + 1);
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error("[ProjectDocuments] Error al renderizar:", err);
        }
      } finally {
        if (!cancelled) setIsRendering(false);
      }
    };

    render();
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [pdf, page, stageWidth, zoom, isFullscreen]);

  const goTo = useCallback(
    (next: number) => {
      if (!numPages) return;
      setPage(Math.min(numPages, Math.max(1, next)));
      stageRef.current?.scrollTo({ top: 0, left: 0 });
    },
    [numPages],
  );

  // Pantalla completa
  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (el.requestFullscreen) {
      void el.requestFullscreen();
    } else {
      // iOS Safari no soporta Fullscreen API en elementos: se abre el PDF.
      window.open(doc.url, "_blank", "noopener");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      goTo(page + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goTo(page - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(1);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(numPages);
    }
  };

  const sizeLabel = formatSize(doc.size);
  const ready = status === "ready";

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden rounded-4xl border border-skala-border bg-skala-bg-deep shadow-[0_24px_70px_rgba(0,0,0,0.3)] ${
        isFullscreen ? "flex h-full flex-col rounded-none" : ""
      }`}
      style={{ ["--pdf-accent" as string]: accent }}
    >
      {/* Barra superior */}
      <div className="flex flex-wrap items-center gap-3 border-b border-skala-border bg-white/[0.035] px-4 py-3 md:px-6">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-skala-text-secondary"
          style={{ background: "var(--pdf-accent)" }}
          aria-hidden="true"
        >
          <FiFileText className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="m-0 truncate font-display text-sm font-black text-skala-text md:text-base">
            {doc.title}
          </p>
          <p className="m-0 text-xs text-skala-muted">
            {[numPages ? `${numPages} páginas` : null, sizeLabel, "PDF"]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <ToolbarButton
            label="Alejar"
            onClick={() => setZoomIndex((z) => Math.max(0, z - 1))}
            disabled={!ready || zoomIndex === 0}
          >
            <FiZoomOut className="h-4 w-4" />
          </ToolbarButton>
          <span className="hidden w-12 text-center text-xs font-semibold tabular-nums text-skala-muted sm:inline">
            {Math.round(zoom * 100)}%
          </span>
          <ToolbarButton
            label="Acercar"
            onClick={() =>
              setZoomIndex((z) => Math.min(ZOOM_STEPS.length - 1, z + 1))
            }
            disabled={!ready || zoomIndex === ZOOM_STEPS.length - 1}
          >
            <FiZoomIn className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <FiMinimize2 className="h-4 w-4" />
            ) : (
              <FiMaximize2 className="h-4 w-4" />
            )}
          </ToolbarButton>
          <a
            href={doc.url}
            download={doc.filename || `${doc.title}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Descargar ${doc.title}`}
            title="Descargar"
            className="grid h-9 w-9 place-items-center rounded-xl border border-skala-border bg-white/[0.04] text-skala-text transition hover:border-skala-accent/60 hover:text-skala-accent"
          >
            <FiDownload className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Escenario */}
      <div
        className={`relative ${isFullscreen ? "flex-1" : ""}`}
        tabIndex={0}
        role="region"
        aria-roledescription="visor de documento"
        aria-label={`${doc.title} — ${title}`}
        onKeyDown={onKeyDown}
        onTouchStart={(e) => {
          if (zoom === 1) touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) > 50) goTo(page + (delta < 0 ? 1 : -1));
        }}
      >
        <div
          ref={stageRef}
          className={`overflow-auto px-3 py-5 md:px-14 md:py-8 ${
            isFullscreen ? "h-full" : ""
          }`}
        >
          <div className="flex min-h-[320px] w-max min-w-full items-start justify-center">
            {status !== "error" && (
              <canvas
                ref={canvasRef}
                className={`block rounded-lg bg-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-opacity duration-300 ${
                  ready ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </div>

        {/* Cargando: portada (si hay) + progreso */}
        {(status === "idle" || status === "loading") && (
          <div className="absolute inset-0 grid place-items-center p-6">
            {doc.coverUrl && (
              <img
                src={doc.coverUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-contain opacity-30 blur-[2px]"
                loading="lazy"
              />
            )}
            <div className="relative w-full max-w-60 text-center">
              <p className="m-0 mb-3 text-sm font-semibold text-skala-text">
                Cargando documento…
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${Math.max(progress, 6)}%`, background: "var(--pdf-accent)" }}
                />
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="grid min-h-[320px] place-items-center p-8 text-center">
            <div>
              <p className="m-0 mb-4 text-sm text-skala-muted">
                No pudimos mostrar el documento aquí.
              </p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-skala-accent/40 bg-skala-accent/10 px-5 py-2.5 text-sm font-semibold text-skala-accent transition hover:bg-skala-accent hover:text-skala-text-secondary"
              >
                Abrir PDF
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Flechas laterales */}
        {ready && numPages > 1 && (
          <>
            <NavArrow
              side="left"
              label="Página anterior"
              disabled={page <= 1}
              onClick={() => goTo(page - 1)}
            />
            <NavArrow
              side="right"
              label="Página siguiente"
              disabled={page >= numPages}
              onClick={() => goTo(page + 1)}
            />
          </>
        )}
      </div>

      {/* Barra inferior: paginación */}
      {ready && numPages > 1 && (
        <div className="flex items-center gap-4 border-t border-skala-border bg-white/[0.035] px-4 py-3 md:px-6">
          <p
            className="m-0 shrink-0 text-xs font-semibold tabular-nums text-skala-muted"
            aria-live="polite"
          >
            Página <span className="text-skala-text">{page}</span> de {numPages}
          </p>
          <input
            type="range"
            min={1}
            max={numPages}
            value={page}
            onChange={(e) => goTo(Number(e.target.value))}
            aria-label="Ir a la página"
            className="pdf-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10"
            style={{
              background: `linear-gradient(to right, var(--pdf-accent) ${
                ((page - 1) / Math.max(1, numPages - 1)) * 100
              }%, rgba(255,255,255,0.1) 0)`,
            }}
          />
          {isRendering && (
            <span className="sr-only" role="status">
              Cargando página
            </span>
          )}
        </div>
      )}

      <style>{`
        .pdf-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px; width: 16px; border-radius: 9999px;
          background: #fff; border: 3px solid var(--pdf-accent);
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
        .pdf-range::-moz-range-thumb {
          height: 12px; width: 12px; border-radius: 9999px;
          background: #fff; border: 3px solid var(--pdf-accent);
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-xl border border-skala-border bg-white/[0.04] text-skala-text transition hover:border-skala-accent/60 hover:text-skala-accent disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function NavArrow({
  side,
  label,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? FiChevronLeft : FiChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0 ${
        side === "left" ? "left-2 md:left-3" : "right-2 md:right-3"
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
