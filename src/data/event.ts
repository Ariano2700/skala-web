import type { Event } from "../sanity/event/event-mapper";

export type EventCategoryValue = string;

export interface EventCategoryOption {
  label: string;
  value: string;
  accent?: string;
}

/**
 * Categorías que están realmente en uso dentro de la lista de eventos
 * recibida, deduplicadas por slug. Se usa como fallback en EventFilters
 * cuando getAllCategoriesByOrder() (Sanity) no devuelve nada.
 */
export const getUsedCategories = (events: Event[]): EventCategoryOption[] => {
  const map = new Map<string, EventCategoryOption>();
  events.forEach((event) => {
    event.categories.forEach((cat) => {
      if (!cat.slug || map.has(cat.slug)) return;
      map.set(cat.slug, {
        label: cat.title,
        value: cat.slug,
        accent: cat.accent,
      });
    });
  });
  return Array.from(map.values());
};
export const isUpcoming = (event: Event): boolean =>
  new Date(event.endDate ?? event.date).getTime() >= Date.now();

export const isPast = (event: Event): boolean => !isUpcoming(event);

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Lima",
});

const shortDateFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "numeric",
  month: "short",
  timeZone: "America/Lima",
});

/** "12 de julio de 2026" o "12 jul – 14 de julio de 2026" si tiene rango de días. */
export const formatEventDate = (event: Event): string => {
  if (!event.date) return "Fecha por confirmar";
  const start = new Date(event.date);
  if (!event.endDate) return dateFormatter.format(start);

  const end = new Date(event.endDate);
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) return dateFormatter.format(start);

  return `${shortDateFormatter.format(start)} – ${dateFormatter.format(end)}`;
};

export const getEventStatusLabel = (event: Event): "Próximo" | "Realizado" =>
  isUpcoming(event) ? "Próximo" : "Realizado";
