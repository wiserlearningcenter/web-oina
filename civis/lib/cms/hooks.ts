"use client";

import {

  CIVIS_CLIENTES,

  CIVIS_ENTRENADORES,

  CIVIS_ENTRENADORES_DESTACADOS,

} from "@/lib/civis-content";

import { TALLERES_CIVIS } from "@/lib/talleres";

import {

  PROXIMAS_ACTIVIDADES,

  TALLERES_REALIZADOS,

} from "@/lib/talleres-actividades";

import {

  mergeCivisClientes,

  mergeCivisEntrenadores,

  mergeCivisOferta,

  mergeProximasActividades,

  mergeTalleresRealizados,

  resolveCivisHero,

  resolveHomePage,

  resolveHomePrincipios,

  resolveQuienesPage,

  resolveQuienesCivis,

  resolveQuienesNa,

  resolveTalleresPage,

} from "@/lib/cms/merge-content";

import { mergeEntrenadores, mergeOferta } from "@/lib/cms/civis-display";
import {
  resolveCivisHeroCarouselImages,
  toCivisHeroImage,
} from "@/lib/cms/hero-carousel-edit";
import type { HeroImage } from "@/lib/hero-images";

import { isCmsEnabled, useCmsDocument } from "@/lib/cms/provider";
import { useCivisCmsEdit } from "@/components/cms/CivisCmsEditContext";
import { useCmsHydrated } from "@/lib/cms/hydration";

export { useCmsHydrated } from "@/lib/cms/hydration";

function civisHeroFallback(fallback: {
  title: string;
  lede: string;
  h2?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return {
    title: fallback.title,
    lede: fallback.lede,
    subtitle: fallback.h2,
    ctaHref: fallback.ctaHref,
    ctaLabel: fallback.ctaLabel,
  };
}

export function useMergedTalleresRealizados() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) {

    return TALLERES_REALIZADOS;

  }

  if (edit?.ready) {

    return edit.talleresRealizados.map((t) => ({

      title: t.title,

      client: t.client,

      date: t.date,

      place: t.place,

      lineaId: t.lineaId as (typeof TALLERES_REALIZADOS)[0]["lineaId"],

      image: {

        src: t.image.src,

        alt: t.image.alt,

        objectPosition: t.image.objectPosition,

      },

    }));

  }

  return mergeTalleresRealizados(TALLERES_REALIZADOS, cms);

}



export function useMergedProximasActividades() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) {

    return PROXIMAS_ACTIVIDADES;

  }

  if (edit?.ready) {

    return edit.proximas.map((a) => ({

      id: a.id,

      title: a.title,

      date: a.date,

      format: a.format,

      excerpt: a.excerpt,

      lineaId: a.lineaId as (typeof PROXIMAS_ACTIVIDADES)[0]["lineaId"],

      image: {

        src: a.image.src,

        alt: a.image.alt,

        objectPosition: a.image.objectPosition,

      },

      open: a.open,

    }));

  }

  return mergeProximasActividades(PROXIMAS_ACTIVIDADES, cms);

}



export function useMergedOferta() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) {

    return TALLERES_CIVIS;

  }

  if (edit?.ready) {

    return mergeOferta(TALLERES_CIVIS, edit.oferta);

  }

  return mergeCivisOferta(TALLERES_CIVIS, cms);

}



export function useMergedEntrenadores(featuredOnly = false) {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  const code = featuredOnly ? CIVIS_ENTRENADORES_DESTACADOS : CIVIS_ENTRENADORES;

  if (!hydrated) {

    return code;

  }

  if (edit?.ready) {

    const list = mergeEntrenadores(

      featuredOnly ? CIVIS_ENTRENADORES_DESTACADOS : CIVIS_ENTRENADORES,

      edit.entrenadores,

    ).filter((e) => !featuredOnly || e.featured);

    return list.length ? list : code;

  }

  return mergeCivisEntrenadores(code, cms);

}



export function useCivisHeroText(fallback: {

  title: string;

  lede: string;

  h2?: string;

  ctaHref?: string;

  ctaLabel?: string;

}) {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) {
    return civisHeroFallback(fallback);
  }

  if (edit?.ready) {

    const h = edit.homeHero;

    return {

      title: h.h1 ?? fallback.title,

      lede: h.lede ?? fallback.lede,

      subtitle: h.h2 ?? fallback.h2,

      ctaHref: h.ctaHref ?? fallback.ctaHref,

      ctaLabel: h.ctaLabel ?? fallback.ctaLabel,

    };

  }

  if (!isCmsEnabled()) {
    return civisHeroFallback(fallback);
  }

  return resolveCivisHero(cms, fallback);

}



export function useCivisHeroCarouselImages() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) {
    return resolveCivisHeroCarouselImages(null);
  }

  if (edit?.ready) {
    return edit.heroCarousel
      .map(toCivisHeroImage)
      .filter((img): img is HeroImage => img !== null);
  }

  return resolveCivisHeroCarouselImages(cms);

}



export function useCivisHomePageCopy() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return resolveHomePage(null);

  if (edit?.ready) return edit.homePage;

  return resolveHomePage(cms);

}



export function useCivisHomePrincipiosContent() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return resolveHomePrincipios(undefined);

  if (edit?.ready) {

    return resolveHomePrincipios(edit.homePage.principios);

  }

  return resolveHomePrincipios(cms?.sections.civisHomePage?.principios);

}



export function useCivisTalleresPageCopy() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return resolveTalleresPage(null);

  if (edit?.ready) return edit.talleresPage;

  return resolveTalleresPage(cms);

}



export function useCivisQuienesPageCopy() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return resolveQuienesPage(null);

  if (edit?.ready) return edit.quienesPage;

  return resolveQuienesPage(cms);

}



export function useCivisQuienesCivisContent() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return resolveQuienesCivis(undefined);

  if (edit?.ready) {

    return resolveQuienesCivis(edit.quienesPage.civis);

  }

  return resolveQuienesCivis(cms?.sections.civisQuienesPage?.civis);

}



export function useCivisQuienesNaContent() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return resolveQuienesNa(undefined);

  if (edit?.ready) {

    return resolveQuienesNa(edit.quienesPage.nuevaAcropolis);

  }

  return resolveQuienesNa(cms?.sections.civisQuienesPage?.nuevaAcropolis);

}



export function useMergedClientes() {

  const cms = useCmsDocument();

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  if (!hydrated) return CIVIS_CLIENTES;

  if (edit?.ready) {

    return edit.clientes.map((c) => ({

      id: c.id,

      name: c.name ?? "",

      logo: c.logo ?? "",

      logoAlt: c.logoAlt ?? c.name ?? "",

      logoOnDark: c.logoOnDark,

    }));

  }

  return mergeCivisClientes(CIVIS_CLIENTES, cms);

}


