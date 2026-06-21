import type { AgendaEntry } from "@/lib/agenda";

/**
 * Convocatorias fechadas de cursos y conferencias — /cursos y carrusel del home.
 * Al añadir una fecha (`startsAt`), la actividad entra sola al home si es futura.
 * `showOnHome: false` la oculta del carrusel aunque tenga fecha.
 */
export const CURSOS_PROXIMAS_CONVOCATORIAS: AgendaEntry[] = [
  {
    id: "conferencia-arte-vivir-jul16",
    category: "conferencia",
    title: "El arte de vivir con propósito",
    startsAt: "2026-07-16",
    date: "Miércoles 16 de julio",
    time: "7:00 p.m.",
    sede: "Sede Naco · Santo Domingo",
    tag: "Abierta y gratuita",
    image: "/img/eventos/arte-vivir-proposito.webp",
    imageAlt:
      "Conferencia «El arte de vivir con propósito» — filosofía práctica y sentido de la vida, Sede Naco",
    description:
      "Conferencia cultural para explorar la filosofía como herramienta práctica: sentido, voluntad y decisiones cotidianas.",
    inscribeMessage:
      "Hola, me interesa asistir a la conferencia «El arte de vivir con propósito» — miércoles 16 de julio, 7:00 p.m., Sede Naco. ¿Me pueden confirmar cupo?",
    detailHref: "/cursos",
    detailLabel: "Ver cursos y conferencias",
  },
];
