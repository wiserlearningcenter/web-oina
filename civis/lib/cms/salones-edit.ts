import { SALONES, type LayoutKind, type Salon } from "@/lib/salones";
import type {
  CmsCivisSalonesPage,
  CmsDocument,
  CmsMedia,
  CmsSalon,
} from "@/lib/cms/types";

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

export function buildAcropolisDocWithSalones(
  base: CmsDocument,
  items: CmsSalon[],
): CmsDocument {
  return {
    ...base,
    sections: {
      ...base.sections,
      salones: items,
    },
  };
}

export function buildCivisDocWithSalonesPage(
  base: CmsDocument,
  page: CmsCivisSalonesPage,
): CmsDocument {
  return {
    ...base,
    sections: {
      ...base.sections,
      civisSalonesPage: page,
    },
  };
}

export const DEFAULT_CIVIS_SALONES_PAGE: CmsCivisSalonesPage = {
  eyebrow: "Espacios",
  title: "¿Necesitas un espacio para tus talleres o reuniones?",
  lede:
    "Además de impartir formación in company, ponemos a disposición salones sobrios y elegantes en nuestras sedes de Santo Domingo — ideales para talleres, cursos, charlas y reuniones de equipo que usted organice.",
  catalogTitle: "Catálogo de salones",
  catalogIntro:
    "Capacidades por disposición: butacas, mesas tipo escuela o herradura.",
};

export function resolveCivisSalonesPage(
  doc: CmsDocument | null | undefined,
): CmsCivisSalonesPage {
  return { ...DEFAULT_CIVIS_SALONES_PAGE, ...doc?.sections.civisSalonesPage };
}

export function patchSalonLayout(
  salon: CmsSalon,
  featuredLayout: LayoutKind,
): CmsSalon {
  return { ...salon, featuredLayout };
}

export function patchSalonImage(salon: CmsSalon, image: CmsMedia): CmsSalon {
  return { ...salon, image };
}
