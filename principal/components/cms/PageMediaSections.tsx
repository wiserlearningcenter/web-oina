"use client";

import Image from "next/image";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { CmsSectionEditBar } from "@/components/cms/CmsEditPencil";
import { usePageMediaCmsEdit, usePageMediaDisplay } from "@/components/cms/PageMediaCmsContext";
import { resolveCmsMediaUrl } from "@/lib/cms/api-client";
import {
  pageMediaCardSelectedId,
  pageMediaSectionSelectedId,
} from "@/lib/cms/page-media";
import type { CmsPageMediaCard, CmsPageMediaTarget } from "@/lib/cms/types";

function PageMediaCard({
  card,
  editing,
  onEdit,
}: {
  card: CmsPageMediaCard;
  editing?: boolean;
  onEdit?: () => void;
}) {
  const src = resolveCmsMediaUrl(card.src) ?? card.src;
  const poster =
    resolveCmsMediaUrl(card.poster) ?? card.poster ?? undefined;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-na-heket/10 bg-na-surface shadow-na-soft">
      {editing ? (
        <button
          type="button"
          onClick={onEdit}
          className="absolute right-3 top-3 z-20 rounded-full bg-na-helios p-2 text-na-ink shadow"
          aria-label="Editar tarjeta"
        >
          <Pencil className="h-3 w-3" />
        </button>
      ) : null}
      <div className="relative aspect-[4/3] bg-na-heket/5">
        {card.kind === "video" && src ? (
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        ) : src ? (
          <Image
            src={src}
            alt={card.alt || card.title || "Imagen"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm font-semibold text-amber-800">
            {editing ? "Sin archivo — clic en lápiz" : null}
          </div>
        )}
      </div>
      {(card.title || card.caption || card.linkHref) && (
        <div className="space-y-2 p-4">
          {card.title ? (
            <h3 className="text-base font-bold text-na-heketDark">{card.title}</h3>
          ) : null}
          {card.caption ? (
            <p className="text-sm leading-relaxed text-na-muted">{card.caption}</p>
          ) : null}
          {card.linkHref ? (
            <a
              href={card.linkHref}
              className="inline-flex items-center gap-1 text-sm font-semibold text-na-kefer hover:underline"
              target={card.linkHref.startsWith("http") ? "_blank" : undefined}
              rel={
                card.linkHref.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {card.linkLabel ?? "Ver más"}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      )}
    </article>
  );
}

export function PageMediaSections({ pageId }: { pageId: CmsPageMediaTarget }) {
  const edit = usePageMediaCmsEdit();
  const published = usePageMediaDisplay(pageId);
  const sections =
    edit?.ready && edit.pageId === pageId ? edit.sections : published;
  const editing = !!(edit?.ready && edit.pageId === pageId);

  if (sections.length === 0 && !editing) return null;

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          className="relative border-t border-na-heket/10 bg-na-surface py-14 sm:py-16"
        >
          {editing ? (
            <div className="absolute right-4 top-4 z-10 flex flex-wrap justify-end gap-2 sm:right-6">
              <CmsSectionEditBar
                label="Editar sección"
                onClick={() =>
                  edit?.setSelectedId(pageMediaSectionSelectedId(section.id))
                }
              />
            </div>
          ) : null}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {section.eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-na-kefer">
                {section.eyebrow}
              </p>
            ) : null}
            {section.title ? (
              <h2 className="mt-2 text-2xl font-black text-na-heketDark sm:text-3xl">
                {section.title}
              </h2>
            ) : null}
            {section.intro ? (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-na-muted sm:text-base">
                {section.intro}
              </p>
            ) : null}
            {section.cards.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.cards.map((card) => (
                  <PageMediaCard
                    key={card.id}
                    card={card}
                    editing={editing}
                    onEdit={() =>
                      edit?.setSelectedId(
                        pageMediaCardSelectedId(section.id, card.id),
                      )
                    }
                  />
                ))}
              </div>
            ) : editing ? (
              <p className="mt-8 text-sm font-semibold text-amber-800">
                Sin tarjetas — agregue fotos o videos desde el editor.
              </p>
            ) : null}
          </div>
        </section>
      ))}

      {editing ? (
        <div className="border-t border-dashed border-amber-300 bg-amber-50/50 py-6">
          <div className="mx-auto flex max-w-6xl justify-center px-4">
            <button
              type="button"
              onClick={() => {
                const id = edit?.addSection();
                if (id) {
                  edit?.setSelectedId(pageMediaSectionSelectedId(id));
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-white px-4 py-2 text-sm font-bold text-amber-950 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Agregar sección con fotos o videos
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
