"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";
import { OfertaFormativaItem } from "@/components/OfertaFormativaItem";
import {
  AGENDA_CATEGORY_LABEL,
  type AgendaEntry,
} from "@/lib/agenda";
import { agendaInscribeHref } from "@/lib/whatsapp-messages";

type Props = {
  items: AgendaEntry[];
  /** ms entre slides */
  intervalMs?: number;
  editMode?: {
    onEditItem: (id: string) => void;
    onAddItem: () => void;
  };
};

function inscribeHref(item: AgendaEntry) {
  return agendaInscribeHref(item);
}

function defaultDetail(item: AgendaEntry) {
  if (item.detailHref && item.detailLabel) {
    return { href: item.detailHref, label: item.detailLabel };
  }
  switch (item.category) {
    case "diplomado":
      return { href: "/filosofia", label: "Ver programa completo" };
    case "conferencia":
    case "curso":
    case "taller":
      return { href: "/cursos", label: "Ver cursos y conferencias" };
    case "cultura":
      return { href: "/cultura", label: "Ver cultura" };
    default:
      return { href: "/cursos", label: "Más información" };
  }
}

function inscribeLabel(item: AgendaEntry) {
  if (item.category === "conferencia" && item.tag?.toLowerCase().includes("gratuita")) {
    return "Quiero asistir";
  }
  return "Quiero inscribirme";
}

export function UpcomingActivitiesCarousel({
  items,
  intervalMs = 7000,
  editMode,
}: Props) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const n = items.length;
  const current = items[index];

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduceMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    );
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [n]);

  useEffect(() => {
    if (n <= 1 || reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), intervalMs);
    return () => clearInterval(t);
  }, [n, intervalMs, reduceMotion]);

  if (!current && !editMode) return null;

  const whatsapp = current ? inscribeHref(current) : null;
  const detail = current ? defaultDetail(current) : null;
  const categoryLabel = current ? AGENDA_CATEGORY_LABEL[current.category] : "";

  return (
    <section
      id="home-carrusel"
      className="scroll-mt-24 border-t border-na-heket/10 bg-gradient-to-br from-na-heket/[0.06] via-na-surface to-na-kefer/[0.08] py-10 sm:py-11"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-na-kefer">
              Agenda
            </p>
            <h2 className="mt-2 text-balance text-xl font-black text-na-heketDark sm:text-2xl">
              Próximas actividades
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-na-muted">
              Diplomados, talleres y conferencias culturales con fecha confirmada.
            </p>
          </div>
          <Link
            href="/filosofia"
            className="inline-flex items-center gap-2 text-sm font-bold text-na-heket transition hover:text-na-kefer"
          >
            Ver toda la agenda
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {editMode ? (
            <button
              type="button"
              onClick={editMode.onAddItem}
              className="inline-flex items-center gap-2 rounded-full bg-na-helios px-4 py-2 text-xs font-bold uppercase text-na-ink shadow"
            >
              <Plus className="h-4 w-4" />
              Añadir al carrusel
            </button>
          ) : null}
        </div>

        {current ? (
        <div className="relative mt-5">
          <article className="overflow-hidden rounded-xl border border-na-heket/12 bg-white shadow-na-card">
            {editMode ? (
              <button
                type="button"
                onClick={() => editMode.onEditItem(current.id)}
                className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-na-helios px-3 py-1.5 text-[10px] font-bold uppercase text-na-ink shadow"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </button>
            ) : null}
            <div className="grid lg:grid-cols-[1fr_1.05fr]">
              <div className="relative aspect-[16/10] bg-na-heket/5 lg:aspect-auto lg:min-h-[220px]">
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === index ? 1 : 0 }}
                    aria-hidden={i !== index}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        unoptimized
                      />
                    ) : null}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-na-heketDark/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10"
                      aria-hidden
                    />
                  </div>
                ))}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-na-heketDark shadow-sm">
                    {categoryLabel}
                  </span>
                  {current.tag ? (
                    <span className="rounded-full bg-na-helios px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-na-ink shadow-sm">
                      {current.tag}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col p-5 sm:p-6 lg:min-h-[220px]">
                <div className="flex-1 transition-opacity duration-500">
                  <OfertaFormativaItem
                    variant="summary"
                    title={current.title}
                    intro={current.description ?? ""}
                    meta={
                      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-na-muted">
                        <div className="inline-flex items-center gap-1.5">
                          <CalendarDays
                            className="h-4 w-4 text-na-kefer"
                            aria-hidden
                          />
                          <dt className="sr-only">Fecha</dt>
                          <dd className="font-semibold text-na-heketDark">
                            {current.date}
                          </dd>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <Clock
                            className="h-4 w-4 text-na-kefer"
                            aria-hidden
                          />
                          <dt className="sr-only">Hora</dt>
                          <dd>{current.time}</dd>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <MapPin
                            className="h-4 w-4 text-na-kefer"
                            aria-hidden
                          />
                          <dt className="sr-only">Sede</dt>
                          <dd>{current.sede}</dd>
                        </div>
                      </dl>
                    }
                    titleClassName="text-lg sm:text-xl"
                    introClassName="mt-2 line-clamp-2 sm:line-clamp-3"
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {whatsapp ? (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-na-heket px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-na-heket/20 transition hover:bg-na-kefer"
                    >
                      {inscribeLabel(current)}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  ) : null}
                  {detail ? (
                  <Link
                    href={detail.href}
                    className="inline-flex items-center gap-2 rounded-full border border-na-heket/25 px-5 py-2.5 text-sm font-semibold text-na-heket transition hover:bg-na-heket/5"
                  >
                    {detail.label}
                  </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </article>

          {n > 1 ? (
            <>
              <div className="mt-5 flex items-center justify-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index
                        ? "w-8 bg-na-heket"
                        : "w-2.5 bg-na-heket/25 hover:bg-na-heket/45"
                    }`}
                    aria-label={`Ver: ${item.title}, ${item.date}`}
                    aria-current={i === index ? "true" : undefined}
                  />
                ))}
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 lg:flex">
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + n) % n)}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-na-heket/15 bg-white/95 text-na-heket shadow-na-soft transition hover:bg-white"
                  aria-label="Actividad anterior"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % n)}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-na-heket/15 bg-white/95 text-na-heket shadow-na-soft transition hover:bg-white"
                  aria-label="Siguiente actividad"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </>
          ) : null}
        </div>
        ) : editMode ? (
          <div className="mt-5 rounded-xl border border-dashed border-amber-300 bg-amber-50/80 px-6 py-10 text-center">
            <p className="text-sm text-amber-950">
              No hay actividades en el carrusel. Pulsa{" "}
              <strong>Añadir al carrusel</strong> para crear la primera.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
