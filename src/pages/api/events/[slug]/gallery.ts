import type { APIRoute } from "astro";
import { getEventGalleryPage } from "../../../../sanity/event/api";

export const prerender = false;

export const GET: APIRoute = async ({ params, url }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(
      JSON.stringify({ items: [], total: 0, hasMore: false }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const offsetParam = Number(url.searchParams.get("offset") ?? "0");
  const limitParam = Number(url.searchParams.get("limit") ?? "12");

  const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0;
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 24)
    : 12;

  const result = await getEventGalleryPage({ slug, offset, limit });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    },
  });
};
