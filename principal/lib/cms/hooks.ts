"use client";

import {
  getHomeAgendaItems,
  getUpcomingAgendaItems,
  type AgendaEntry,
} from "@/lib/agenda";
import { ARTICULOS } from "@/lib/articulos";
import { EVENTOS } from "@/lib/eventos";
import { MEDIOS } from "@/lib/medios";
import { VIAJES_DESTINOS, type ViajeCategoriaSlug } from "@/lib/viajes";
import { VENUE_LOCATIONS } from "@/lib/locations";
import { INFO_EMAIL } from "@/lib/site-config";
import { resolveAgendaFromCms } from "@/lib/cms/merge";
import { getEsferaTrainings } from "@/lib/cms/esfera-page-edit";
import {
  getCmsGalleryArticulo,
  getCmsGalleryEvento,
  mergeArticulos,
  mergeEventos,
  mergeMedios,
  mergeVenues,
  mergeViajes,
} from "@/lib/cms/merge-content";
import { useCmsDocument, isCmsEnabled } from "@/lib/cms/provider";
import {
  formatCentrosSummary,
  formatSedesSummary,
} from "@/lib/cms/venues-edit";
import {
  DIPLOMADO_INFO_BANNER,
  DIPLOMADO_INSCRIPTION,
} from "@/lib/diplomado-content";
import { CULTURA_PROXIMAS_ACTIVIDADES } from "@/lib/cultura-agenda";
import { CURSOS_PROXIMAS_CONVOCATORIAS } from "@/lib/cursos-agenda";
import { VOLUNTARIADO_PROXIMAS_ACTIVIDADES } from "@/lib/voluntariado-agenda";
import { ACTIVITY_PHOTOS } from "@/lib/home-content";
import {
  cmsEntryToAgenda,
  getCulturaEntries,
  getVoluntariadoEntries,
  getCursosAgendaEntries,
} from "@/lib/cms/agenda-edit";
import { ALL_AGENDA_ENTRIES } from "@/lib/agenda-registry";
import { DIPLOMADO_PROXIMAS_SESIONES } from "@/lib/diplomado-sessions";

export function useCmsAllAgenda(fallback = ALL_AGENDA_ENTRIES): AgendaEntry[] {
  const cms = useCmsDocument();
  return resolveAgendaFromCms(cms, fallback);
}

export function useCmsHomeAgenda(reference = new Date()) {
  const entries = useCmsAllAgenda();
  return getHomeAgendaItems(entries, reference);
}

export function useCmsDiplomadoSessions(reference = new Date()) {
  const cms = useCmsDocument();
  const base = resolveAgendaFromCms(cms, DIPLOMADO_PROXIMAS_SESIONES);
  return getUpcomingAgendaItems(
    base.filter((e) => e.category === "diplomado"),
    reference,
  );
}

export function useCmsDiplomadoBadge(fallback: { weekday: string; date: string }) {
  const cms = useCmsDocument();
  const h = cms?.sections.diplomadoHero;
  if (!isCmsEnabled() || (!h?.badgeWeekday && !h?.badgeDate)) return fallback;
  return {
    weekday: h.badgeWeekday ?? fallback.weekday,
    date: h.badgeDate ?? fallback.date,
  };
}

export function useCmsDiplomadoInfo() {
  const cms = useCmsDocument();
  const h = cms?.sections.diplomadoHero;
  const bannerFallback = DIPLOMADO_INFO_BANNER;
  const scheduleFallback = DIPLOMADO_INSCRIPTION.schedule;

  if (!isCmsEnabled() || !h) {
    return {
      banner: [...bannerFallback],
      schedule: [...scheduleFallback],
    };
  }

  return {
    banner: [
      {
        value: h.badgeDate ?? bannerFallback[0].value,
        label: bannerFallback[0].label,
      },
      {
        value: h.bannerDuration ?? bannerFallback[1].value,
        label: bannerFallback[1].label,
      },
      {
        value: h.activeModality ?? bannerFallback[2].value,
        label: bannerFallback[2].label,
      },
      {
        value: h.bannerFee ?? bannerFallback[3].value,
        label: bannerFallback[3].label,
      },
    ],
    schedule: [
      {
        label: scheduleFallback[0].label,
        value: h.activeDate ?? scheduleFallback[0].value,
      },
      {
        label: scheduleFallback[1].label,
        value: h.activeTime ?? scheduleFallback[1].value,
      },
      {
        label: scheduleFallback[2].label,
        value: h.activeModality ?? scheduleFallback[2].value,
      },
      {
        label: scheduleFallback[3].label,
        value: h.bannerDuration ?? scheduleFallback[3].value,
      },
    ],
  };
}

export function useCmsCulturaAgenda(reference = new Date()) {
  const cms = useCmsDocument();
  if (!isCmsEnabled() || !cms) {
    return getUpcomingAgendaItems(CULTURA_PROXIMAS_ACTIVIDADES, reference);
  }
  const entries = getCulturaEntries(cms, CULTURA_PROXIMAS_ACTIVIDADES);
  return getUpcomingAgendaItems(entries.map(cmsEntryToAgenda), reference);
}

export function useCmsCulturaSectionText() {
  const cms = useCmsDocument();
  const cp = cms?.sections.culturaPage;
  return {
    title: cp?.proximasTitle ?? "Próximas actividades",
    intro:
      cp?.proximasIntro ??
      "Clases, ensayos y encuentros culturales en nuestras sedes de Santo Domingo y en el Punto Cultural Roberto Pastoriza. Haz clic para ver más.",
  };
}

export function useCmsVoluntariadoAgenda(reference = new Date()) {
  const cms = useCmsDocument();
  if (!isCmsEnabled() || !cms) {
    return getUpcomingAgendaItems(VOLUNTARIADO_PROXIMAS_ACTIVIDADES, reference);
  }
  const entries = getVoluntariadoEntries(cms, VOLUNTARIADO_PROXIMAS_ACTIVIDADES);
  return getUpcomingAgendaItems(entries.map(cmsEntryToAgenda), reference);
}

export function useCmsVoluntariadoSectionText() {
  const cms = useCmsDocument();
  const vp = cms?.sections.voluntariadoPage;
  return {
    title: vp?.proximasTitle ?? "Próximas actividades",
    intro:
      vp?.proximasIntro ??
      "Jornadas y encuentros de voluntariado en nuestras sedes. Haz clic para ver más.",
  };
}

export function useCmsCursosAgenda(reference = new Date()) {
  const cms = useCmsDocument();
  if (!isCmsEnabled() || !cms) {
    return getUpcomingAgendaItems(CURSOS_PROXIMAS_CONVOCATORIAS, reference);
  }
  const entries = getCursosAgendaEntries(cms, CURSOS_PROXIMAS_CONVOCATORIAS);
  return getUpcomingAgendaItems(entries.map(cmsEntryToAgenda), reference);
}

export function useCmsCursosSectionText() {
  const cms = useCmsDocument();
  const cp = cms?.sections.cursosPage;
  return {
    title: cp?.proximasTitle ?? "Próximas convocatorias",
    intro:
      cp?.proximasIntro ??
      "Cursos, talleres y conferencias con fecha próxima. Haz clic para inscribirte o pedir más información.",
  };
}

export function useCmsEsferaTrainings() {
  const cms = useCmsDocument();
  if (!isCmsEnabled() || !cms) {
    return getEsferaTrainings(null);
  }
  return getEsferaTrainings(cms);
}

export function useCmsEsferaSectionText() {
  const cms = useCmsDocument();
  const ep = cms?.sections.esferaPage;
  return {
    eyebrow: ep?.agendaEyebrow ?? "Agenda",
    title: ep?.agendaTitle ?? "Actividades y próximos entrenamientos",
    intro:
      ep?.agendaIntro ??
      "Líneas habituales de capacitación y práctica; fechas y sedes se confirman con el equipo en República Dominicana.",
  };
}

export function useCmsActivityPhotos() {
  const cms = useCmsDocument();
  const photos = cms?.sections.activityPhotos;
  if (!isCmsEnabled() || !photos?.length) return ACTIVITY_PHOTOS;
  return photos;
}

export function useMergedArticulos() {
  const cms = useCmsDocument();
  return mergeArticulos(ARTICULOS, cms);
}

export function useMergedEventos() {
  const cms = useCmsDocument();
  return mergeEventos(EVENTOS, cms);
}

export function useMergedMedios() {
  const cms = useCmsDocument();
  return mergeMedios(MEDIOS, cms);
}

export function useMergedViajes(categoria?: ViajeCategoriaSlug) {
  const cms = useCmsDocument();
  const all = mergeViajes(VIAJES_DESTINOS, cms);
  return categoria ? all.filter((v) => v.categoria === categoria) : all;
}

export function useMergedVenues() {
  const cms = useCmsDocument();
  return mergeVenues(VENUE_LOCATIONS, cms);
}

export function useVenuesSummary() {
  const venues = useMergedVenues();
  return {
    sedes: formatSedesSummary(venues),
    centros: formatCentrosSummary(venues),
    venues,
  };
}

export function usePrimarySedeContact() {
  const venues = useMergedVenues();
  const naco =
    venues.find((v) => v.id === "sede-naco") ??
    venues.find((v) => v.kind === "sede");
  if (!naco) {
    return {
      direccion: "Cub Scout No. 6, Naco",
      ciudad: "Santo Domingo, República Dominicana",
      email: INFO_EMAIL,
    };
  }
  return {
    direccion: `${naco.address}, ${naco.zone}`,
    ciudad: `${naco.city}, República Dominicana`,
    email: naco.email ?? INFO_EMAIL,
  };
}

export function useArticuloGallery(slug: string) {
  const cms = useCmsDocument();
  if (!isCmsEnabled()) return [];
  return getCmsGalleryArticulo(cms, slug);
}

export function useEventoGallery(slug: string) {
  const cms = useCmsDocument();
  if (!isCmsEnabled()) return [];
  return getCmsGalleryEvento(cms, slug);
}
