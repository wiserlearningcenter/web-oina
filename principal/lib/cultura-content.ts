import type {
  CmsCirculoAmigosPromo,
  CmsCulturaCard,
} from "@/lib/cms/types";

export const CULTURA_TALLERES_SECTION = {
  eyebrow: "Talleres culturales",
  title: "Talleres de arte y expresión",
  intro:
    "Espacios para desarrollar la sensibilidad y el trabajo en equipo. Fechas, horarios y sedes se confirman según la programación.",
} as const;

export const CULTURA_TALLERES_DEFAULTS: CmsCulturaCard[] = [
  {
    id: "coro",
    src: "/img/cultura/talleres/coro.webp",
    alt: "Coro mixto cantando durante un ensayo",
    title: "Coro",
    text: "La voz como instrumento de unión: ensayos y presentaciones que cultivan la escucha y el trabajo en equipo.",
  },
  {
    id: "teatro",
    src: "/img/cultura/talleres/teatro.webp",
    alt: "Grupo de teatro de distintas edades ensayando en escena",
    title: "Teatro",
    text: "Expresión, memoria y carácter sobre el escenario; montajes con sentido formativo y humano, para todas las edades.",
  },
  {
    id: "danza",
    src: "/img/cultura/talleres/danza.webp",
    alt: "Clase de merengue con trajes típicos dominicanos",
    title: "Danza",
    text: "El movimiento como lenguaje: desde el merengue y nuestras danzas típicas hasta danzas de distintas culturas y su simbolismo.",
  },
  {
    id: "jovenes",
    src: "/img/cultura/talleres/jovenes.webp",
    alt: "Jóvenes en un ejercicio de trabajo en equipo al aire libre",
    title: "Jóvenes",
    text: "Actividades pensadas para jóvenes: arte, naturaleza, retos y voluntariado con espíritu de equipo.",
  },
];

export const CULTURA_VIAJES_SECTION = {
  eyebrow: "Viajes culturales",
  title: "Conocer el mundo, dentro y fuera del país",
  intro:
    "La cultura también se vive viajando. Organizamos salidas a sitios locales y expediciones internacionales para acercarnos al arte, la historia y la naturaleza con una mirada filosófica.",
} as const;

export const CULTURA_EVENTOS_SECTION = {
  eyebrow: "Eventos",
  title: "Eventos",
  intro:
    "A lo largo del año realizamos eventos y celebraciones en nuestras sedes. Estos son algunos; consulta la programación completa.",
} as const;

export const CULTURA_EVENTOS_PREVIEW_DEFAULTS: CmsCulturaCard[] = [
  {
    id: "bienvenida-primavera",
    src: "/img/cultura/eventos/midsommar.webp",
    alt: "Celebración Bienvenida Primavera al aire libre",
    title: "Bienvenida Primavera!",
    text: "Damos la bienvenida a la nueva estación con un encuentro al aire libre: música, símbolos y celebración de la naturaleza.",
  },
  {
    id: "veladas",
    src: "/img/cultura/eventos/velada.webp",
    alt: "Velada cultural con un cuarteto de cuerdas a la luz de las velas",
    title: "Veladas culturales",
    text: "Conciertos, recitales de poesía y veladas artísticas para disfrutar de la belleza y el encuentro entre socios y voluntarios.",
  },
  {
    id: "foros",
    src: "/img/cultura/eventos/filosofia.webp",
    alt: "Foro de filosofía al aire libre en un jardín",
    title: "Foros y encuentros",
    text: "Charlas, foros y conmemoraciones como el Día Mundial de la Filosofía, para pensar juntos los grandes temas del ser humano.",
  },
];

export const CULTURA_CIRCULO_AMIGOS_DEFAULTS: CmsCirculoAmigosPromo = {
  eyebrow: "Abierto al público",
  title: "¿Quieres ser amigo de Nueva Acrópolis?",
  lede: "Un espacio para quienes aman la filosofía, la cultura y el voluntariado — jóvenes adultos, personas de mediana edad y mayores — y desean seguir vinculados a Nueva Acrópolis sin integrarse al plan de estudios regular. Incluye diálogos semanales sobre filosofía y temas de actualidad, junto al círculo de lectura y otras actividades abiertas a quienes no pueden formar parte del plan de estudios.",
  imageSrc: "/img/circulo-amigos/conversacion.webp",
  imageAlt:
    "Hombres y mujeres de distintas edades conversando juntos en círculo sobre filosofía y temas de actualidad",
};
