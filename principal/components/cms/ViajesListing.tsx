"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Pencil, Plus } from "lucide-react";
import {
  getViajesByCategoria,
  viajeDestinoHref,
  type ViajeCategoriaSlug,
  type ViajeDestino,
} from "@/lib/viajes";
import { useMergedViajes } from "@/lib/cms/hooks";
import { resolveCmsMediaUrl } from "@/lib/cms/api-client";
import { isCmsEnabled } from "@/lib/cms/provider";
import { LeaveSiteLink } from "@/components/LeaveSiteLink";
import { ContentCardImage } from "@/components/ContentCardMedia";
import { useViajesCmsEdit } from "@/components/cms/ViajesCmsEditContext";

function resolveImage(src: string) {
  return resolveCmsMediaUrl(src) ?? src;
}

function cardHref(d: ViajeDestino): string | null {
  if (d.soloEnlace && d.link) return d.link;
  if (!d.soloEnlace) return viajeDestinoHref(d.categoria, d.slug);
  if (d.link) return d.link;
  return null;
}

export function ViajesListing({ categoria }: { categoria: ViajeCategoriaSlug }) {
  const edit = useViajesCmsEdit();
  const merged = useMergedViajes(categoria);
  const fallback = getViajesByCategoria(categoria);

  const list: ViajeDestino[] = edit?.ready
    ? edit.items
        .filter((v) => v.categoria === categoria)
        .map((v) => ({
          ...v,
          image: {
            ...v.image,
            src: resolveImage(v.image.src),
          },
        }))
    : isCmsEnabled()
      ? merged
      : fallback;

  function openEdit(key: string) {
    edit?.setSelectedKey(key);
  }

  const baseClass =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-na-heket/10 bg-na-surface shadow-na-soft transition hover:-translate-y-1 hover:shadow-na-card";

  return (
    <>
      {edit?.ready ? (
        <button
          type="button"
          onClick={() => edit.addItem()}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-na-helios px-4 py-2 text-xs font-bold uppercase text-na-ink shadow"
        >
          <Plus className="h-4 w-4" />
          Añadir próximo destino
        </button>
      ) : null}

      <ul className="grid gap-7 sm:grid-cols-2">
        {list.map((d) => {
          const destKey = `${d.categoria}/${d.slug}`;
          const href = cardHref(d);

          const inner = (
            <>
              <ContentCardImage
                src={d.image.src || undefined}
                alt={d.image.alt}
                imageClassName="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              >
                {d.proximaFecha ? (
                  <span className="absolute left-3 top-3 inline-flex max-w-[85%] items-center gap-1 rounded-full bg-na-kefer px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                    <CalendarDays className="h-3 w-3 shrink-0" />
                    {d.proximaFecha}
                  </span>
                ) : d.duration ? (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-na-heketDark backdrop-blur">
                    {d.duration}
                  </span>
                ) : null}
              </ContentCardImage>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-na-muted">
                  <MapPin className="h-3.5 w-3.5 text-na-kefer" />
                  {d.location || "Ubicación por confirmar"}
                </span>
                <h2 className="mt-2 text-xl font-black leading-snug text-na-heketDark">
                  {d.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-na-muted">
                  {d.excerpt}
                </p>
                {href && !edit?.ready ? (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-na-kefer transition group-hover:gap-2.5">
                    {d.soloEnlace ? "Más información" : "Ver detalle"}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                ) : null}
              </div>
            </>
          );

          return (
            <li key={destKey}>
              {edit?.ready ? (
                <button
                  type="button"
                  onClick={() => openEdit(destKey)}
                  className={`${baseClass} text-left ring-amber-400/60 hover:ring-2`}
                >
                  <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow">
                    <Pencil className="h-4 w-4" aria-hidden />
                  </span>
                  {inner}
                </button>
              ) : href ? (
                d.soloEnlace ? (
                  <LeaveSiteLink href={href} className={baseClass}>
                    {inner}
                  </LeaveSiteLink>
                ) : (
                  <Link href={href} className={baseClass}>
                    {inner}
                  </Link>
                )
              ) : (
                <div className={baseClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
