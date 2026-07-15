import type { SanityDocument } from "@sanity/client";


export interface CategorySanitySchema extends SanityDocument {
  title: string;
  slug: { current: string };
  order?: number;
  /** Color de acento (hex) gestionado desde Sanity. */
  accent?: string;
}


export interface Category {
  id: string;
  title: string;
  slug: string;
  order?: number;
  /** Color de acento (hex) gestionado desde Sanity. */
  accent?: string;
}


export const mapToCategory = (raw: CategorySanitySchema | null): Category => ({
  id: raw?._id ?? "",
  title: raw?.title ?? "Sin título",
  slug: raw?.slug?.current ?? "",
  order: typeof raw?.order === "number" ? raw.order : undefined,
  accent: raw?.accent,
});

export const mapToCategoryList = (raw: CategorySanitySchema[]): Category[] =>
  raw.map(mapToCategory);
