/** Líneas formativas Civis Consulting — catálogo de talleres para empresas. */

export type TallerCivis = {
  id: string;
  title: string;
  /** Párrafo introductorio bajo el título. */
  intro: string;
  /** Viñetas con formato «Título — descripción». */
  topics: string[];
  /** Duración corta para la línea de metadatos (p. ej. «4 horas»). */
  duration: string;
  /** Etiqueta legible en formularios (p. ej. «4 horas (media jornada)»). */
  durationLabel: string;
  durationHours: number;
  format: string;
  maxParticipants: number;
  image: { src: string; alt: string; objectPosition?: string };
};

export const TALLERES_CIVIS: TallerCivis[] = [
  {
    id: "etica",
    title: "Ética y responsabilidad",
    intro:
      "Taller presencial para equipos directivos y mandos medios que buscan criterios compartidos para decidir con integridad, transparencia y coherencia entre valores declarados y acciones cotidianas.",
    topics: [
      "Principios para decisiones cotidianas — marcos de referencia para actuar con criterio en el entorno laboral.",
      "Integridad y transparencia — confianza interna cuando lo que se declara coincide con lo que se hace.",
      "Responsabilidad compartida — de la norma escrita a la práctica colectiva del equipo.",
      "Diálogo y reflexión guiada — espacios para alinear valores personales y cultura organizacional.",
      "Metodología vivencial — dinámicas, casos reales y ejercicios aplicados al contexto de la empresa.",
      "Propuesta in company — duración, temas y formato adaptables a su organización.",
    ],
    duration: "4 horas",
    durationLabel: "4 horas (media jornada)",
    durationHours: 4,
    format: "Presencial",
    maxParticipants: 25,
    image: {
      src: "/img/hero/taller-barna.webp",
      alt: "Facilitador en taller de ética y liderazgo ante un grupo de empresarios",
      objectPosition: "50% 28%",
    },
  },
  {
    id: "convivencia",
    title: "Personas y convivencia",
    intro:
      "Jornada extendida para equipos que necesitan mejorar comunicación, escucha activa y clima laboral en entornos exigentes, con herramientas prácticas para la convivencia diaria.",
    topics: [
      "Escucha activa — escuchar para comprender, no solo para responder.",
      "Comunicación en entornos exigentes — mensajes claros bajo presión y con diversidad de estilos.",
      "Respeto y convivencia — acuerdos de convivencia y límites sanos en el trabajo.",
      "Trabajo colaborativo — ejercicios en grupo para practicar antes de llevarlos al puesto.",
      "Metodología vivencial — role-play, casos del día a día y reflexión compartida.",
      "Propuesta in company — contenidos y dinámicas ajustados al tamaño y la cultura del equipo.",
    ],
    duration: "6 horas",
    durationLabel: "6 horas (jornada extendida)",
    durationHours: 6,
    format: "Presencial",
    maxParticipants: 25,
    image: {
      src: "/img/hero/oratoria.webp",
      alt: "Sesión de comunicación y convivencia con participantes en un taller",
      objectPosition: "50% 25%",
    },
  },
  {
    id: "conflicto",
    title: "Conflicto y liderazgo",
    intro:
      "Jornada completa para mandos medios y alta dirección que enfrentan tensiones recurrentes y necesitan herramientas concretas para mediar, negociar acuerdos y liderar con criterio.",
    topics: [
      "Conflicto como oportunidad — leer tensiones sin evitarlas ni escalarlas innecesariamente.",
      "Herramientas de mediación — pasos prácticos para facilitar acuerdos entre partes.",
      "Negociación con criterio — intereses, posiciones y soluciones viables para el equipo.",
      "Liderazgo con ejemplo — coherencia entre lo que se pide y lo que se modela.",
      "Metodología vivencial — simulaciones y casos reales del ámbito corporativo.",
      "Propuesta in company — profundidad y casos adaptados a su sector y sus retos.",
    ],
    duration: "8 horas",
    durationLabel: "8 horas (jornada completa)",
    durationHours: 8,
    format: "Presencial",
    maxParticipants: 20,
    image: {
      src: "/img/hero/taller-barna-eva.webp",
      alt: "Eva Rodríguez facilitando un taller sobre conflictos y convivencia en Barna Management School",
      objectPosition: "68% 32%",
    },
  },
  {
    id: "claridad-mental",
    title: "Claridad mental y equilibrio",
    intro:
      "Taller presencial facilitado por Daniel Salinas que integra filosofía comparada, respiración consciente y prácticas gimnástico-terapéuticas de origen chino (Chi Kung) para cultivar serenidad, atención y equilibrio interior — aplicables al entorno laboral y a la vida cotidiana.",
    topics: [
      "Filosofía práctica — corrientes de Oriente y Occidente aplicadas a la claridad mental y el sentido.",
      "Chi Kung y respiración — movimientos suaves y respiración consciente para equilibrio cuerpo-mente.",
      "Atención y serenidad — herramientas para reducir dispersión y recuperar foco en entornos exigentes.",
      "Disciplinas tradicionales — enfoque integral desde la tradición acrópolea y las artes marciales orientales.",
      "Metodología vivencial — prácticas guiadas en salón, adaptables al tamaño y ritmo del grupo.",
      "Propuesta in company — duración y profundidad ajustables para empresas, equipos o instituciones.",
    ],
    duration: "4 horas",
    durationLabel: "4 horas (media jornada)",
    durationHours: 4,
    format: "Presencial",
    maxParticipants: 25,
    image: {
      src: "/img/talleres/claridad-mental-equilibrio.webp",
      alt: "Grupo visto de espaldas practicando movimientos de Chi Kung en salón con espejo y piso de madera",
      objectPosition: "50% 18%",
    },
  },
];
