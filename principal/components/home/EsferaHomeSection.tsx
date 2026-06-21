"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pencil } from "lucide-react";
import { EsferaLogo } from "@/components/EsferaLogo";
import {
  ESFERA_HOME_PROMO_SELECTED_ID,
  useEsferaHomeCmsEdit,
  useEsferaHomeDisplay,
} from "@/lib/cms/esfera-home-display";

export function EsferaHomeSection() {
  const edit = useEsferaHomeCmsEdit();
  const promo = useEsferaHomeDisplay();

  return (
    <section className="relative border-t border-na-heket/10 bg-gradient-to-br from-na-heket/[0.04] via-na-surface to-na-amon/[0.06] py-10 sm:py-11">
      {edit?.ready ? (
        <button
          type="button"
          onClick={() => edit.setSelectedId(ESFERA_HOME_PROMO_SELECTED_ID)}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[11px] font-bold uppercase text-white shadow"
        >
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </button>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[min(36%,17rem)_1fr] lg:gap-8">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-sm overflow-hidden rounded-xl shadow-na-card lg:mx-0 lg:max-w-none">
            <Image
              src={promo.imageSrc}
              alt={promo.imageAlt}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 20rem, 17rem"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-na-heketDark/35 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          <div>
            <EsferaLogo className="h-11 w-auto sm:h-12" />

            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.24em] text-na-kefer">
              {promo.eyebrow}
            </p>
            <h2 className="mt-1.5 text-balance text-xl font-black text-na-heketDark sm:text-2xl">
              {promo.title}
            </h2>
            <p className="mt-2 text-sm leading-snug text-na-muted">
              {promo.intro} {promo.detail}
            </p>

            <Link
              href="/esfera/"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1f9078] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#1f9078]/25 transition hover:bg-na-kefer"
            >
              {promo.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
