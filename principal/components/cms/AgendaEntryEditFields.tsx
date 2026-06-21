"use client";

import { useState } from "react";
import { EditField } from "@/components/cms/CmsEditFields";
import {
  cmsUploadPathExample,
  resolveCmsMediaUrl,
  uploadCmsImage,
} from "@/lib/cms/api-client";
import type { CmsAgendaEntry } from "@/lib/cms/types";

export function AgendaEntryImageField({
  image,
  imageAlt,
  token,
  onChange,
  label = "Foto",
  site = "acropolis",
}: {
  image: string;
  imageAlt: string;
  token: string | null;
  onChange: (patch: { image?: string; imageAlt?: string }) => void;
  label?: string;
  site?: "acropolis" | "civis";
}) {
  const [uploading, setUploading] = useState(false);
  const previewSrc = resolveCmsMediaUrl(image);
  const pathHint = cmsUploadPathExample(site);

  async function handleUpload(file: File) {
    if (!token) return;
    setUploading(true);
    try {
      const url = await uploadCmsImage(site, token, file);
      onChange({ image: url });
    } catch (e) {
      window.alert(String(e));
    } finally {
      setUploading(false);
    }
  }

  return (
    <fieldset className="space-y-2 rounded-lg border border-slate-200 p-3">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <EditField
        label="Ruta de la imagen (URL)"
        value={image}
        onChange={(v) => onChange({ image: v })}
      />
      <p className="text-xs leading-relaxed text-slate-600">
        Al subir un archivo se guarda en el servidor con una ruta como{" "}
        <code className="rounded bg-slate-100 px-1">{pathHint}</code>. También
        puedes pegar aquí una ruta del sitio (ej.{" "}
        <code className="rounded bg-slate-100 px-1">/img/cultura/talleres/coro.webp</code>
        ) o la ruta de una foto ya subida.
      </p>
      <p className="text-xs text-amber-800">
        Recomendado: formato <strong>WebP</strong> — buena calidad con menos peso.
      </p>
      {previewSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewSrc}
          alt={imageAlt || "Vista previa"}
          className="h-28 w-full rounded-lg object-cover"
        />
      ) : image.trim() ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          No se pudo cargar la vista previa. Revisa la ruta o sube de nuevo la
          imagen.
        </p>
      ) : null}
      <label className="block text-sm">
        <span className="font-semibold text-slate-700">Subir foto</span>
        <input
          type="file"
          accept="image/webp,image/*,.webp"
          disabled={!token || uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleUpload(f);
            e.target.value = "";
          }}
          className="mt-1 block w-full text-sm"
        />
      </label>
      {uploading ? <p className="text-xs text-amber-700">Subiendo…</p> : null}
      <EditField
        label="Texto alternativo de la foto"
        value={imageAlt}
        onChange={(v) => onChange({ imageAlt: v })}
      />
    </fieldset>
  );
}

export function AgendaEntryEditFields({
  entry,
  token,
  onChange,
  onDelete,
  showHomeToggle = true,
}: {
  entry: CmsAgendaEntry;
  token: string | null;
  onChange: (patch: Partial<CmsAgendaEntry>) => void;
  onDelete?: () => void;
  showHomeToggle?: boolean;
}) {
  return (
    <div className="space-y-4">
          <EditField
        label="Título"
        value={entry.title}
        onChange={(v) => onChange({ title: v })}
      />
      <EditField
        label="Etiqueta"
        value={entry.tag ?? ""}
        onChange={(v) => onChange({ tag: v })}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <EditField
          label="Fecha de inicio (ISO, YYYY-MM-DD)"
          value={entry.startsAt}
          onChange={(v) => onChange({ startsAt: v })}
        />
        <EditField
          label="Fecha visible en el sitio"
          value={entry.date}
          onChange={(v) => onChange({ date: v })}
        />
      </div>
      <p className="text-xs text-slate-600">
        La fecha ISO ordena y filtra actividades pasadas. La fecha visible es el
        texto que ve el visitante (ej. «Sábado 20 de junio»).
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <EditField
          label="Hora"
          value={entry.time ?? ""}
          onChange={(v) => onChange({ time: v })}
        />
        <EditField
          label="Ubicación / sede"
          value={entry.sede ?? ""}
          onChange={(v) => onChange({ sede: v })}
        />
      </div>
      <EditField
        label="Descripción"
        value={entry.description ?? ""}
        onChange={(v) => onChange({ description: v })}
        multiline
      />
      <EditField
        label="Mensaje WhatsApp"
        value={entry.inscribeMessage ?? ""}
        onChange={(v) => onChange({ inscribeMessage: v })}
        multiline
      />
      <AgendaEntryImageField
        image={entry.image ?? ""}
        imageAlt={entry.imageAlt ?? ""}
        token={token}
        onChange={onChange}
      />
      {showHomeToggle ? (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={entry.showOnHome !== false}
            onChange={(e) => onChange({ showOnHome: e.target.checked })}
          />
          Mostrar en carrusel del home
        </label>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="w-full rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-700"
        >
          Eliminar actividad
        </button>
      ) : null}
    </div>
  );
}
