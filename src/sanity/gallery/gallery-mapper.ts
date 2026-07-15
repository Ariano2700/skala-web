import type { SanityDocument } from "@sanity/client";

export interface GalleryMediaItem {
  _key?: string;
  assetId?: string;
  url: string;
  alt?: string;
  caption?: string;
  kind: "image" | "video";
}

export interface GallerySanitySchema extends SanityDocument {
  name: string;
  slug: { current: string };
  accessCode?: string;
  coverImage?: {
    assetId?: string;
    url?: string;
    alt?: string;
  };
  published?: boolean;
  gallery?: Array<{
    _key?: string;
    _type?: string;
    assetId?: string;
    url?: string;
    alt?: string;
    caption?: string;
  }>;
}

export interface Gallery {
  id: string;
  name: string;
  slug: string;
  accessCode?: string;
  coverImage?: {
    assetId?: string;
    url: string;
    alt?: string;
  };
  published: boolean;
  gallery: GalleryMediaItem[];
}

export const mapToGallery = (raw: GallerySanitySchema | null): Gallery => {
  const isVideoUrl = (url?: string): boolean => {
    if (!url) return false;
    if (/\.(mp4|webm|ogg|mov|m4v|avi)$/i.test(url)) return true;
    return /\/files\//i.test(url) || /cdn\.sanity\.io\/.*\/files\//i.test(url);
  };

  const galleryItems: GalleryMediaItem[] = Array.isArray(raw?.gallery)
    ? raw!.gallery!.map((item) => {
        const isVideo =
          item?._type === "file" ||
          item?.assetId?.startsWith("file-") ||
          isVideoUrl(item?.url);
        return {
          _key: item?._key,
          assetId: item?.assetId,
          url: item?.url || "",
          alt: item?.alt || "",
          caption: item?.caption || "",
          kind: isVideo ? "video" : "image",
        };
      })
    : [];

  return {
    id: raw?._id ?? "",
    name: raw?.name ?? "Sin título",
    slug: raw?.slug?.current ?? "",
    accessCode: raw?.accessCode || undefined,
    coverImage: raw?.coverImage
      ? {
          assetId: raw.coverImage.assetId,
          url: raw.coverImage.url || "",
          alt: raw.coverImage.alt || "",
        }
      : undefined,
    published: Boolean(raw?.published),
    gallery: galleryItems,
  };
};

export const mapToGalleryList = (raw: GallerySanitySchema[]): Gallery[] =>
  raw.map(mapToGallery);
