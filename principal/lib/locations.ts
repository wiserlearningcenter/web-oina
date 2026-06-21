import {
  DIPLOMADO_WHATSAPP_NUMBER,
  DIPLOMADO_WHATSAPP_URL,
  INFO_EMAIL,
} from "@/lib/site-config";

export type VenueKind = "sede" | "centro-cultural";

export type VenueLocation = {  id: string;
  name: string;
  kind: VenueKind;
  city: string;
  zone: string;
  address: string;
  reference?: string;
  phone?: string;
  email?: string;
  mapsQuery: string;
  note?: string;
  mapX?: number;
  mapY?: number;
};

export const CONTACT_EMAIL = INFO_EMAIL;
export const CONTACT_PHONE = "(849) 352-7054";

/** Sedes y centros culturales con direcciones para «Encuéntranos». */
export const VENUE_LOCATIONS: VenueLocation[] = [
  {
    id: "sede-naco",
    name: "Sede Naco",
    kind: "sede",
    city: "Santo Domingo",
    zone: "Ens. Naco",
    address: "Calle Cub Scouts No. 6, 3er nivel",
    reference: "Antes de Av. Tiradentes, detrás de Plaza Merengue",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    mapsQuery: "Calle Cub Scouts 6 Naco Santo Domingo República Dominicana",
    note: "Escuela de Filosofía, Diplomado y actividades regulares de sede.",
  },
  {
    id: "sede-los-prados",
    name: "Sede Los Prados",
    kind: "sede",
    city: "Santo Domingo",
    zone: "Los Prados",
    address: "Eugenio Deschamps No. 81",
    reference: "Plaza Los Prados",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    mapsQuery:
      "Eugenio Deschamps 81 Los Prados Santo Domingo República Dominicana",
    note: "Clases, talleres y actividades de nuestra sede en Los Prados.",
  },
  {
    id: "punto-cultural-roberto-pastoriza",
    name: "Punto Cultural Roberto Pastoriza",
    kind: "centro-cultural",
    city: "Santo Domingo",
    zone: "Evaristo Morales",
    address: "Roberto Pastoriza No. 709",
    phone: CONTACT_PHONE,
    mapsQuery: "Roberto Pastoriza 709 Evaristo Morales Santo Domingo",
    note: "Punto cultural · eventos, celebraciones y encuentros abiertos.",
  },
];

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function venuesByKind(kind: VenueKind): VenueLocation[] {
  return VENUE_LOCATIONS.filter((v) => v.kind === kind);
}

export {
  DIPLOMADO_WHATSAPP_URL as WHATSAPP_URL,
  DIPLOMADO_WHATSAPP_NUMBER as WHATSAPP_NUMBER,
};
