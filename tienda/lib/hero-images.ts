export type HeroImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

/** Fotos del hero editorial (generadas con npm run hero:build). */
export const EDITORIAL_HERO_IMAGES: HeroImage[] = [
  {
    src: "/img/hero/libros-1.webp",
    alt: "Libros de filosofía y cultura de Editorial Nueva Acrópolis",
    objectPosition: "50% 45%",
  },
  {
    src: "/img/hero/libros-2.webp",
    alt: "Publicaciones y material editorial de Nueva Acrópolis",
    objectPosition: "50% 40%",
  },
  {
    src: "/img/hero/taller-libros.webp",
    alt: "Mesa con libros y material de estudio",
    objectPosition: "55% 35%",
  },
];
