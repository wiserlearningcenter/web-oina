"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchUploadInventory,
  type UploadInventory,
  type UploadInventoryFile,
} from "@/lib/api";
import { getToken } from "@/lib/auth-storage";
import type { SiteId } from "@/lib/content-types";

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function FileRow({ file }: { file: UploadInventoryFile }) {
  return (
    <tr className={file.inUse ? "" : "bg-amber-50/80"}>
      <td className="px-3 py-2 font-mono text-xs">{file.filename}</td>
      <td className="px-3 py-2">
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
            file.inUse
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-200 text-amber-950"
          }`}
        >
          {file.inUse ? "En uso" : "Sin uso"}
        </span>
      </td>
      <td className="px-3 py-2 text-xs text-slate-600">
        {formatBytes(file.sizeBytes)}
      </td>
      <td className="px-3 py-2 font-mono text-[11px] text-slate-500">
        {file.relativePath}
      </td>
    </tr>
  );
}

export function UploadInventoryTab({ site }: { site: SiteId }) {
  const [inventory, setInventory] = useState<UploadInventory | null>(null);
  const [status, setStatus] = useState("Cargando inventario…");
  const [filter, setFilter] = useState<"all" | "orphan" | "in_use">("all");

  const load = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setStatus("Inicia sesión de nuevo.");
      return;
    }
    setStatus("Cargando…");
    try {
      const data = await fetchUploadInventory(site, token);
      setInventory(data);
      setStatus("");
    } catch (e) {
      setStatus(String(e));
    }
  }, [site]);

  useEffect(() => {
    void load();
  }, [load]);

  const files =
    inventory?.files.filter((f) => {
      if (filter === "orphan") return !f.inUse;
      if (filter === "in_use") return f.inUse;
      return true;
    }) ?? [];

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
        <p>
          Aquí ves todas las fotos subidas al CMS y si el borrador o la versión
          publicada las referencian. Las marcadas <strong>Sin uso</strong> son
          candidatas a borrar en cPanel para liberar espacio.
        </p>
        {inventory ? (
          <p className="mt-2 font-mono text-xs">
            Carpeta en servidor:{" "}
            <strong>editor/data/{site}/uploads/</strong>
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 ${filter === "all" ? "bg-slate-800 text-white" : "border"}`}
          >
            Todas ({inventory?.files.length ?? 0})
          </button>
          <button
            type="button"
            onClick={() => setFilter("in_use")}
            className={`rounded-lg px-3 py-1.5 ${filter === "in_use" ? "bg-emerald-700 text-white" : "border"}`}
          >
            En uso ({inventory?.referencedCount ?? 0})
          </button>
          <button
            type="button"
            onClick={() => setFilter("orphan")}
            className={`rounded-lg px-3 py-1.5 ${filter === "orphan" ? "bg-amber-600 text-white" : "border"}`}
          >
            Sin uso ({inventory?.orphanCount ?? 0})
          </button>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
        >
          Actualizar
        </button>
      </div>

      {status ? <p className="text-sm text-slate-600">{status}</p> : null}

      {inventory && inventory.orphanCount > 0 ? (
        <p className="text-sm text-amber-900">
          Hay <strong>{inventory.orphanCount}</strong> archivo(s) sin referencia.
          Tras publicar un borrador que ya no use una foto, puedes eliminarla en
          cPanel dentro de{" "}
          <code className="rounded bg-amber-100 px-1">
            editor/data/{site}/uploads/
          </code>
          .
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Archivo</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Tamaño</th>
              <th className="px-3 py-2">Ruta relativa (cPanel)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {files.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                  No hay archivos en esta categoría.
                </td>
              </tr>
            ) : (
              files.map((f) => <FileRow key={f.filename} file={f} />)
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
