import type { SanityDocument } from "@sanity/client";

export interface EventMediaItem {
  _key?: string;
  assetId?: string;
  url: string;
  alt?: string;
  caption?: string;
  credit?: string;
  kind: "image" | "video";
  posterUrl?: string;
  client?: {
    id: string;
    name: string;
    business?: string;
    logoUrl?: string;
  };
}

export interface EventClientRef {
  id?: string;
  name: string;
  business?: string;
  logoUrl?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  };
}

/** Categoría resuelta desde la referencia `categories[]->` (documento `category`). */
export interface EventCategoryRef {
  id: string;
  title: string;
  slug: string;
  accent?: string;
}

export interface EventSanitySchema extends SanityDocument {
  title: string;
  slug: { current: string };
  heroTagline?: string;
  heroDescription?: string;
  heroImage?: {
    assetId?: string;
    url?: string;
    alt?: string;
  };
  heroVideo?: {
    assetId?: string;
    url?: string;
  };
  date: string;
  endDate?: string;
  location?: {
    venue?: string;
    address?: string;
    geo?: { lat: number; lng: number };
  };
  /** Resuelto vía GROQ: categories[]->{ _id, title, "slug": slug.current, accent } */
  categories?: Array<{
    _id?: string;
    title?: string;
    slug?: string;
    accent?: string;
  }>;
  featured?: boolean;
  order?: number;
  published?: boolean;
  gallery?: Array<{
    _key?: string;
    _type?: string;
    assetId?: string;
    url?: string;
    alt?: string;
    caption?: string;
    credit?: string;
    poster?: { url?: string };
    client?: {
      _id?: string;
      name?: string;
      business?: string;
      logo?: { url?: string };
    };
  }>;
  clients?: Array<{
    _id?: string;
    name?: string;
    business?: string;
    logo?: { url?: string };
    social?: EventClientRef["social"];
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { url?: string };
  };
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  hero: {
    tagline?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    videoUrl?: string;
  };
  date: string;
  endDate?: string;
  location?: {
    venue?: string;
    address?: string;
    geo?: { lat: number; lng: number };
  };
  categories: EventCategoryRef[];
  featured: boolean;
  order?: number;
  published: boolean;
  gallery: EventMediaItem[];
  clients: EventClientRef[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
  // Derivados, igual que en tu PortfolioHero.astro
  stats: {
    totalImages: number;
    totalVideos: number;
    totalDisciplines: number;
  };
}

export const mapToEvent = (raw: EventSanitySchema | null): Event => {
  const galleryItems: EventMediaItem[] = Array.isArray(raw?.gallery)
    ? raw!.gallery!.map((item) => ({
        _key: item?._key,
        assetId: item?.assetId,
        url: item?.url || "",
        alt: item?.alt || "",
        caption: item?.caption || "",
        credit: item?.credit || "",
        kind: item?._type === "videoItem" ? "video" : "image",
        posterUrl: item?.poster?.url,
        client: item?.client
          ? {
              id: item.client._id ?? "",
              name: item.client.name ?? "",
              business: item.client.business,
              logoUrl: item.client.logo?.url,
            }
          : undefined,
      }))
    : [];

  const clients: EventClientRef[] = Array.isArray(raw?.clients)
    ? raw!.clients!.map((c) => ({
        id: c?._id,
        name: c?.name ?? "Sin nombre",
        business: c?.business,
        logoUrl: c?.logo?.url,
        social: c?.social,
      }))
    : [];

  // categories ahora llega resuelto desde Sanity (categories[]->{...}).
  // Se descartan referencias "rotas" (documento borrado) que llegarían sin slug.
  const categories: EventCategoryRef[] = Array.isArray(raw?.categories)
    ? raw!.categories!
        .filter((c) => !!c?.slug)
        .map((c) => ({
          id: c._id ?? "",
          title: c.title ?? c.slug ?? "Sin categoría",
          slug: c.slug ?? "",
          accent: c.accent,
        }))
    : [];

  return {
    id: raw?._id ?? "",
    title: raw?.title ?? "Sin título",
    slug: raw?.slug?.current ?? "",
    hero: {
      tagline: raw?.heroTagline,
      description: raw?.heroDescription,
      imageUrl: raw?.heroImage?.url,
      imageAlt: raw?.heroImage?.alt,
      videoUrl: raw?.heroVideo?.url,
    },
    date: raw?.date ?? "",
    endDate: raw?.endDate,
    location: raw?.location,
    categories,
    featured: Boolean(raw?.featured),
    order: raw?.order,
    published: Boolean(raw?.published),
    gallery: galleryItems,
    clients,
    seo: raw?.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
          ogImageUrl: raw.seo.ogImage?.url,
        }
      : undefined,
    stats: {
      totalImages: galleryItems.filter((m) => m.kind === "image").length,
      totalVideos: galleryItems.filter((m) => m.kind === "video").length,
      totalDisciplines: categories.length,
    },
  };
};

export const mapToEventList = (raw: EventSanitySchema[]): Event[] =>
  raw.map(mapToEvent);