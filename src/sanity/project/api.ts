import { sanityClient } from "sanity:client";
import {
  type ProjectSanitySchema,
  mapToProject,
  mapToProjectList,
} from "./project-mapper";

const PROJECT_BASE_QUERY = `{
  _id,
  title,
  slug,
  client,
  "categories": categories[]->{
    "id": _id,
    title,
    "slug": slug.current
  },
  "mainImage": {
    "url": mainImage.asset->url,
    "alt": mainImage.alt
  },
  description,
  challenge,
  solution,
  results[]{
    text
  },
  tools,
  duration,
  year,
  featured,
  "gallery": gallery[]{
    _type,
    "url": asset->url,
    "alt": alt,
    "caption": caption
  },
  externalUrl
}`;

type PaginatedProjects = {
  data: ReturnType<typeof mapToProjectList>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const BASE_PROJECT_FILTER = `_type == "project"`;
const ORDER_BY_TITLE = `order(title asc)`;

export async function getProjectsCount(search?: string): Promise<number> {
  const query = search
    ? `count(*[${BASE_PROJECT_FILTER} && title match $search])`
    : `count(*[${BASE_PROJECT_FILTER}])`;
  const params = search ? { search: `*${search}*` } : {};
  try {
    return await sanityClient.fetch<number>(query, params);
  } catch (error) {
    console.error("Error fetching project count:", error);
    return 0;
  }
}

export async function getProjectsWithPagination(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedProjects> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_PROJECT_FILTER}] | ${ORDER_BY_TITLE} [$offset...$end] ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema[]>(query, {
      offset,
      end: offset + pageSize,
    });
    const total = await getProjectsCount();
    return {
      data: mapToProjectList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function searchProjects(
  search: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedProjects> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_PROJECT_FILTER} && title match $search] | ${ORDER_BY_TITLE} [$offset...$end] ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema[]>(query, {
      search: `*${search}*`,
      offset,
      end: offset + pageSize,
    });
    const total = await getProjectsCount(search);
    return {
      data: mapToProjectList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error searching projects:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function getAllProjects() {
  const query = `*[${BASE_PROJECT_FILTER}] | ${ORDER_BY_TITLE} ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema[]>(query);
    return mapToProjectList(result);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(limit: number = 6) {
  const query = `*[${BASE_PROJECT_FILTER} && featured == true] | order(year desc) [0...$limit] ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema[]>(query, {
      limit,
    });
    return mapToProjectList(result);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  const query = `*[${BASE_PROJECT_FILTER} && slug.current == $slug][0] ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema | null>(query, {
      slug,
    });
    return result ? mapToProject(result) : null;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null;
  }
}

export async function getProjectById(id: string) {
  const query = `*[${BASE_PROJECT_FILTER} && _id == $id][0] ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema | null>(query, {
      id,
    });
    return result ? mapToProject(result) : null;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return null;
  }
}

/**
 * Lista los proyectos que pertenecen a una categoría (por su slug).
 * Si `slug` es "all" o se omite, devuelve todos los proyectos.
 */
export async function getProjectsByCategory(slug?: string) {
  const filter =
    !slug || slug === "all"
      ? BASE_PROJECT_FILTER
      : `${BASE_PROJECT_FILTER} && $slug in categories[]->slug.current`;
  const query = `*[${filter}] | ${ORDER_BY_TITLE} ${PROJECT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ProjectSanitySchema[]>(query, {
      slug,
    });
    return mapToProjectList(result);
  } catch (error) {
    console.error(`Error fetching projects for category ${slug}:`, error);
    return [];
  }
}
