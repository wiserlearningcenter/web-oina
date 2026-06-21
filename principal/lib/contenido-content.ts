import type { NavContenidoItem } from "@/lib/site-config";
import { getNavContenidoItems } from "@/lib/site-config";

export type ContenidoSlide = NavContenidoItem & {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: string;
  /** Logo de marca (p. ej. Revista Esfinge) para tab y tarjeta del hero. */
  icon?: string;
  iconAlt?: string;
  /** Temas o secciones destacadas (p. ej. rubricas de la revista). */
  topics?: readonly string[];
};

const SLIDE_META: Record<
  string,
  Omit<ContenidoSlide, keyof NavContenidoItem | "href" | "label" | "external">
> = {
  Artículos: {
    title: "Pensamientos filosóficos",
    description:
      "Reflexiones de filosofía práctica para pensar mejor y vivir con sentido.",
    image: "/img/articulos/el-hombre-interior-y-el-hombre-exterior.webp",
    imageAlt: "Artículos de filosofía práctica de Nueva Acrópolis",
    cta: "Leer artículos",
  },
  Eventos: {
    title: "Eventos y noticias",
    description:
      "Encuentros, celebraciones, viajes culturales y noticias de nuestras sedes.",
    image: "/img/cultura/eventos/midsommar.webp",
    imageAlt: "Celebración cultural de Nueva Acrópolis",
    cta: "Ver eventos",
  },
  "Revista Esfinge": {
    title: "Revista Esfinge",
    description:
      "Publicación digital de divulgación sobre cultura, filosofía, ciencia, ética e historia — promoviendo el diálogo y la reflexión desde 1974.",
    image: "/img/contenido/revista-esfinge-hero.webp",
    imageAlt: "Artículos de divulgación filosófica y cultural — Revista Esfinge",
    icon: "/img/contenido/revista-esfinge-logo.webp",
    iconAlt: "Revista Esfinge — conocimiento, reflexión y diálogo",
    topics: [
      "Filosofía",
      "Ciencia",
      "Sociedad",
      "Culturas",
      "Naturaleza",
      "Historia",
      "Arte",
    ],
    cta: "Leer la revista",
  },
  Biblioteca: {
    title: "Biblioteca Sophia",
    description:
      "Catálogo en línea de la biblioteca de Nueva Acrópolis RD: consulta títulos, signaturas y horarios de las sedes Naco y Los Prados.",
    image: "/img/hero/filosofia/02.webp",
    imageAlt: "Biblioteca de Nueva Acrópolis — estanterías y lectura",
    cta: "Ir a la biblioteca",
  },
  Librería: {
    title: "Librería editorial",
    description:
      "Libros y publicaciones de Nueva Acrópolis y Logos, disponibles en nuestra librería en línea.",
    image: "/img/hero/filosofia/01.webp",
    imageAlt: "Publicaciones de la librería Nueva Acrópolis",
    cta: "Ir a la librería",
  },
  "Redes sociales": {
    title: "Síguenos en Instagram",
    description:
      "Actividades, reflexiones y novedades de Nueva Acrópolis RD en redes.",
    image: "/img/actividades/encuentro-cultural.webp",
    imageAlt: "Comunidad de Nueva Acrópolis en actividades",
    cta: "Ver redes sociales",
  },
};

export function getContenidoSlides(): ContenidoSlide[] {
  return getNavContenidoItems().map((item) => ({
    ...item,
    ...SLIDE_META[item.label],
  }));
}

/** Slides del hub principal (sin redes sociales — van al feed de Instagram). */
export function getContenidoHubSlides(): ContenidoSlide[] {
  return getContenidoSlides().filter((slide) => slide.label !== "Redes sociales");
}

export const CONTENIDO_HUB_LEDE =
  "Artículos, eventos, la Revista Esfinge, nuestra biblioteca y la librería editorial — todo el ecosistema digital de Nueva Acrópolis en República Dominicana.";
