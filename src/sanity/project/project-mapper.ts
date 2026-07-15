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

export interface ProjectSanitySchema extends SanityDocument {
  title: string;
  slug: { current: string };
  client?: string;
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
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client?: string;
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
}

export const mapToProject = (raw: ProjectSanitySchema | null): Project => ({
  id: raw?._id ?? "",
  title: raw?.title ?? "Sin título",
  slug: raw?.slug?.current ?? "",
  client: raw?.client,
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
});

export const mapToProjectList = (raw: ProjectSanitySchema[]): Project[] =>
  raw.map(mapToProject);
