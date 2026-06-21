import { SALONES, type LayoutKind, type Salon } from "@/lib/salones";
import type { CmsDocument, CmsMedia, CmsSalon, CmsSalonesPage } from "@/lib/cms/types";

export function salonToCms(s: Salon): CmsSalon {
  return {
    id: s.id,
    name: s.name,
    sede: s.sede,
    city: s.city,
    summary: s.summary,
    featuredLayout: s.featuredLayout,
    capacities: { ...s.capacities },
    image: { src: s.image.src, alt: s.image.alt },
  };
}

export function cmsToSalon(s: CmsSalon): Salon {
  return {
    id: s.id,
    name: s.name,
    sede: s.sede,
    city: s.city as Salon["city"],
    summary: s.summary,
    featuredLayout: s.featuredLayout,
    capacities: { ...s.capacities },
    image: { src: s.image.src, alt: s.image.alt },
  };
}

export function getSalonesForEdit(
  doc: CmsDocument | null | undefined,
  fallback: Salon[] = SALONES,
): CmsSalon[] {
  const cmsById = new Map(
    (doc?.sections.salones ?? []).map((s) => [s.id, s]),
  );
  return fallback.map((s) => cmsById.get(s.id) ?? salonToCms(s));
}

export function mergeSalones(
  doc: CmsDocument | null | undefined,
  fallback: Salon[] = SALONES,
): Salon[] {
  return getSalonesForEdit(doc, fallback).map(cmsToSalon);
}

export function buildDocWithSalones(
  base: CmsDocument,
  items: CmsSalon[],
  page?: CmsSalonesPage,
): CmsDocument {
  return {
    ...base,
    sections: {
      ...base.sections,
      salones: items,
      ...(page !== undefined ? { salonesPage: page } : {}),
    },
  };
}

export const DEFAULT_SALONES_PAGE: CmsSalonesPage = {
  eyebrow: "Espacios",
  title: "Alquiler de salones para talleres y cursos",
  intro:
    "Salones sobrios y elegantes en nuestras sedes de Santo Domingo, con distintas disposiciones según el tipo de actividad. Ideal para cursos, charlas, formaciones corporativas y encuentros formativos.",
};

export function resolveSalonesPage(
  doc: CmsDocument | null | undefined,
): CmsSalonesPage {
  return { ...DEFAULT_SALONES_PAGE, ...doc?.sections.salonesPage };
}

export function patchSalonImage(salon: CmsSalon, image: CmsMedia): CmsSalon {
  return { ...salon, image };
}

export function patchSalonLayout(
  salon: CmsSalon,
  featuredLayout: LayoutKind,
): CmsSalon {
  return { ...salon, featuredLayout };
}
