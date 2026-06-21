import { SOCIAL_LINKS } from "./site-config";

export type ActivityPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

/** Fotos de actividades — imágenes limpias para la home. */
export const ACTIVITY_PHOTOS: ActivityPhoto[] = [
  {
    src: "/img/actividades/voluntariado-santa-rosa.webp",
    alt: "Voluntariado en Santa Rosa de Lima",
    caption: "Voluntariado comunitario",
  },
  {
    src: "/img/actividades/teatro-juvenil.webp",
    alt: "Presentación de teatro juvenil",
    caption: "Teatro y cultura",
  },
  {
    src: "/img/actividades/campamento-dirigentes.webp",
    alt: "Campamento de dirigentes juveniles",
    caption: "Formación de líderes",
  },
  {
    src: "/img/actividades/dia-mundial-filosofia.webp",
    alt: "Celebración del Día Mundial de la Filosofía",
    caption: "Día Mundial de la Filosofía",
  },
  {
    src: "/img/actividades/liderazgo-juvenil.webp",
    alt: "Campamento de liderazgo juvenil",
    caption: "Liderazgo juvenil",
  },
  {
    src: "/img/actividades/dia-madre-tierra.webp",
    alt: "Día Internacional de la Madre Tierra",
    caption: "Día de la Tierra",
  },
  {
    src: "/img/actividades/feria-salud.webp",
    alt: "Participación en la Feria de la Salud",
    caption: "Feria de la Salud",
  },
  {
    src: "/img/actividades/encuentro-cultural.webp",
    alt: "Encuentro cultural de Nueva Acrópolis",
    caption: "Encuentro cultural",
  },
  {
    src: "/img/actividades/dia-medio-ambiente.webp",
    alt: "Día mundial del medio ambiente",
    caption: "Medio ambiente",
  },
];

export type InstagramPost = {
  src: string;
  alt: string;
  href: string;
};

/** Publicaciones recientes — @nuevaacropolisdominicana (imágenes locales WebP). */
export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    src: "/img/instagram/383.webp",
    alt: "Publicación reciente de @nuevaacropolisdominicana",
    href: SOCIAL_LINKS.instagram,
  },
  {
    src: "/img/instagram/382.webp",
    alt: "Publicación reciente de @nuevaacropolisdominicana",
    href: SOCIAL_LINKS.instagram,
  },
  {
    src: "/img/instagram/381.webp",
    alt: "Publicación reciente de @nuevaacropolisdominicana",
    href: SOCIAL_LINKS.instagram,
  },
  {
    src: "/img/instagram/380.webp",
    alt: "Publicación reciente de @nuevaacropolisdominicana",
    href: SOCIAL_LINKS.instagram,
  },
  {
    src: "/img/instagram/379-1.webp",
    alt: "Publicación reciente de @nuevaacropolisdominicana",
    href: SOCIAL_LINKS.instagram,
  },
  {
    src: "/img/instagram/05-5.webp",
    alt: "Publicación reciente de @nuevaacropolisdominicana",
    href: SOCIAL_LINKS.instagram,
  },
];
