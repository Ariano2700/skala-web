import { sanityClient } from "sanity:client";
import {
  mapToClient,
  mapToClientList,
  type ClientSanitySchema,
} from "./client-mapper";

const CLIENT_BASE_QUERY = `{
  _id,
  name,
  slug,
  business,
  clientType,
  category,
  bio,
  "logo": logo{ "url": asset->url, alt },
  social
}`;

const BASE_CLIENT_FILTER = `_type == "client"`;
const ORDER_BY_NAME = `order(name asc)`;

export async function getAllClients() {
  const query = `*[${BASE_CLIENT_FILTER}] | ${ORDER_BY_NAME} ${CLIENT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ClientSanitySchema[]>(query);
    return mapToClientList(result);
  } catch (error) {
    console.error("Error fetching all clients:", error);
    return [];
  }
}

/**
 * Clientes con al menos un proyecto o evento público asociado: son los que
 * tienen sentido como página pública en `/clientes`. Evita listar/generar
 * perfiles vacíos para clientes registrados que aún no tienen contenido
 * vinculado.
 */
export async function getClientsWithPublicContent() {
  const query = `*[${BASE_CLIENT_FILTER}
    && (count(*[_type == "project" && clientRef._ref == ^._id]) > 0
        || count(*[_type == "event" && published == true && ^._id in clients[]._ref]) > 0)
  ] | ${ORDER_BY_NAME} ${CLIENT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ClientSanitySchema[]>(query);
    return mapToClientList(result);
  } catch (error) {
    console.error("Error fetching clients with public content:", error);
    return [];
  }
}

export async function getClientBySlug(slug: string) {
  const query = `*[${BASE_CLIENT_FILTER} && slug.current == $slug][0] ${CLIENT_BASE_QUERY}`;
  try {
    const result = await sanityClient.fetch<ClientSanitySchema | null>(
      query,
      { slug },
    );
    return result ? mapToClient(result) : null;
  } catch (error) {
    console.error(`Error fetching client with slug ${slug}:`, error);
    return null;
  }
}
