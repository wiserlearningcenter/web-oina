"use client";



import { CivisMediaImage } from "@/components/cms/CivisMediaImage";

import { useCallback, useEffect, useState } from "react";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { CivisEditPencil } from "@/components/cms/CmsEditFields";

import { useCivisCmsEdit } from "@/components/cms/CivisCmsEditContext";

import { useCivisHomePageCopy, useMergedOferta, useMergedTalleresRealizados } from "@/lib/cms/hooks";



function useSlidesPerView() {

  const [slides, setSlides] = useState(1);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    setMounted(true);

    const update = () => {

      if (window.matchMedia("(min-width: 1024px)").matches) setSlides(3);

      else if (window.matchMedia("(min-width: 640px)").matches) setSlides(2);

      else setSlides(1);

    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);

  }, []);

  // Misma base SSR + primer paint cliente (1 slide) para evitar mismatch.
  return mounted ? slides : 1;

}



/** Carrusel de talleres recientes (6 fotos) antes del pie de página. */

export function ActividadesRecientesCarousel() {

  const edit = useCivisCmsEdit();

  const copy = useCivisHomePageCopy();

  const lineas = useMergedOferta();

  const LINEA_LABEL: Record<string, string> = Object.fromEntries(

    lineas.map((t) => [t.id, t.title]),

  );

  const mergedItems = useMergedTalleresRealizados();

  const items = mergedItems.map((t, idx) => ({
    ...t,
    cmsId:
      edit?.ready && edit.talleresRealizados[idx]
        ? edit.talleresRealizados[idx]!.id
        : undefined,
  }));

  const slidesPerView = useSlidesPerView();

  const maxIndex = Math.max(0, items.length - slidesPerView);

  const [index, setIndex] = useState(0);

  const section = copy.actividades ?? {};



  useEffect(() => {

    setIndex((i) => Math.min(i, maxIndex));

  }, [maxIndex]);



  const prev = useCallback(() => {

    setIndex((i) => Math.max(0, i - 1));

  }, []);



  const next = useCallback(() => {

    setIndex((i) => Math.min(maxIndex, i + 1));

  }, [maxIndex]);



  useEffect(() => {

    if (maxIndex <= 0) return;

    if (

      typeof window !== "undefined" &&

      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ) {

      return;

    }

    const t = setInterval(() => {

      setIndex((i) => (i >= maxIndex ? 0 : i + 1));

    }, 5500);

    return () => clearInterval(t);

  }, [maxIndex]);



  if (items.length === 0) {
    if (!edit?.ready) return null;
    return (
      <section
        id="actividades-recientes"
        className="relative scroll-mt-28 border-t border-na-civis/10 bg-white py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm text-na-muted">Aún no hay talleres en el carrusel.</p>
          <button
            type="button"
            onClick={() => edit.addTallerRealizado()}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#3e48a1] px-5 py-2.5 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            Añadir primer taller
          </button>
        </div>
      </section>
    );
  }



  return (

    <section

      id="actividades-recientes"

      className="relative scroll-mt-28 border-t border-na-civis/10 bg-white py-14 sm:py-16"

    >

      {edit?.ready ? (

        <CivisEditPencil

          label="Editar sección actividades"

          onClick={() => edit.setSelectedId("__home-actividades-section__")}

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

        {edit?.ready ? (
          <button
            type="button"
            onClick={() => edit.addTallerRealizado()}
            className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#3e48a1]/35 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#3e48a1]"
          >
            <Plus className="h-4 w-4" />
            Añadir al carrusel
          </button>
        ) : null}



        <div className="relative mt-10">

          <div className="overflow-hidden">

            <ul

              className="flex transition-transform duration-500 ease-out"

              style={{

                transform: `translateX(-${index * (100 / slidesPerView)}%)`,

              }}

            >

              {items.map((item, idx) => (

                <li

                  key={item.cmsId ?? `${item.title}-${item.client}-${idx}`}

                  className="w-full shrink-0 px-2 sm:px-2.5"

                  style={{ flexBasis: `${100 / slidesPerView}%` }}

                >

                  <article className="group relative overflow-hidden rounded-2xl border border-na-civis/12 bg-na-surface shadow-na-soft">

                    {edit?.ready ? (

                      <CivisEditPencil

                        label="Editar taller realizado"

                        onClick={() => {

                          if (item.cmsId) {

                            edit.setSelectedId(`realizado:${item.cmsId}`);

                          }

                        }}

                      />

                    ) : null}

                    <div className="relative aspect-[4/3] bg-na-civis/5">

                      <CivisMediaImage

                        src={item.image.src}

                        alt={item.image.alt}

                        fill

                        className="object-cover transition duration-500 group-hover:scale-[1.03]"

                        style={{

                          objectPosition:

                            item.image.objectPosition ?? "50% 30%",

                        }}

                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

                        unoptimized

                      />

                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-na-civisDark shadow-sm">

                        {LINEA_LABEL[item.lineaId] ?? item.lineaId}

                      </span>

                    </div>

                    <div className="p-4 sm:p-5">

                      <p className="text-xs font-semibold text-na-civisDark">

                        {item.date}

                        {item.place ? ` · ${item.place}` : ""}

                      </p>

                      <h3 className="mt-1.5 text-base font-black leading-snug text-na-ink sm:text-lg">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-sm text-na-muted">{item.client}</p>

                    </div>

                  </article>

                </li>

              ))}

            </ul>

          </div>



          {maxIndex > 0 ? (

            <>

              <button

                type="button"

                onClick={prev}

                disabled={index === 0}

                className="absolute -left-1 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-na-civisDark shadow-md transition hover:bg-na-civis/5 disabled:pointer-events-none disabled:opacity-30 sm:-left-4"

                aria-label="Actividades anteriores"

              >

                <ChevronLeft className="h-5 w-5" />

              </button>

              <button

                type="button"

                onClick={next}

                disabled={index >= maxIndex}

                className="absolute -right-1 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-na-civisDark shadow-md transition hover:bg-na-civis/5 disabled:pointer-events-none disabled:opacity-30 sm:-right-4"

                aria-label="Actividades siguientes"

              >

                <ChevronRight className="h-5 w-5" />

              </button>



              <div className="mt-6 flex justify-center gap-2">

                {Array.from({ length: maxIndex + 1 }, (_, i) => (

                  <button

                    key={i}

                    type="button"

                    onClick={() => setIndex(i)}

                    className={`h-2 rounded-full transition-all ${

                      i === index

                        ? "w-6 bg-na-civis"

                        : "w-2 bg-na-civis/25 hover:bg-na-civis/50"

                    }`}

                    aria-label={`Ver grupo ${i + 1} de actividades`}

                    aria-current={i === index}

                  />

                ))}

              </div>

            </>

          ) : null}

        </div>

      </div>

    </section>

  );

}


