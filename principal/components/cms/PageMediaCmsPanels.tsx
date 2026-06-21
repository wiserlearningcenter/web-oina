"use client";

import { useState } from "react";
import {
  EditField,
  EditPanelChrome,
} from "@/components/cms/CmsEditFields";
import { AgendaEntryImageField } from "@/components/cms/AgendaEntryEditFields";
import { resolveCmsMediaUrl, uploadCmsImage } from "@/lib/cms/api-client";
import {
  PAGE_MEDIA_SECTION_ID,
  parsePageMediaCardSelectedId,
  parsePageMediaSectionSelectedId,
} from "@/lib/cms/page-media";
import type {
  CmsPageMediaCard,
  CmsPageMediaSection,
} from "@/lib/cms/types";

type Props = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  sections: CmsPageMediaSection[];
  patchSection: (id: string, patch: Partial<CmsPageMediaSection>) => void;
  patchCard: (
    sectionId: string,
    cardId: string,
    patch: Partial<CmsPageMediaCard>,
  ) => void;
  addSection: () => string;
  addCard: (sectionId: string) => string;
  deleteSection: (id: string) => void;
  deleteCard: (sectionId: string, cardId: string) => void;
  dirty: boolean;
  busy: boolean;
  status: string;
  onSave: () => void;
  token: string | null;
};

function MediaUploadField({
  label,
  href,
  token,
  onChange,
  accept = "application/pdf,.pdf",
  uploadLabel = "Subir archivo",
}: {
  label: string;
  href: string;
  token: string | null;
  onChange: (href: string) => void;
  accept?: string;
  uploadLabel?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFile(file: File | null) {
    if (!file || !token) return;
    setUploading(true);
    try {
      const url = await uploadCmsImage("acropolis", token, file);
      onChange(url);
    } finally {
      setUploading(false);
    }
  }

  const resolved = resolveCmsMediaUrl(href) ?? href;

  return (
    <div className="space-y-2">
      <EditField
        label={`${label} (URL)`}
        value={href}
        onChange={onChange}
      />
      <label className="block text-xs font-semibold text-slate-600">
        {uploadLabel}
        <input
          type="file"
          accept={accept}
          disabled={!token || uploading}
          onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
          className="mt-1 block w-full text-sm"
        />
      </label>
      {uploading ? (
        <p className="text-xs text-slate-500">Subiendo…</p>
      ) : resolved ? (
        <a
          href={resolved}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-na-kefer hover:underline"
        >
          Ver archivo actual
        </a>
      ) : null}
    </div>
  );
}

export function PageMediaCmsPanels({
  selectedId,
  setSelectedId,
  sections,
  patchSection,
  patchCard,
  addSection,
  addCard,
  deleteSection,
  deleteCard,
  dirty,
  busy,
  status,
  onSave,
  token,
}: Props) {
  const sectionId = parsePageMediaSectionSelectedId(selectedId);
  const section = sectionId
    ? sections.find((s) => s.id === sectionId)
    : undefined;
  const cardRef = parsePageMediaCardSelectedId(selectedId);
  const cardSection = cardRef
    ? sections.find((s) => s.id === cardRef.sectionId)
    : undefined;
  const card = cardRef
    ? cardSection?.cards.find((c) => c.id === cardRef.cardId)
    : undefined;

  return (
    <>
      {selectedId === PAGE_MEDIA_SECTION_ID ? (
        <EditPanelChrome
          title="Secciones de fotos y videos"
          dirty={dirty}
          busy={busy}
          status={status}
          onClose={() => setSelectedId(null)}
          onSave={onSave}
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Agregue bloques con tarjetas de imagen o video a esta página. Use el
              botón «Agregar sección» al final de la vista previa.
            </p>
            <button
              type="button"
              onClick={() => {
                const id = addSection();
                setSelectedId(`page-media-section:${id}`);
              }}
              className="w-full rounded-lg border border-amber-300 bg-amber-50 py-2 text-sm font-semibold text-amber-950"
            >
              Nueva sección
            </button>
          </div>
        </EditPanelChrome>
      ) : null}

      {section ? (
        <EditPanelChrome
          title="Sección — fotos y videos"
          dirty={dirty}
          busy={busy}
          status={status}
          onClose={() => setSelectedId(null)}
          onSave={onSave}
        >
          <div className="space-y-4">
            <EditField
              label="Etiqueta superior"
              value={section.eyebrow ?? ""}
              onChange={(v) => patchSection(section.id, { eyebrow: v })}
            />
            <EditField
              label="Título"
              value={section.title ?? ""}
              onChange={(v) => patchSection(section.id, { title: v })}
            />
            <EditField
              label="Introducción"
              value={section.intro ?? ""}
              onChange={(v) => patchSection(section.id, { intro: v })}
              multiline
            />
            <button
              type="button"
              onClick={() => {
                const cardId = addCard(section.id);
                setSelectedId(`page-media-card:${section.id}:${cardId}`);
              }}
              className="w-full rounded-lg border border-na-heket/20 py-2 text-sm font-semibold text-na-heketDark"
            >
              Agregar tarjeta (foto o video)
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("¿Eliminar esta sección y todas sus tarjetas?")) {
                  deleteSection(section.id);
                  setSelectedId(null);
                }
              }}
              className="w-full rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-700"
            >
              Eliminar sección
            </button>
          </div>
        </EditPanelChrome>
      ) : null}

      {card && cardRef ? (
        <EditPanelChrome
          title="Tarjeta — foto o video"
          dirty={dirty}
          busy={busy}
          status={status}
          onClose={() => setSelectedId(null)}
          onSave={onSave}
        >
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-slate-600">
              Tipo
              <select
                value={card.kind}
                onChange={(e) =>
                  patchCard(cardRef.sectionId, card.id, {
                    kind: e.target.value as "image" | "video",
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="image">Imagen</option>
                <option value="video">Video</option>
              </select>
            </label>
            {card.kind === "image" ? (
              <AgendaEntryImageField
                label="Imagen"
                site="acropolis"
                image={card.src}
                imageAlt={card.alt}
                token={token}
                onChange={(patch) =>
                  patchCard(cardRef.sectionId, card.id, {
                    ...(patch.image !== undefined ? { src: patch.image } : {}),
                    ...(patch.imageAlt !== undefined ? { alt: patch.imageAlt } : {}),
                  })
                }
              />
            ) : (
              <>
                <MediaUploadField
                  label="Archivo de video (URL)"
                  href={card.src}
                  token={token}
                  onChange={(v) => patchCard(cardRef.sectionId, card.id, { src: v })}
                  accept="video/*,.mp4,.webm,.mov"
                  uploadLabel="Subir video"
                />
                <AgendaEntryImageField
                  label="Poster (opcional)"
                  site="acropolis"
                  image={card.poster ?? ""}
                  imageAlt={card.alt}
                  token={token}
                  onChange={(patch) =>
                    patchCard(cardRef.sectionId, card.id, {
                      ...(patch.image !== undefined ? { poster: patch.image } : {}),
                      ...(patch.imageAlt !== undefined ? { alt: patch.imageAlt } : {}),
                    })
                  }
                />
              </>
            )}
            <EditField
              label="Título (opcional)"
              value={card.title ?? ""}
              onChange={(v) => patchCard(cardRef.sectionId, card.id, { title: v })}
            />
            <EditField
              label="Texto / pie (opcional)"
              value={card.caption ?? ""}
              onChange={(v) => patchCard(cardRef.sectionId, card.id, { caption: v })}
              multiline
            />
            <EditField
              label="Enlace (opcional)"
              value={card.linkHref ?? ""}
              onChange={(v) =>
                patchCard(cardRef.sectionId, card.id, { linkHref: v })
              }
            />
            <EditField
              label="Texto del enlace"
              value={card.linkLabel ?? ""}
              onChange={(v) =>
                patchCard(cardRef.sectionId, card.id, { linkLabel: v })
              }
            />
            <button
              type="button"
              onClick={() => {
                if (window.confirm("¿Quitar esta tarjeta?")) {
                  deleteCard(cardRef.sectionId, card.id);
                  setSelectedId(
                    `page-media-section:${cardRef.sectionId}`,
                  );
                }
              }}
              className="w-full rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-700"
            >
              Quitar tarjeta
            </button>
          </div>
        </EditPanelChrome>
      ) : null}
    </>
  );
}

export { MediaUploadField as BrochurePdfField };
