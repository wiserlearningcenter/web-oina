import type { AgendaItem } from "@/components/UpcomingAgenda";

export type AgendaCategory =
  | "diplomado"
  | "curso"
  | "taller"
  | "conferencia"
  | "cultura"
  | "voluntariado";

/** Entrada de agenda con metadatos para filtrado en home y páginas. */
export type AgendaEntry = AgendaItem & {
  /** Identificador estable (p. ej. `diplomado-naco-jun29`). */
  id: string;
  /** Fecha ISO `YYYY-MM-DD` — filtra automáticamente actividades pasadas. */
  startsAt: string;
  category: AgendaCategory;
  /**
   * Si es `false`, no aparece en el carrusel del home aunque la fecha sea futura.
   * Por defecto: visible en home cuando `startsAt` es hoy o posterior.
   */
  showOnHome?: boolean;
  /** Enlace secundario del carrusel (p. ej. /cursos, /filosofia). */
  detailHref?: string;
  detailLabel?: string;
};

export const AGENDA_CATEGORY_LABEL: Record<AgendaCategory, string> = {
  diplomado: "Diplomado",
  curso: "Curso",
  taller: "Taller",
  conferencia: "Conferencia",
  cultura: "Cultura",
  voluntariado: "Voluntariado",
};

/** Categorías que rotan en el carrusel del home (sin cultura comunitaria ni voluntariado). */
export const HOME_AGENDA_CATEGORIES: readonly AgendaCategory[] = [
  "diplomado",
  "curso",
  "taller",
  "conferencia",
];

/** Inicio del día local para comparar fechas sin hora. */
function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseStartsAt(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

/** ¿La actividad es hoy o en el futuro? Requiere `startsAt` válido. */
export function isAgendaUpcoming(
  entry: Pick<AgendaEntry, "startsAt">,
  reference = new Date(),
): boolean {
  const start = parseStartsAt(entry.startsAt);
  if (!start) return false;
  return start >= startOfDay(reference);
}

/**
 * Filtra y ordena entradas con fecha futura (o de hoy).
 * Entradas sin `startsAt` válido se omiten.
 */
export function getUpcomingAgendaItems(
  entries: AgendaEntry[],
  reference = new Date(),
): AgendaEntry[] {
  return entries
    .filter((entry) => isAgendaUpcoming(entry, reference))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Actividades que deben rotar en el carrusel del home. */
export function getHomeAgendaItems(
  entries: AgendaEntry[],
  reference = new Date(),
): AgendaEntry[] {
  return getUpcomingAgendaItems(entries, reference).filter(
    (entry) =>
      entry.showOnHome !== false &&
      HOME_AGENDA_CATEGORIES.includes(entry.category),
  );
}
