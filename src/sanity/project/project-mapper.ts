import type { SanityDocument } from "@sanity/client";
import type { Category } from "../category/category-mapper";

export interface ProjectImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface ProjectVideo {
  url: string;
  caption?: string;
}

export type ProjectMedia = ProjectImage | ProjectVideo;

export interface ProjectResult {
  text: string;
}

/** Un par antes/después dentro de `beforeAfterGallery` (schema del Studio). */
export interface ProjectBeforeAfterPair {
  title?: string;
  caption?: string;
  before?: ProjectImage;
  after?: ProjectImage;
}

export interface ProjectSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { url?: string };
}

/** Referencia al cliente registrado (schema `client`), cuando el proyecto
 * está vinculado a uno en vez de (o además de) tener solo el nombre en
 * texto libre. Permite enlazar a `/clientes/[slug]`. */
export interface ProjectClientRef {
  id: string;
  name: string;
  slug?: string;
  business?: string;
  logoUrl?: string;
}

export interface ProjectSanitySchema extends SanityDocument {
  _updatedAt: string;
  title: string;
  slug: { current: string };
  client?: string;
  clientRef?: {
    _id?: string;
    name?: string;
    slug?: string;
    business?: string;
    logoUrl?: string;
  };
  categories?: Category[];
  mainImage?: ProjectImage;
  description?: string;
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  tools?: string[];
  duration?: string;
  year?: number;
  featured?: boolean;
  gallery?: ProjectMedia[];
  externalUrl?: string;
  beforeAfterGallery?: ProjectBeforeAfterPair[];
  seo?: ProjectSeo;
}

export interface Project {
  id: string;
  /** ISO datetime de la última modificación del documento en Sanity (`_updatedAt`). Usado para el `lastmod` del sitemap. */
  updatedAt?: string;
  title: string;
  slug: string;
  client?: string;
  clientRef?: ProjectClientRef;
  categories: Category[];
  mainImage?: ProjectImage;
  description: string;
  challenge: string;
  solution: string;
  results: ProjectResult[];
  tools: string[];
  duration?: string;
  year?: number;
  featured: boolean;
  gallery: ProjectMedia[];
  externalUrl?: string;
  beforeAfterGallery: ProjectBeforeAfterPair[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
}

export const mapToProject = (raw: ProjectSanitySchema | null): Project => ({
  id: raw?._id ?? "",
  updatedAt: raw?._updatedAt,
  title: raw?.title ?? "Sin título",
  slug: raw?.slug?.current ?? "",
  client: raw?.client,
  clientRef: raw?.clientRef?._id
    ? {
        id: raw.clientRef._id,
        name: raw.clientRef.name ?? raw?.client ?? "Sin nombre",
        slug: raw.clientRef.slug,
        business: raw.clientRef.business,
        logoUrl: raw.clientRef.logoUrl,
      }
    : undefined,
  categories: raw?.categories ?? [],
  mainImage: raw?.mainImage,
  description: raw?.description ?? "",
  challenge: raw?.challenge ?? "",
  solution: raw?.solution ?? "",
  results: raw?.results ?? [],
  tools: raw?.tools ?? [],
  duration: raw?.duration,
  year: raw?.year,
  featured: raw?.featured ?? false,
  gallery: raw?.gallery ?? [],
  externalUrl: raw?.externalUrl,
  beforeAfterGallery: raw?.beforeAfterGallery ?? [],
  seo: raw?.seo
    ? {
        metaTitle: raw.seo.metaTitle,
        metaDescription: raw.seo.metaDescription,
        ogImageUrl: raw.seo.ogImage?.url,
      }
    : undefined,
});

export const mapToProjectList = (raw: ProjectSanitySchema[]): Project[] =>
  raw.map(mapToProject);
