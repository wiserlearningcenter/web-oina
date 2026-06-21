import type { CmsCollaborateBlock, CmsCollaborateTab } from "@/lib/cms/types";

export const DEFAULT_COLLABORATE_TABS: CmsCollaborateTab[] = [
  {
    id: "donar",
    label: "Donar",
    title: "Apoyo económico",
    text: "La formación y la preparación ante emergencias se sostienen con aportes transparentes. Escríbenos para coordinar donaciones o transferencias destinadas a los proyectos humanitarios de la escuela.",
    cta: "Quiero donar",
    href: "#donar",
  },
  {
    id: "alianzas",
    label: "Alianzas",
    title: "Alianzas e instituciones",
    text: "Organizaciones, empresas con responsabilidad social e instituciones públicas pueden articular talleres, espacios o cofinanciamiento formativo bajo criterios Esfera. Preparamos propuestas a medida.",
    cta: "Proponer alianza",
    href: "#alianzas",
  },
];

export const DEFAULT_COLLABORATE_BLOCK: CmsCollaborateBlock = {
  title: "Colabora junto a nosotros",
  intro:
    "La formación y la acción solidaria se fortalecen con quienes aportan recursos o alianzas institucionales. Usa los formularios de cada pestaña para contactarnos.",
  tabs: DEFAULT_COLLABORATE_TABS,
};

export function mergeCollaborateBlock(
  overrides?: CmsCollaborateBlock | null,
): CmsCollaborateBlock {
  if (!overrides) return DEFAULT_COLLABORATE_BLOCK;
  const byId = new Map((overrides.tabs ?? []).map((t) => [t.id, t]));
  return {
    ...DEFAULT_COLLABORATE_BLOCK,
    ...overrides,
    tabs: DEFAULT_COLLABORATE_TABS.map((d) => {
      const o = byId.get(d.id);
      return o ? { ...d, ...o } : d;
    }),
  };
}

export const COLLABORATE_SECTION_ID = "__collaborate__";

export function collaborateTabSelectedId(id: string) {
  return `collaborate:${id}`;
}

export function parseCollaborateTabSelectedId(
  selectedId: string | null,
): string | null {
  if (!selectedId?.startsWith("collaborate:")) return null;
  return selectedId.slice("collaborate:".length);
}
