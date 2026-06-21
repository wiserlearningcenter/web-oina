/** Catálogo de cursos, talleres y conferencias culturales abiertas al público. */

export type OfertaCurso = {
  src: string;
  alt: string;
  title: string;
  text: string;
  facilitador?: string;
  sede?: string;
  /** Etiqueta temática (Bienestar, Arte…). */
  tag?: string;
  /** Para conferencias: «Abierta y gratuita», etc. */
  accessLabel?: string;
  inscribeKind?: "curso" | "taller" | "actividad" | "conferencia";
  inscribeLabel?: string;
};

export const CURSOS_TALLERES: OfertaCurso[] = [
  {
    src: "/img/cursos/respirar.webp",
    alt: "Taller El arte de respirar — respiración consciente y equilibrio interior",
    title: "El arte de respirar",
    text: "Redescubre la respiración consciente como herramienta de calma, atención y bienestar. Ejercicios guiados para hacer una pausa del ritmo cotidiano y reconectar con el cuerpo.",
    tag: "Bienestar",
    sede: "Punto Cultural Roberto Pastoriza",
  },
  {
    src: "/img/cursos/pintura.webp",
    alt: "Taller de pintura con participantes frente a sus caballetes",
    title: "Taller de pintura",
    text: "Desarrolla la sensibilidad artística a través del color y la forma. Un espacio creativo para expresar ideas, observar con atención y disfrutar del proceso de pintar.",
    tag: "Arte",
  },
  {
    src: "/img/cursos/lectura.webp",
    alt: "Círculo de lectura con grupo conversando sobre libros",
    title: "Círculo de lectura",
    text: "Leer y dialogar en grupo sobre textos que invitan a pensar. Un encuentro para compartir ideas, profundizar en autores y descubrir nuevas miradas sobre la vida.",
    tag: "Cultura",
  },
  {
    src: "/img/cursos/chi-kung-salon.webp",
    alt: "Grupo visto de espaldas practicando Chi Kung en salón con espejo y piso de madera",
    title: "Tai Chi y Chi Kung",
    text: "Movimientos suaves y naturales combinados con respiración profunda: meditación en movimiento que fortalece cuerpo y mente. Apto para todas las edades y condiciones físicas.",
    facilitador: "Mayra Sifres",
    tag: "Bienestar",
  },
  {
    src: "/img/cursos/bienestar.webp",
    alt: "Taller de conciencia y bienestar con prácticas de atención plena",
    title: "Conciencia y bienestar",
    text: "Herramientas prácticas para cultivar presencia, equilibrio emocional y armonía interior. Integra cuerpo, respiración y reflexión en un camino de cuidado personal.",
    tag: "Bienestar",
  },
  {
    src: "/img/cursos/conflictos.webp",
    alt: "Taller sobre liderar conflictos con inteligencia en grupo",
    title: "Liderar conflictos con inteligencia",
    text: "Aprende a abordar desacuerdos con claridad, empatía y estrategia. Desarrolla habilidades de comunicación y convivencia para resolver tensiones de forma constructiva.",
    tag: "Comunicación",
  },
  {
    src: "/img/cursos/astrologia.webp",
    alt: "Carta astral y símbolos del zodíaco sobre una mesa de estudio",
    title: "Astrología filosófica",
    text: "El lenguaje simbólico del cosmos como espejo del mundo interior. Descubre la relación entre el ser humano y el universo a través de la carta astral. Niveles I y II.",
    facilitador: "Daniel Salinas",
    sede: "Sede Los Prados",
  },
  {
    src: "/img/cursos/oratoria.webp",
    alt: "Persona exponiendo ante un grupo en un taller de oratoria",
    title: "Oratoria",
    text: "La palabra como herramienta de valor. Gana claridad en la expresión, buen lenguaje corporal y seguridad para hablar en público.",
    tag: "Comunicación",
  },
  {
    src: "/img/cursos/crochet.webp",
    alt: "Manos tejiendo a crochet con ovillos de lana de colores",
    title: "Crochet",
    text: "Cultiva paciencia, creatividad y atención a través de las manos, creando piezas únicas en un ambiente de encuentro y disfrute.",
    tag: "Arte y oficio",
  },
];

export const CONFERENCIAS_CULTURALES: OfertaCurso[] = [
  {
    src: "/img/eventos/arte-vivir-proposito.webp",
    alt:
      "Conferencia «El arte de vivir con propósito» — filosofía práctica y sentido de la vida, Sede Naco",
    title: "El arte de vivir con propósito",
    text: "Conferencia cultural para explorar la filosofía como herramienta práctica: encontrar sentido, fortalecer la voluntad y orientar decisiones cotidianas a la luz de las grandes tradiciones de Oriente y Occidente. Entrada libre; cupos limitados.",
    accessLabel: "Abierta y gratuita",
    sede: "Sede Naco · Santo Domingo",
    inscribeKind: "conferencia",
    inscribeLabel: "Quiero asistir",
  },
];
