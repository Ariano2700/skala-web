import type { SanityDocument } from "@sanity/client";

export type ClientTypeValue =
  | "emprendedor"
  | "marca"
  | "recurrente"
  | "patrocinador";

export const CLIENT_TYPE_LABELS: Record<ClientTypeValue, string> = {
  emprendedor: "Emprendedor",
  marca: "Marca / empresa",
  recurrente: "Cliente recurrente",
  patrocinador: "Patrocinador",
};

export interface ClientSocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

export interface ClientSanitySchema extends SanityDocument {
  name: string;
  slug: { current: string };
  business?: string;
  clientType?: ClientTypeValue;
  category?: string;
  bio?: string;
  logo?: { url?: string; alt?: string };
  social?: ClientSocialLinks;
}

export interface Client {
  id: string;
  name: string;
  slug: string;
  business?: string;
  clientType?: ClientTypeValue;
  category?: string;
  bio?: string;
  logoUrl?: string;
  logoAlt?: string;
  social?: ClientSocialLinks;
}

export const mapToClient = (raw: ClientSanitySchema | null): Client => ({
  id: raw?._id ?? "",
  name: raw?.name ?? "Sin nombre",
  slug: raw?.slug?.current ?? "",
  business: raw?.business,
  clientType: raw?.clientType,
  category: raw?.category,
  bio: raw?.bio,
  logoUrl: raw?.logo?.url,
  logoAlt: raw?.logo?.alt,
  social: raw?.social,
});

export const mapToClientList = (raw: ClientSanitySchema[]): Client[] =>
  raw.map(mapToClient);
