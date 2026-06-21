"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PhilosophyWheel } from "@/components/home/PhilosophyWheel";
import { useCmsEditMode } from "@/hooks/useCmsEditMode";

const STORAGE_KEY = "na-filosofia-que-es-wheel-v1";

export function FilosofiaQueEsWheelModal() {
  const editMode = useCmsEditMode();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editMode) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => setOpen(true), 500);
    return () => window.clearTimeout(timer);
  }, [editMode]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filosofia-que-es-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-na-ink/55 backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={close}
      />

      <div className="relative z-[1] flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-na-surface shadow-na-card sm:max-h-[90vh] sm:rounded-[1.75rem]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-na-heket/10 bg-gradient-to-r from-na-heket/[0.06] via-na-surface to-na-helios/10 px-5 py-4 sm:px-6">
          <div className="min-w-0 pr-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-na-kefer">
              Filosofía viva
            </p>
            <h2
              id="filosofia-que-es-modal-title"
              className="mt-1 text-balance text-xl font-black text-na-heketDark sm:text-2xl"
            >
              ¿Qué es Filosofía?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-na-muted">
              Para nosotros la filosofía es una forma de vivir: algo a lo que
              dedicamos tiempo y con lo que establecemos relaciones con los demás
              y con el mundo. Gira la rueda para descubrir tu mensaje.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-na-heket/15 bg-white text-na-heket transition hover:bg-na-heket/5"
            aria-label="Cerrar ventana"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
          <PhilosophyWheel bare compact showHeader={false} />
        </div>

        <div className="shrink-0 border-t border-na-heket/10 bg-na-heket/[0.03] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={close}
            className="w-full rounded-full bg-na-heket px-6 py-3 text-sm font-bold text-white shadow-na-soft transition hover:bg-na-heketDark sm:w-auto"
          >
            Explorar la Escuela de Filosofía
          </button>
        </div>
      </div>
    </div>
  );
}
