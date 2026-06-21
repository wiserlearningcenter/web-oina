"use client";



import { CivisMediaImage } from "@/components/cms/CivisMediaImage";

import Link from "next/link";

import { ArrowRight, Clock } from "lucide-react";

import { OfertaFormativaItem } from "@/components/OfertaFormativaItem";

import { CivisEditPencil } from "@/components/cms/CmsEditFields";

import { useCivisCmsEdit } from "@/components/cms/CivisCmsEditContext";

import { useCivisHomePageCopy, useMergedOferta } from "@/lib/cms/hooks";



/** Resumen de las líneas formativas para la página de inicio. */

export function CivisOfertaResumen() {

  const edit = useCivisCmsEdit();

  const copy = useCivisHomePageCopy();

  const talleres = useMergedOferta();

  const section = copy.oferta ?? {};



  return (

    <section className="relative border-t border-na-civis/10 bg-na-civis/[0.04] py-14 sm:py-16">

      {edit?.ready ? (

        <CivisEditPencil

          label="Editar sección oferta"

          onClick={() => edit.setSelectedId("__home-oferta-section__")}

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



        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {talleres.map((taller) => (

            <li

              key={taller.id}

              className="relative flex flex-col overflow-hidden rounded-2xl border border-na-civis/12 bg-white shadow-na-soft"

            >

              {edit?.ready ? (

                <CivisEditPencil

                  label={`Editar ${taller.title}`}

                  onClick={() => edit.setSelectedId(`oferta:${taller.id}`)}

                />

              ) : null}

              <div className="relative aspect-[16/10] bg-na-civis/5">

                <CivisMediaImage

                  src={taller.image.src}

                  alt={taller.image.alt}

                  fill

                  className="object-cover"

                  style={{

                    objectPosition: taller.image.objectPosition ?? "50% 30%",

                  }}

                  sizes="(max-width: 1024px) 100vw, 33vw"

                  unoptimized

                />

              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">

                <OfertaFormativaItem

                  variant="summary"

                  title={taller.title}

                  intro={taller.intro}

                  meta={

                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-na-civis">

                      <Clock className="h-3.5 w-3.5" aria-hidden />

                      {taller.duration} · {taller.format}

                    </p>

                  }

                />

              </div>

            </li>

          ))}

        </ul>



        <p className="mt-10 flex justify-end">

          <Link

            href="/talleres"

            className="inline-flex items-center gap-2 rounded-full bg-na-civis px-6 py-3 text-sm font-bold text-white shadow-md shadow-na-civis/25 transition hover:bg-na-civisDark"

          >

            Ver oferta completa

            <ArrowRight className="h-4 w-4" aria-hidden />

          </Link>

        </p>

      </div>

    </section>

  );

}


