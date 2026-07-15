import { sanityClient } from "sanity:client";
import {
  type CategorySanitySchema,
  mapToCategory,
  mapToCategoryList,
} from "./category-mapper";

const CATEGORY_BASE_QUERY = `{
  _id,
  title,
  slug,
  order,
  accent
}`;

type PaginatedCategories = {
  data: ReturnType<typeof mapToCategoryList>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const BASE_CATEGORY_FILTER = `_type == "category"`;
const ORDER_BY_TITLE = `order(title asc)`;
const ORDER_BY_ORDER = `order(order asc)`;
// Obtiene todas las categorías, primero las que tienen 'order' definido (asc), luego el resto por título
export async function getAllCategoriesByOrder() {
  const query = `*[${BASE_CATEGORY_FILTER} && defined(order)] | order(order asc) ${CATEGORY_BASE_QUERY}`;
  const queryRest = `*[${BASE_CATEGORY_FILTER} && !defined(order)] | order(title asc) ${CATEGORY_BASE_QUERY}`;
  try {
    const [ordered, rest] = await Promise.all([
      sanityClient.fetch<CategorySanitySchema[]>(query),
      sanityClient.fetch<CategorySanitySchema[]>(queryRest),
    ]);
    return mapToCategoryList([...ordered, ...rest]);
  } catch (error) {
    console.error("Error fetching all categories by order:", error);
    return [];
  }
}

export async function getCategoriesCount(search?: string): Promise<number> {
  const query = search
    ? `count(*[${BASE_CATEGORY_FILTER} && title match $search])`
    : `count(*[${BASE_CATEGORY_FILTER}])`;
  const params = search ? { search: `*${search}*` } : {};
  try {
    return await sanityClient.fetch<number>(query, params);
  } catch (error) {
    console.error("Error fetching category count:", error);
    return 0;
  }
}

export async function getCategoriesWithPagination(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedCategories> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_CATEGORY_FILTER}] | ${ORDER_BY_TITLE} [$offset...$end] ${CATEGORY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<CategorySanitySchema[]>(query, {
      offset,
      end: offset + pageSize,
    });
    const total = await getCategoriesCount();
    return {
      data: mapToCategoryList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated categories:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function searchCategories(
  search: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedCategories> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_CATEGORY_FILTER} && title match $search] | ${ORDER_BY_TITLE} [$offset...$end] ${CATEGORY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<CategorySanitySchema[]>(query, {
      search: `*${search}*`,
      offset,
      end: offset + pageSize,
    });
    const total = await getCategoriesCount(search);
    return {
      data: mapToCategoryList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error searching categories:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function getAllCategories() {
  const query = `*[${BASE_CATEGORY_FILTER}] | ${ORDER_BY_TITLE} ${CATEGORY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<CategorySanitySchema[]>(query);
    return mapToCategoryList(result);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  const query = `*[${BASE_CATEGORY_FILTER} && slug.current == $slug][0] ${CATEGORY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<CategorySanitySchema | null>(
      query,
      {
        slug,
      },
    );
    return result ? mapToCategory(result) : null;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}

export async function getCategoryById(id: string) {
  const query = `*[${BASE_CATEGORY_FILTER} && _id == $id][0] ${CATEGORY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<CategorySanitySchema | null>(
      query,
      {
        id,
      },
    );
    return result ? mapToCategory(result) : null;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    return null;
  }
}

export async function getCategoriesByOrder() {
  // Conservamos el nombre por compatibilidad, pero ordenamos por title (el schema no tiene campo order).
  const query = `*[${BASE_CATEGORY_FILTER}] | ${ORDER_BY_TITLE} ${CATEGORY_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<CategorySanitySchema[]>(query);
    return mapToCategoryList(result);
  } catch (error) {
    console.error("Error fetching categories by order:", error);
    return [];
  }
}