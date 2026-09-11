import { useCallback, useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import {
  countMedia,
  getCoverMedia,
  getPortfolioAccentStyle,
  getPortfolioGridClass,
  type PortfolioProjectItem,
} from "../../data/portafolio";
import { useInfinitePortfolio } from "../../hooks/useInfinitePortfolio";

interface Props {
  initialItems: PortfolioProjectItem[];
  initialTotal: number;
  initialCategory: string;
  pageSize: number;
}

const pluralize = (amount: number) =>
  `${amount} proyecto${amount !== 1 ? "s" : ""}`;

// Un solo IntersectionObserver compartido por TODAS las tarjetas (no uno
// por tarjeta): se crea la primera vez que hace falta y se reusa. Cada
// tarjeta nueva (primera tanda, scroll infinito, cambio de filtro) se suma
// con .observe() apenas monta, vía el ref de <Card>; en cuanto entra en
// pantalla se le pone .is-visible y se deja de observar (reveal de una
// sola vez, mismo criterio que RevealScript.astro).
let cardRevealObserver: IntersectionObserver | null | undefined;

function getCardRevealObserver() {
  if (cardRevealObserver !== undefined) return cardRevealObserver;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  cardRevealObserver = reduceMotion
    ? null
    : new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );

  return cardRevealObserver;
}

// Tarjeta de proyecto: mismo diseño y clases que PortfolioCard.astro. Se
// reimplementa acá (en vez de reusar el .astro) porque esta grilla se
// recompone en el cliente a medida que se cargan más páginas — el mismo
// patrón ya usado en EventGallery.tsx para la galería de un evento.
function Card({
  project,
  index,
}: {
  project: PortfolioProjectItem;
  index: number;
}) {
  const cover = getCoverMedia(project);
  const mediaCount = countMedia(project);
  const hasMultiple = project.media.length > 1;
  const accentStyle = getPortfolioAccentStyle(project);
  const cardStyle = {
    "--card-accent": project.accent || "var(--color-skala-accent)",
    // Stagger acotado a la fila visible (12 cols): la tanda que entra en
    // pantalla junta (misma página del scroll infinito) cae en cascada en
    // vez de aparecer toda de golpe.
    "--reveal-delay": `${(index % 12) * 45}ms`,
  } as React.CSSProperties;

  const cardRef = useCallback((node: HTMLAnchorElement | null) => {
    if (!node) return;
    const observer = getCardRevealObserver();
    if (observer) observer.observe(node);
    else node.classList.add("is-visible"); // prefers-reduced-motion
  }, []);

  return (
    <a
      ref={cardRef}
      href={`/proyecto/${project.id}/`}
      className={`portfolio-card portfolio-card-reveal group relative isolate flex flex-col overflow-hidden rounded-4xl border border-skala-border bg-[#0c1730] text-left transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skala-accent/70 ${getPortfolioGridClass(project)}`}
      style={cardStyle}
      aria-label={`Ver proyecto: ${project.title} (${project.categoryLabel})`}
    >
      <div className="relative aspect-square overflow-hidden bg-skala-surface">
        {cover.type === "image" ? (
          <img
            src={cover.src}
            alt={cover.alt ?? project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <video
            src={cover.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,22,0.05)_0%,rgba(6,10,22,0.42)_52%,rgba(6,10,22,0.92)_100%)] transition-opacity duration-500 group-hover:opacity-90" />

        <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[220%] w-[70%] rotate-[-24deg] bg-linear-to-r from-transparent via-white/12 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[shineSweep_1.15s_ease]" />

        {/* El marco de acento en hover vive dentro del contenedor de imagen
            (arriba de la tarjeta), no de la tarjeta completa: solo sus
            esquinas superiores coinciden con el borde real de la tarjeta
            (rounded-4xl en el <a>); la esquina inferior es una división
            interna con el panel de texto, así que va recta — redondearla
            ahí se veía como una esquina de más, suelta a mitad de tarjeta. */}
        <div className="pointer-events-none absolute inset-0 rounded-t-4xl opacity-0 shadow-[inset_0_0_0_1.5px_var(--card-accent)] transition-opacity duration-500 group-hover:opacity-70" />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.16em] text-skala-text">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={accentStyle} />
          {project.categoryLabel}
        </span>

        {hasMultiple && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-skala-muted">
            {mediaCount.images > 0 && <span>{mediaCount.images} img</span>}
            {mediaCount.images > 0 && mediaCount.videos > 0 && <span>·</span>}
            {mediaCount.videos > 0 && <span>{mediaCount.videos} vid</span>}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
          <h3 className="m-0 max-w-[20ch] font-display text-2xl font-black leading-tight tracking-[-0.04em] text-skala-text transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:text-3xl">
            {project.client}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/8 p-4 sm:p-5">
        <span className="min-w-0 truncate text-xs text-skala-muted">
          {project.title}
        </span>
        <span
          className="inline-flex shrink-0 items-center gap-1.5 text-[0.7rem] font-black uppercase tracking-[0.14em]"
          style={{ color: "var(--card-accent)" }}
        >
          {project.overlay}
          <FiArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}

export default function PortfolioGridClient({
  initialItems,
  initialTotal,
  initialCategory,
  pageSize,
}: Props) {
  const [category, setCategory] = useState(initialCategory);

  const { items, total, isLoading, hasMore, sentinelRef } =
    useInfinitePortfolio({
      category,
      pageSize,
      initialItems,
      initialTotal,
    });

  // Actualiza el contador "N proyectos" que vive en PortfolioFilters.astro
  // (fuera del árbol de React) cada vez que cambia el total conocido.
  useEffect(() => {
    const countEl = document.querySelector<HTMLElement>("[data-filter-count]");
    if (countEl) countEl.textContent = pluralize(total);
  }, [total]);

  // Los botones de filtro los pinta PortfolioFilters.astro (son <a> reales,
  // para que funcionen sin JS). Acá solo interceptamos el click para no
  // recargar la página: actualizamos el estado, la URL y el look "activo".
  const onFilterClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>(".portfolio-filter");
    if (!link) return;
    e.preventDefault();

    const filter = link.dataset.filter ?? "all";

    document
      .querySelectorAll<HTMLAnchorElement>(".portfolio-filter")
      .forEach((item) => {
        const isActive = item === link;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", filter);
    window.history.replaceState({}, "", url);

    setCategory(filter);
  }, []);

  useEffect(() => {
    document.addEventListener("click", onFilterClick);
    return () => document.removeEventListener("click", onFilterClick);
  }, [onFilterClick]);

  return (
    <>
      <div className="portfolio-grid grid grid-cols-12 gap-4">
        {items.map((project, index) => (
          <Card key={project.id} project={project} index={index} />
        ))}
      </div>

      {!isLoading && items.length === 0 && (
        <div className="rounded-3xl border border-skala-border bg-white/[0.035] p-12 text-center">
          <BsSearch className="mx-auto mb-6 h-12 w-12 text-skala-accent" />
          <h3 className="mb-3 font-display text-2xl font-black tracking-[-0.04em] text-skala-text">
            No hay proyectos en esta categoría todavía.
          </h3>
          <p className="m-0 text-sm leading-7 text-skala-muted">
            Podemos sumar nuevos casos cuando estén listos para publicar.
          </p>
        </div>
      )}

      {hasMore && <div ref={sentinelRef} className="h-px w-full" />}

      {isLoading && (
        <p className="py-6 text-center text-sm font-semibold text-skala-muted">
          Cargando más proyectos...
        </p>
      )}
    </>
  );
}
