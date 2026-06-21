import type {

  ProximaActividad,

  TallerRealizado,

} from "@/lib/talleres-actividades";

import type { CivisCliente, EntrenadorCivis } from "@/lib/civis-content";

import type { TallerCivis } from "@/lib/talleres";

import type { CmsDocument } from "@/lib/cms/types";

import {

  mergeClientes,

  mergeEntrenadores,

  mergeOferta,

  mergeProximasList,

  mergeTalleresRealizadosList,

  resolveHomePage,

  resolveQuienesPage,

  resolveTalleresPage,

} from "@/lib/cms/civis-display";



export function mergeTalleresRealizados(

  code: TallerRealizado[],

  cms: CmsDocument | null | undefined,

): TallerRealizado[] {

  return mergeTalleresRealizadosList(

    code,

    cms?.sections.civisTalleresRealizados,

  );

}



export function mergeProximasActividades(

  code: ProximaActividad[],

  cms: CmsDocument | null | undefined,

): ProximaActividad[] {

  return mergeProximasList(code, cms?.sections.civisProximasActividades);

}



export function mergeCivisOferta(

  code: TallerCivis[],

  cms: CmsDocument | null | undefined,

): TallerCivis[] {

  return mergeOferta(code, cms?.sections.civisOferta);

}



export function mergeCivisEntrenadores(

  code: EntrenadorCivis[],

  cms: CmsDocument | null | undefined,

): EntrenadorCivis[] {

  return mergeEntrenadores(code, cms?.sections.civisEntrenadores);

}



export function mergeCivisClientes(

  code: CivisCliente[],

  cms: CmsDocument | null | undefined,

): CivisCliente[] {

  return mergeClientes(code, cms?.sections.civisClientes);

}



export function resolveCivisHero(

  cms: CmsDocument | null | undefined,

  fallback: {

    title: string;

    lede: string;

    h2?: string;

    ctaHref?: string;

    ctaLabel?: string;

  },

) {

  const h = cms?.sections.homeHero;

  return {

    title: h?.h1 ?? fallback.title,

    lede: h?.lede ?? fallback.lede,

    subtitle: h?.h2 ?? fallback.h2,

    ctaHref: h?.ctaHref ?? fallback.ctaHref,

    ctaLabel: h?.ctaLabel ?? fallback.ctaLabel,

  };

}



export {

  resolveHomePage,

  resolveHomePrincipios,

  resolveTalleresPage,

  resolveQuienesPage,

  resolveQuienesCivis,

  resolveQuienesNa,

} from "@/lib/cms/civis-display";


