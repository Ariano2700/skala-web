import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioProjectItem } from "../data/portafolio";

type PortfolioPageResponse = {
  items: PortfolioProjectItem[];
  total: number;
  hasMore: boolean;
};

interface UseInfinitePortfolioOptions {
  /** Slug de categoría activo, o "all". Cambiar esto reinicia el listado. */
  category: string;
  pageSize?: number;
  /** Primer lote, ya renderizado server-side por Astro (evita el doble fetch inicial). */
  initialItems?: PortfolioProjectItem[];
  initialTotal?: number;
}

// Mismo patrón que useInfiniteGallery.ts (galería de eventos), aplicado a la
// grilla del portafolio: el primer lote llega ya resuelto desde el server
// (initialItems/initialTotal) y el resto se pide a /api/portfolio/projects
// a medida que el sentinel entra en viewport. Cambiar `category` reinicia
// offset/items y vuelve a pedir desde cero (así los filtros no quedan
// atados a lo que ya estaba en el DOM).
export function useInfinitePortfolio({
  category,
  pageSize = 9,
  initialItems = [],
  initialTotal,
}: UseInfinitePortfolioOptions) {
  const [items, setItems] = useState<PortfolioProjectItem[]>(initialItems);
  const [total, setTotal] = useState(initialTotal ?? initialItems.length);
  const [offset, setOffset] = useState(initialItems.length);
  const [hasMore, setHasMore] = useState(
    initialTotal === undefined ? true : initialItems.length < initialTotal,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const categoryRef = useRef(category);

  const fetchPage = useCallback(
    async (nextOffset: number, replace: boolean) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          category,
          offset: String(nextOffset),
          limit: String(pageSize),
        });
        const response = await fetch(
          `/api/portfolio/projects?${params.toString()}`,
        );
        if (!response.ok) throw new Error("No se pudieron cargar los proyectos");

        const payload = (await response.json()) as PortfolioPageResponse;

        setItems((prev) =>
          replace ? payload.items : [...prev, ...payload.items],
        );
        setOffset(nextOffset + payload.items.length);
        setTotal(payload.total);
        setHasMore(payload.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [category, pageSize],
  );

  // La categoría activa cambió (click en un filtro): descarta lo cargado y
  // vuelve a pedir la página 1 de la nueva categoría.
  useEffect(() => {
    if (categoryRef.current === category) return;
    categoryRef.current = category;
    setItems([]);
    setOffset(0);
    setHasMore(true);
    void fetchPage(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    void fetchPage(offset, false);
  }, [fetchPage, offset, isLoading, hasMore]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "0px 0px 400px 0px", threshold: 0.01 },
    );
    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  return { items, total, isLoading, error, hasMore, sentinelRef };
}
