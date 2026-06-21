import type { SiteId } from "./content-types";
import { TAB_LABELS, tabsForRole, type EditorRole } from "./editor-roles";

export type TabGroup = {
  label: string;
  tabs: string[];
};

const ACROPOLIS_TAB_GROUPS: TabGroup[] = [
  { label: "Inicio y ubicación", tabs: ["home", "homeHero", "sedes"] },
  { label: "Programas y formación", tabs: ["cursos", "diplomado", "diplomadoHero", "filosofia"] },
  { label: "Actividades", tabs: ["voluntariado", "eventos", "agenda"] },
  { label: "Artículos y cultura", tabs: ["articulos", "medios", "cultura"] },
  { label: "Viajes", tabs: ["viajesLocales", "viajesInternacionales"] },
  { label: "Archivos", tabs: ["archivos"] },
];

const CIVIS_TAB_GROUPS: TabGroup[] = [
  {
    label: "Páginas del sitio",
    tabs: ["civisHome", "civisTalleres", "civisSalones", "civisQuienesSomos"],
  },
  { label: "Archivos", tabs: ["archivos"] },
];

export function tabGroupsForRole(site: SiteId, role: EditorRole): TabGroup[] {
  const allowed = tabsForRole(site, role);
  const allowedSet = new Set(allowed);
  const templates = site === "acropolis" ? ACROPOLIS_TAB_GROUPS : CIVIS_TAB_GROUPS;

  const grouped = templates
    .map((group) => ({
      label: group.label,
      tabs: group.tabs.filter((tab) => allowedSet.has(tab)),
    }))
    .filter((group) => group.tabs.length > 0);

  const used = new Set(grouped.flatMap((g) => g.tabs));
  const rest = allowed.filter((tab) => !used.has(tab));
  if (rest.length > 0) {
    grouped.push({ label: "Más opciones", tabs: rest });
  }

  return grouped;
}

export function tabLabel(id: string): string {
  return TAB_LABELS[id] ?? id;
}
