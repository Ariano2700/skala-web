import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useInfiniteGallery } from "../../hooks/useInfiniteGallery";
import type { EventMediaItem } from "../../sanity/event/event-mapper";
import { sanityImageUrl, sanitySrcSet } from "../../lib/sanity-image";

interface Props {
  /** Primer lote, ya recortado y renderizado desde el .astro que lo hospeda. */
  gallery: EventMediaItem[];
  /** Total real de items en la galería completa del evento. */
  total: number;
  eventSlug: string;
  title: string;
}

function handleDownload(item: EventMediaItem, index: number) {
  const link = document.createElement("a");
  link.href = item.url;
  link.download = item.alt || `imagen-${index + 1}`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function EventGallery({
  gallery,
  total,
  eventSlug,
  title,
}: Props) {
  const { items, isLoading, hasMore, sentinelRef } = useInfiniteGallery({
    eventSlug,
    pageSize: gallery.length || 12,
    initialItems: gallery,
    initialTotal: total,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section
      id="galeria"
      className="relative z-10 mx-auto max-w-360 px-5 py-16 md:px-12"
      aria-labelledby="event-gallery-title"
    >
      <h2
        id="event-gallery-title"
        className="mb-8 font-display text-3xl font-black tracking-[-0.04em] text-skala-text md:text-4xl"
      >
        Galería
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item._key || `${item.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver ${item.kind === "video" ? "video" : "imagen"} ${index + 1} de ${title}`}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-skala-border bg-white/3"
          >
            <img
              src={sanityImageUrl(
                item.kind === "video" ? item.posterUrl || item.url : item.url,
                {
                  width: 500,
                },
              )}
              srcSet={sanitySrcSet(
                item.kind === "video" ? item.posterUrl || item.url : item.url,
                [300, 500, 800],
              )}
              sizes="(max-width: 768px) 50vw, 25vw"
              alt={item.alt || title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {item.kind === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-[#04142e]/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg text-[#04142e]">
                  ▶
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {hasMore && <div ref={sentinelRef} className="h-px w-full" />}

      {isLoading && (
        <p className="py-4 text-center text-sm font-semibold text-skala-muted">
          Cargando más fotos...
        </p>
      )}

      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04142e]/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Cerrar galería"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#04142e] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-skala-accent/60"
            >
              <IoMdClose />
            </button>

            {activeItem.kind === "image" && (
              <button
                type="button"
                onClick={() => handleDownload(activeItem, activeIndex)}
                aria-label="Descargar imagen"
                className="absolute left-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#04142e] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-skala-accent/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            )}

            {activeItem.kind === "video" ? (
              <video
                src={activeItem.url}
                controls
                autoPlay
                className="max-h-[90vh] max-w-[92vw] rounded-2xl"
              />
            ) : (
              <img
                src={sanityImageUrl(activeItem.url, { width: 800 })}
                srcSet={sanitySrcSet(activeItem.url, [300, 500, 800])}
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={activeItem.alt || ""}
                className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
