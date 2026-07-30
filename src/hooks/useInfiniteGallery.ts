import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { EventMediaItem } from "../sanity/event/event-mapper";

type InfiniteGalleryResponse = {
  items: EventMediaItem[];
  total: number;
  hasMore: boolean;
};

type UseInfiniteGalleryOptions = {
  eventSlug: string;
  pageSize?: number;
  enabled?: boolean;
  /** Primer lote, ya renderizado server-side por Astro (evita el doble fetch inicial). */
  initialItems?: EventMediaItem[];
  initialTotal?: number;
};

function getItemIdentity(item: EventMediaItem, index: number) {
  return item._key || `${item.url}|${index}`;
}

export function useInfiniteGallery({
  eventSlug,
  pageSize = 12,
  enabled = true,
  initialItems = [],
  initialTotal,
}: UseInfiniteGalleryOptions) {
  const [items, setItems] = useState<EventMediaItem[]>(initialItems);
  const [offset, setOffset] = useState(initialItems.length);
  const [hasMore, setHasMore] = useState(
    initialTotal === undefined ? true : initialItems.length < initialTotal,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const canLoadMore = useMemo(
    () => enabled && hasMore && !isLoading && !!eventSlug,
    [enabled, hasMore, isLoading, eventSlug],
  );

  const loadMore = useCallback(async () => {
    if (!canLoadMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(pageSize),
      });

      const response = await fetch(
        `/api/events/${eventSlug}/gallery?${params.toString()}`,
      );
      if (!response.ok) throw new Error("No se pudo cargar más fotos");

      const payload = (await response.json()) as InfiniteGalleryResponse;

      setItems((prev) => {
        const existing = new Set(
          prev.map((item, i) => getItemIdentity(item, i)),
        );
        const nextUnique = payload.items.filter(
          (item, i) => !existing.has(getItemIdentity(item, offset + i)),
        );
        return [...prev, ...nextUnique];
      });

      setOffset((prev) => prev + payload.items.length);
      setHasMore(payload.hasMore && payload.items.length > 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [canLoadMore, offset, pageSize, eventSlug]);

  // Dispara loadMore cuando el sentinel entra en viewport.
  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: "0px 0px 300px 0px", threshold: 0.01 },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enabled, loadMore]);

  return { items, isLoading, error, hasMore, loadMore, sentinelRef };
}