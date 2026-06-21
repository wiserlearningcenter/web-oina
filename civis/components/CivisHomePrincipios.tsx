"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CivisPrincipiosSection } from "@/components/CivisPrincipiosSection";
import { CivisEditPencil } from "@/components/cms/CmsEditFields";
import { useCivisCmsEdit } from "@/components/cms/CivisCmsEditContext";
import { useCivisHomePrincipiosContent } from "@/lib/cms/hooks";

export function CivisHomePrincipios() {
  const edit = useCivisCmsEdit();
  const content = useCivisHomePrincipiosContent();
  const items = content.items ?? [];

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {edit?.ready ? (
          <CivisEditPencil
            label="Editar nuestros principios"
            onClick={() => edit.setSelectedId("__home-principios-section__")}
            className="right-4 top-0 sm:right-6"
          />
        ) : null}
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-na-civisDark">
          {content.eyebrow ?? "Civis"}
        </p>
        <CivisPrincipiosSection
          className="mt-3"
          title={content.title ?? "Nuestros principios"}
          items={items}
        />

        <div className="mt-10 flex flex-col gap-4 border-t border-na-civis/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-na-muted sm:text-base">
            {content.footerLede ??
              "Conoce nuestra propuesta, metodología, clientes y el equipo que facilita los talleres."}
          </p>
          <Link
            href={content.footerLinkHref ?? "/quienes-somos"}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-na-civis px-6 py-3 text-sm font-bold text-white shadow-md shadow-na-civis/25 transition hover:bg-na-civisDark sm:self-auto"
          >
            {content.footerLinkLabel ?? "Ver quiénes somos"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
