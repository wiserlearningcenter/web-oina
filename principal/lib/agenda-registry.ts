import type { AgendaEntry } from "@/lib/agenda";
import { getHomeAgendaItems, getUpcomingAgendaItems } from "@/lib/agenda";
import { CULTURA_PROXIMAS_ACTIVIDADES } from "@/lib/cultura-agenda";
import { CURSOS_PROXIMAS_CONVOCATORIAS } from "@/lib/cursos-agenda";
import { VOLUNTARIADO_PROXIMAS_ACTIVIDADES } from "@/lib/voluntariado-agenda";
import { DIPLOMADO_PROXIMAS_SESIONES } from "@/lib/diplomado-sessions";

/** Todas las actividades fechadas del sitio (fuente única para home y filtros). */
export const ALL_AGENDA_ENTRIES: AgendaEntry[] = [
  ...DIPLOMADO_PROXIMAS_SESIONES,
  ...CURSOS_PROXIMAS_CONVOCATORIAS,
  ...CULTURA_PROXIMAS_ACTIVIDADES,
  ...VOLUNTARIADO_PROXIMAS_ACTIVIDADES,
];

export function getAllUpcomingAgenda(reference = new Date()) {
  return getUpcomingAgendaItems(ALL_AGENDA_ENTRIES, reference);
}

export function getHomeUpcomingAgenda(reference = new Date()) {
  return getHomeAgendaItems(ALL_AGENDA_ENTRIES, reference);
}

export function getUpcomingByCategory(
  category: AgendaEntry["category"],
  reference = new Date(),
) {
  return getUpcomingAgendaItems(
    ALL_AGENDA_ENTRIES.filter((e) => e.category === category),
    reference,
  );
}
