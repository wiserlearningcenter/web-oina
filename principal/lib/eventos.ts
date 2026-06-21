// Eventos y actividades de Nueva Acrópolis RD (contenido real de acropolis.org.do).
// Cada evento abre su propia página en /eventos/<slug>.

export type EventoItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: { src: string; alt: string };
  body: string[];
};

export const EVENTOS: EventoItem[] = [
  {
    slug: "el-arte-de-respirar",
    title: 'Encuentro "El arte de respirar"',
    date: "6 de mayo de 2026",
    category: "Cultura",
    excerpt:
      "Una jornada para redescubrir la respiración consciente como herramienta de calma, atención y bienestar interior.",
    image: {
      src: "/img/eventos/respirar.webp",
      alt: "Encuentro de respiración consciente en Nueva Acrópolis",
    },
    body: [
      "Nueva Acrópolis Dominicana realizó el encuentro “El arte de respirar: ciencia, respiración y equilibrio interior”, celebrado en Izbira Event Venue como parte de la programación de su Punto Cultural.",
      "La actividad reunió a 18 participantes en una experiencia de bienestar consciente orientada a hacer una pausa del ritmo cotidiano, reconectar con el cuerpo y explorar el poder de la respiración consciente y el descanso profundo.",
      "La jornada inició a las 6:30 de la tarde con ejercicios de respiración guiada y continuó con movimientos suaves y restaurativos enfocados en liberar tensiones y promover calma y equilibrio interior en un ambiente sereno y contemplativo.",
      "Con iniciativas como esta, Nueva Acrópolis Dominicana continúa promoviendo espacios culturales y formativos que integran ciencia, filosofía y bienestar, fomentando una vida más consciente y armónica.",
    ],
  },
  {
    slug: "dia-de-la-tierra",
    title: "Día de la Tierra con ciencia, filosofía y acción",
    date: "22 de abril de 2026",
    category: "Voluntariado",
    excerpt:
      "Celebramos el Día de la Tierra uniendo reflexión filosófica y acción concreta por el medio ambiente.",
    image: {
      src: "/img/eventos/tierra.webp",
      alt: "Actividad por el Día de la Tierra con ciencia y filosofía",
    },
    body: [
      "Nueva Acrópolis Dominicana celebró durante el mes de abril una programación especial en conmemoración del Día de la Tierra, integrando ciencia, filosofía y acción ecológica a través de una trilogía de encuentros y una jornada de reforestación.",
      "Bajo el concepto “De la colmena al cosmos: un viaje de ciencia y filosofía para redescubrir nuestro lugar en la naturaleza”, la organización reunió a decenas de participantes en tres encuentros temáticos sobre la inteligencia de la naturaleza, el equilibrio de los ecosistemas y la relación del ser humano con el universo.",
      "El ciclo inició el 8 de abril con “El secreto de las abejas”; continuó el 15 de abril con la charla “Bosques: el equilibrio de la Tierra”; y cerró el 22 de abril, Día de la Tierra, con “Astronomía: nuestro lugar en el cosmos”, ampliando la mirada hacia el universo para comprender la profunda interconexión entre la Tierra y el cosmos.",
      "Como cierre de la celebración se realizó una jornada de reforestación en La Jagua, Yaguate, San Cristóbal, con la participación de 53 voluntarios, quienes sembraron 1,080 plántulas de caoba dominicana y guázara, reafirmando el compromiso con la educación ambiental y la acción consciente en favor del planeta.",
    ],
  },
  {
    slug: "valor-de-las-abejas",
    title:
      "Charla sobre el valor de las abejas y apertura del nuevo Centro Cultural",
    date: "20 de abril de 2026",
    category: "Cultura",
    excerpt:
      "Una charla sobre el papel esencial de las abejas en la naturaleza, junto al anuncio de nuestro nuevo Centro Cultural.",
    image: {
      src: "/img/eventos/abejas.webp",
      alt: "Charla sobre el valor de las abejas y apertura del nuevo Centro Cultural",
    },
    body: [
      "En el marco de la celebración del Día de la Tierra, Nueva Acrópolis Dominicana llevó a cabo la charla “El secreto de las abejas: la vida pequeña que sostiene todo”, realizada en Izbira, marcando además el inicio de la apertura de un nuevo centro cultural en la ciudad de Santo Domingo.",
      "La exposición inició con Mónica Ponce de León y Alejandra Flórez, de Miel Nucayní, quienes ofrecieron un recorrido didáctico por la vida de las abejas: su rol esencial como polinizadores, los sistemas de comunicación entre abejas y flores, la estructura del panal y el alto grado de cooperación que caracteriza a estas comunidades.",
      "A continuación, Sally Polanco Bloise desarrolló una exposición sobre el simbolismo de las abejas en diversas culturas: desde el antiguo Egipto, donde representaban el orden cósmico, hasta la Grecia clásica, donde las “melisas” eran consideradas sacerdotisas guardianas de los misterios sagrados.",
      "La jornada concluyó con una degustación de miel, propiciando un espacio de encuentro y reforzando el mensaje central de la actividad: valorar, proteger y aprender de estas pequeñas pero esenciales guardianas de la vida.",
    ],
  },
  {
    slug: "feria-de-la-salud",
    title: "Participación en la Feria de la Salud Ferries del Caribe",
    date: "10 de marzo de 2026",
    category: "Comunidad",
    excerpt:
      "Estuvimos presentes en la 13ª Feria de la Salud, acercando filosofía práctica y bienestar a la comunidad.",
    image: {
      src: "/img/eventos/feria-salud.webp",
      alt: "Voluntarios de Nueva Acrópolis en la Feria de la Salud Ferries del Caribe",
    },
    body: [
      "Nueva Acrópolis Dominicana se hizo presente en la 13ª Feria de la Salud de la Fundación Ferries del Caribe, integrándose a una de las iniciativas solidarias de mayor alcance en el país. La jornada logró brindar más de 9,000 consultas en múltiples especialidades médicas.",
      "Más de un centenar de voluntarios de Nueva Acrópolis asumieron con compromiso y eficiencia labores clave de orientación, organización y acompañamiento de los pacientes, sosteniendo el orden y el trato humano en cada etapa del proceso.",
      "Esta experiencia reafirma una convicción central: que el voluntariado consciente no es solo ayuda puntual, sino una forma de acción organizada, disciplinada y profundamente humana, capaz de responder con eficacia a necesidades reales y de fortalecer el tejido social.",
    ],
  },
  {
    slug: "gestion-de-emergencias",
    title: "Voluntarios se capacitan en gestión de emergencias",
    date: "14 de marzo de 2026",
    category: "Esfera",
    excerpt:
      "Simulacros y formación práctica en respuesta a emergencias, en el marco de nuestro Punto Focal Esfera.",
    image: {
      src: "/img/eventos/simulacros.webp",
      alt: "Voluntarios capacitándose en gestión de emergencias",
    },
    body: [
      "Nueva Acrópolis Dominicana realizó una jornada de simulacros y capacitación orientada a fortalecer la respuesta ante desastres, dirigida a voluntarios y participantes interesados en la preparación comunitaria y el servicio solidario. La actividad recreó distintos escenarios de emergencia para entrenar habilidades prácticas.",
      "Durante la jornada se desarrollaron ejercicios de Evaluación de Daños y Análisis de Necesidades (EDAN), herramienta clave para identificar el impacto de un evento adverso, y prácticas de Primeros Auxilios Psicológicos, enfocadas en brindar contención emocional a personas en situación de crisis.",
      "El programa incluyó también formación sobre el Sistema de Comando de Incidentes (ICS) y prácticas vinculadas a los Equipos Comunitarios de Respuesta a Emergencias (CERTS). Con estas iniciativas, Nueva Acrópolis Dominicana reafirma su compromiso con una cultura de resiliencia, solidaridad y servicio.",
    ],
  },
  {
    slug: "diplomado-filosofia-santiago",
    title:
      "Santiago abraza la filosofía: lanzamiento del Diplomado Filosofía para la Vida",
    date: "12 de abril de 2026",
    category: "Filosofía",
    excerpt:
      "Con gran acogida lanzamos el nuevo Diplomado de Filosofía para la Vida en Santiago de los Caballeros.",
    image: {
      src: "/img/eventos/santiago.webp",
      alt: "Lanzamiento del Diplomado de Filosofía para la Vida en Santiago",
    },
    body: [
      "Con una respuesta que ha superado las expectativas y un ambiente cargado de entusiasmo, Nueva Acrópolis Dominicana ha consolidado su presencia en la “Ciudad Corazón”. Tras dos exitosas charlas informativas, el nuevo Diplomado en Filosofía Comparada completó sus primeras sesiones formales con un sólido grupo de 23 inscritos.",
      "El proceso de apertura ha generado comentarios sumamente positivos entre los participantes, quienes destacan la profundidad de los temas y la calidez del grupo. La transición de las sesiones informativas a las clases del programa académico ha sido fluida, manteniendo un alto nivel de compromiso.",
      "La llegada a Santiago ha contado con el respaldo constante de los miembros de la sede de Santo Domingo, fortaleciendo el sentido de unidad institucional y permitiendo que la mística y los valores de Nueva Acrópolis se sientan presentes desde el primer día.",
      "Debido al éxito de este primer grupo, abriremos una nueva promoción. Invitamos a los interesados a inscribirse desde ya en nuestra lista de espera para asegurar su cupo y recibir información prioritaria.",
    ],
  },
];

export function getEvento(slug: string): EventoItem | undefined {
  return EVENTOS.find((e) => e.slug === slug);
}
