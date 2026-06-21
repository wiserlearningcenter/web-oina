export type HeroImage = {
  src: string;
  alt: string;
  /** Punto de encuadre con object-cover (prioriza rostros / acción). */
  objectPosition?: string;
};

/** Fotos de talleres corporativos para el hero de Civis. */
export const CIVIS_HERO_IMAGES: HeroImage[] = [
  {
    src: "/img/hero/taller-barna-eva.webp",
    alt: "Eva Rodríguez facilitando un taller sobre conflictos y convivencia en Barna Management School",
    objectPosition: "68% 32%",
  },
  {
    src: "/img/hero/conflictos.webp",
    alt: "Equipo de trabajo en sesión de formación sobre manejo de conflictos",
    objectPosition: "48% 32%",
  },
  {
    src: "/img/hero/oratoria.webp",
    alt: "Taller de comunicación y oratoria con participantes en un entorno profesional",
    objectPosition: "50% 25%",
  },
  {
    src: "/img/hero/taller-equipos.webp",
    alt: "Dinámica grupal de trabajo en equipo en un taller para el sector privado",
    objectPosition: "50% 30%",
  },
];
