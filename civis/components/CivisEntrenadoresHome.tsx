"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CivisEntrenadoresList } from "@/components/CivisEntrenadoresList";
import { CivisEditPencil } from "@/components/cms/CmsEditFields";
import { useCivisCmsEdit } from "@/components/cms/CivisCmsEditContext";
import { useCivisHomePageCopy, useCmsHydrated, useMergedEntrenadores } from "@/lib/cms/hooks";
import { CIVIS_ENTRENADORES_DESTACADOS, CIVIS_NUESTRO_EQUIPO_PATH } from "@/lib/civis-content";



export function CivisEntrenadoresHome() {

  const edit = useCivisCmsEdit();

  const hydrated = useCmsHydrated();

  const copy = useCivisHomePageCopy();

  const mergedEntrenadores = useMergedEntrenadores(true);

  const entrenadores = hydrated ? mergedEntrenadores : CIVIS_ENTRENADORES_DESTACADOS;

  const section = copy.entrenadores ?? {};



  return (

    <section className="relative border-t border-na-civis/10 bg-na-civis/[0.04] py-14 sm:py-16">

      {edit?.ready ? (

        <CivisEditPencil

          label="Editar sección entrenadores"

          onClick={() => edit.setSelectedId("__home-entrenadores-section__")}

          className="right-4 top-4"

        />

      ) : null}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <p className="text-xs font-bold uppercase tracking-[0.32em] text-na-civisDark">

          {section.eyebrow}

        </p>

        <h2 className="mt-3 text-balance text-3xl font-black text-na-ink sm:text-4xl">

          {section.title}

        </h2>

        <h3 className="mt-4 max-w-2xl text-sm font-normal leading-relaxed text-na-muted sm:text-base">

          {section.lede}

        </h3>



        <CivisEntrenadoresList entrenadores={entrenadores} compact />



        <p className="mt-8 flex justify-end">
          <Link
            href={CIVIS_NUESTRO_EQUIPO_PATH}
            className="inline-flex items-center gap-2 rounded-full border border-na-civis/25 bg-white px-6 py-3 text-sm font-bold text-na-civisDark shadow-na-soft transition hover:border-na-civis/40 hover:bg-na-civis/[0.06]"
          >
            Ver todo el equipo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>

      </div>

    </section>

  );

}


