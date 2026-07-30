import { sanityClient } from "sanity:client";
import {
  mapGalleryItem,
  mapToEvent,
  mapToEventList,
  type EventMediaItem,
  type EventSanitySchema,
  type RawGalleryItem,
} from "./event-mapper";

const event_BASE_QUERY = `{
  _id,
  title,
  slug,
  heroTagline,
  heroDescription,
  "heroImage": heroImage{
    "assetId": asset->_id,
    "url": asset->url,
    alt
  },
  "heroVideo": heroVideo.asset->{
    "assetId": _id,
    "url": url
  },
  date,
  endDate,
  location,
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current,
    accent
  },
  featured,
  order,
  published,
"gallery": gallery[]{
  _key,
  _type,
  "assetId": asset->_id,
  "url": asset->url,
  alt,
  caption,
  credit,
  "poster": poster{ "url": asset->url },
  "client": client->{
    _id,
    name,
    business,
    "logo": logo{ "url": asset->url }
  }
},
  "clients": clients[]->{
    _id,
    name,
    business,
    "logo": logo{ "url": asset->url },
    social
  },
  "seo": seo{
    metaTitle,
    metaDescription,
    "ogImage": ogImage{ "url": asset->url }
  }
}`;

const BASE_event_FILTER = `_type == "event"`;
const ORDER_BY_DATE = `order(date desc)`;

type Paginatedevents = {
  data: ReturnType<typeof mapToEventList>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getEventsCount(search?: string): Promise<number> {
  const query = search
    ? `count(*[${BASE_event_FILTER} && title match $search])`
    : `count(*[${BASE_event_FILTER}])`;
  const params = search ? { search: `*${search}*` } : {};
  try {
    return await sanityClient.fetch<number>(query, params);
  } catch (error) {
    console.error("Error fetching event count:", error);
    return 0;
  }
}

export async function getEventsWithPagination(
  page: number = 1,
  pageSize: number = 10,
): Promise<Paginatedevents> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_event_FILTER} && published == true] | ${ORDER_BY_DATE} [$offset...$end] ${event_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<EventSanitySchema[]>(query, {
      offset,
      end: offset + pageSize,
    });
    const total = await getEventsCount();
    return {
      data: mapToEventList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated events:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function getAllEvents() {
  const query = `*[${BASE_event_FILTER} && published == true] | ${ORDER_BY_DATE} ${event_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<EventSanitySchema[]>(query);
    return mapToEventList(result);
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
}

export async function getFeaturedEvents(limit: number = 4) {
  const query = `*[${BASE_event_FILTER} && published == true && featured == true] | ${ORDER_BY_DATE} [0...$limit] ${event_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<EventSanitySchema[]>(query, {
      limit,
    });
    return mapToEventList(result);
  } catch (error) {
    console.error("Error fetching featured events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  const query = `*[${BASE_event_FILTER} && slug.current == $slug][0] ${event_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<EventSanitySchema | null>(query, {
      slug,
    });
    return result ? mapToEvent(result) : null;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
  }
}

export async function getEventById(id: string) {
  const query = `*[${BASE_event_FILTER} && _id == $id][0] ${event_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<EventSanitySchema | null>(query, {
      id,
    });
    return result ? mapToEvent(result) : null;
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    return null;
  }
}

export async function getAllEventSlugs(): Promise<string[]> {
  // Útil para getStaticPaths si generas las páginas /events/[slug] en build time
  const query = `*[${BASE_event_FILTER} && published == true].slug.current`;
  try {
    return await sanityClient.fetch<string[]>(query);
  } catch (error) {
    console.error("Error fetching event slugs:", error);
    return [];
  }
}

export async function searchEvents(
  search: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<Paginatedevents> {
  const offset = (page - 1) * pageSize;
  const query = `*[${BASE_event_FILTER} && title match $search] | ${ORDER_BY_DATE} [$offset...$end] ${event_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<EventSanitySchema[]>(query, {
      search: `*${search}*`,
      offset,
      end: offset + pageSize,
    });
    const total = await getEventsCount(search);
    return {
      data: mapToEventList(result),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error searching events:", error);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function getEventsInfiniteScroll({
  lastId,
  pageSize = 10,
  query,
  categorySlug,
  timeframe,
  featured,
}: {
  lastId?: string;
  pageSize?: number;
  query?: string;
  categorySlug?: string;
  /** "upcoming" = eventos que aún no terminan, "past" = ya realizados. */
  timeframe?: "upcoming" | "past";
  featured?: boolean;
}) {
  try {
    const filters: string[] = [BASE_event_FILTER, `published == true`];
    const params: Record<string, string | number | boolean> = { pageSize };

    if (query?.trim()) {
      filters.push(
        `(title match $search || location.venue match $search || categories[]->title match $search)`,
      );
      params.search = `*${query.trim()}*`;
    }

    if (categorySlug?.trim()) {
      filters.push(`$categorySlug in categories[]->slug.current`);
      params.categorySlug = categorySlug.trim();
    }

    if (featured !== undefined) {
      filters.push(`featured == $featured`);
      params.featured = featured;
    }

    if (timeframe === "upcoming") {
      filters.push(`coalesce(endDate, date) >= $now`);
      params.now = new Date().toISOString();
    } else if (timeframe === "past") {
      filters.push(`coalesce(endDate, date) < $now`);
      params.now = new Date().toISOString();
    }

    const filtersQuery = filters.join(" && ");
    let sanityQuery = `*[${filtersQuery}] | order(date desc, _id desc) [0...$pageSize] ${event_BASE_QUERY}`;

    if (lastId) {
      const lastEvent = await sanityClient.fetch<{ date: string } | null>(
        `*[${BASE_event_FILTER} && _id == $lastId][0]{ date }`,
        { lastId },
      );
      if (!lastEvent?.date) {
        return { data: [], lastId: null };
      }
      sanityQuery = `*[${filtersQuery} && (date < $lastDate || (date == $lastDate && _id < $lastId))] | order(date desc, _id desc) [0...$pageSize] ${event_BASE_QUERY}`;
      params.lastDate = lastEvent.date;
      params.lastId = lastId;
    }

    const result = await sanityClient.fetch<EventSanitySchema[]>(
      sanityQuery,
      params,
    );
    return {
      data: mapToEventList(result),
      lastId: result.length > 0 ? result[result.length - 1]._id : null,
    };
  } catch (error) {
    console.error("Error fetching events for infinite scroll:", error);
    return { data: [], lastId: null };
  }
}

export async function getEventGalleryPage({
  slug,
  offset = 0,
  limit = 12,
}: {
  slug: string;
  offset?: number;
  limit?: number;
}): Promise<{ items: EventMediaItem[]; total: number; hasMore: boolean }> {
  const query = `*[${BASE_event_FILTER} && slug.current == $slug][0]{
    "total": count(gallery),
    "items": gallery[$offset...$end]{
      _key,
      _type,
      "assetId": asset->_id,
      "url": asset->url,
      alt,
      caption,
      credit,
      "poster": poster{ "url": asset->url },
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions,
      "client": client->{
        _id,
        name,
        business,
        "logo": logo{ "url": asset->url }
      }
    }
  }`;

  try {
    const result = await sanityClient.fetch<{
      total: number;
      items: RawGalleryItem[];
    } | null>(query, { slug, offset, end: offset + limit });

    const total = result?.total ?? 0;
    const items = (result?.items ?? []).map(mapGalleryItem);

    return {
      items,
      total,
      hasMore: offset + items.length < total,
    };
  } catch (error) {
    console.error(`Error fetching gallery page for event ${slug}:`, error);
    return { items: [], total: 0, hasMore: false };
  }
}
