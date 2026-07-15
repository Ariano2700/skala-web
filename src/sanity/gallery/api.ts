import { sanityClient } from "sanity:client";
import {
  type GallerySanitySchema,
  mapToGallery,
  mapToGalleryList,
} from "./gallery-mapper";

const GALLERY_BASE_QUERY = `{
  _id,
  name,
  slug,
  accessCode,
  published,
  "coverImage": coverImage{
    "assetId": asset->_id,
    "url": asset->url,
    alt
  },
  "gallery": gallery[]{
    _key,
    _type,
    "assetId": asset->_id,
    "url": asset->url,
    alt,
    caption
  }
}`;

const BASE_GALLERY_FILTER = `_type == "gallery"`;
const ORDER_BY_NAME = `order(name asc)`;

type PaginatedGalleries = {
  data: ReturnType<typeof mapToGalleryList>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getGalleriesCount(search?: string): Promise<number> {
  const query = search
    ? `count(*[${BASE_GALLERY_FILTER} && name match $search])`
    : `count(*[${BASE_GALLERY_FILTER}])`;
  const params = search ? { search: `*${search}*` } : {};
  try {
    return await sanityClient.fetch<number>(query, params);
  } catch (error) {
    console.error("Error fetching gallery count:", error);
    return 0;
  }
}

export async function getGalleriesWithPagination(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedGalleries> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_GALLERY_FILTER}] | ${ORDER_BY_NAME} [$offset...$end] ${GALLERY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<GallerySanitySchema[]>(query, {
      offset,
      end: offset + pageSize,
    });
    const total = await getGalleriesCount();
    return {
      data: mapToGalleryList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated galleries:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function searchGalleries(
  search: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedGalleries> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_GALLERY_FILTER} && name match $search] | ${ORDER_BY_NAME} [$offset...$end] ${GALLERY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<GallerySanitySchema[]>(query, {
      search: `*${search}*`,
      offset,
      end: offset + pageSize,
    });
    const total = await getGalleriesCount(search);
    return {
      data: mapToGalleryList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error searching galleries:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function getAllGalleries() {
  const query = `*[${BASE_GALLERY_FILTER}] | ${ORDER_BY_NAME} ${GALLERY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<GallerySanitySchema[]>(query);
    return mapToGalleryList(result);
  } catch (error) {
    console.error("Error fetching all galleries:", error);
    return [];
  }
}

export async function getGalleryBySlug(slug: string) {
  const query = `*[${BASE_GALLERY_FILTER} && slug.current == $slug][0] ${GALLERY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<GallerySanitySchema | null>(
      query,
      {
        slug,
      },
    );
    return result ? mapToGallery(result) : null;
  } catch (error) {
    console.error(`Error fetching gallery with slug ${slug}:`, error);
    return null;
  }
}

export async function getGalleryById(id: string) {
  const query = `*[${BASE_GALLERY_FILTER} && _id == $id][0] ${GALLERY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<GallerySanitySchema | null>(
      query,
      {
        id,
      },
    );
    return result ? mapToGallery(result) : null;
  } catch (error) {
    console.error(`Error fetching gallery with id ${id}:`, error);
    return null;
  }
}

/**
 * Lista las galerías públicas: las que están publicadas Y no tienen código
 * de acceso. Se usan en la página /galeria-desfile-canino.
 */
export async function getPublicGalleries() {
  const query = `*[${BASE_GALLERY_FILTER} && published == true && !defined(accessCode)] | ${ORDER_BY_NAME} ${GALLERY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<GallerySanitySchema[]>(query);
    return mapToGalleryList(result);
  } catch (error) {
    console.error("Error fetching public galleries:", error);
    return [];
  }
}