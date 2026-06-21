"use client";

import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import { CmsSectionEditBar, CmsEditPencil } from "@/components/cms/CmsEditPencil";
import { useEsferaCmsEdit } from "@/components/cms/EsferaCmsEditContext";
import {
  ESFERA_ALIANZAS_SECTION_ID,
  esferaAlianzaSelectedId,
} from "@/lib/cms/esfera-page-edit";
import { useEsferaPageDisplay } from "@/lib/cms/esfera-display";
import { resolveCmsMediaUrl } from "@/lib/cms/api-client";
import { accentCardShell, accentEyebrowClass, accentTokens } from "@/lib/brand-accents";

export function EsferaAlianzasSection() {
  const edit = useEsferaCmsEdit();
  const page = useEsferaPageDisplay();
  const alianzas = page.alianzas ?? [];

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      {edit?.ready ? (
        <div className="absolute right-4 top-4 z-10 sm:right-6">
          <CmsSectionEditBar
            label="Editar sección"
            onClick={() => edit.setSelectedId(ESFERA_ALIANZAS_SECTION_ID)}
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={accentEyebrowClass(3)}>{page.alianzasEyebrow}</p>
          <h2 className="mt-2 text-balance text-3xl font-black text-na-heketDark sm:text-4xl">
            {page.alianzasTitle}
          </h2>
        </div>
        {edit?.ready ? (
          <button
            type="button"
            onClick={() => edit.addAlianza()}
            className="inline-flex items-center gap-2 rounded-full bg-na-helios px-4 py-2 text-xs font-bold uppercase text-na-ink shadow"
          >
            <Plus className="h-4 w-4" />
            Añadir alianza
          </button>
        ) : null}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {alianzas.map((alianza, i) => {
          const a = accentTokens(i);
          const logoSrc = resolveCmsMediaUrl(alianza.logo) ?? alianza.logo;
          return (
            <li
              key={alianza.id}
              className={`relative flex flex-col items-center justify-between gap-4 p-5 text-center ${accentCardShell(i, "min-h-[168px]")}`}
            >
              {edit?.ready ? (
                <CmsEditPencil
                  label={`Editar ${alianza.name}`}
                  onClick={() =>
                    edit.setSelectedId(esferaAlianzaSelectedId(alianza.id))
                  }
                  className="right-2 top-2"
                />
              ) : null}
              <div className="flex min-h-[72px] w-full flex-1 items-center justify-center rounded-xl bg-white/80 px-3 py-4">
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={alianza.logoAlt}
                    width={180}
                    height={72}
                    unoptimized
                    className="max-h-16 w-auto max-w-full object-contain"
                  />
                ) : edit?.ready ? (
                  <span className="text-xs text-amber-800">Sin logo</span>
                ) : null}
              </div>
              <p className={`text-xs font-bold leading-snug ${a.icon}`}>
                {alianza.name}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
