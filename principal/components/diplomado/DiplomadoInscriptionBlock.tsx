"use client";

import { ArrowRight, Pencil } from "lucide-react";
import { DiplomadoInscriptionSchedule } from "@/components/diplomado/DiplomadoInscriptionSchedule";
import { useDiplomadoInscriptionDisplay } from "@/lib/cms/diplomado-display";
import { useFilosofiaCmsEdit } from "@/components/filosofia/cms/FilosofiaCmsEditContext";
import { DIPLOMADO_WHATSAPP_URL } from "@/lib/site-config";

export function DiplomadoInscriptionBlock() {
  const edit = useFilosofiaCmsEdit();
  const ins = useDiplomadoInscriptionDisplay();
  const inscribeHref = `${DIPLOMADO_WHATSAPP_URL}?text=${encodeURIComponent(
    ins.inscribeWhatsApp ?? "",
  )}`;

  return (
    <section
      id="inscripcion"
      className="relative scroll-mt-20 bg-white px-4 py-10 text-[var(--dip-ink)] lg:px-8 lg:py-14"
    >
      {edit?.ready ? (
        <button
          type="button"
          onClick={() => edit.setActiveSection("inscripcion")}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-bold uppercase text-white shadow lg:right-8"
        >
          <Pencil className="h-3.5 w-3.5" />
          Editar inscripción
        </button>
      ) : null}

      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--dip-teal)]">
        {ins.eyebrow}
      </p>
      <h2 className="mt-2 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight">
        {ins.title}
      </h2>
      <p className="mt-3 text-[17px] font-normal leading-relaxed text-[#262d38]">
        {ins.intro}
      </p>

      <div className="diplomado-inscribe-card mt-8 overflow-hidden rounded-2xl p-5 text-white shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--dip-gold)]">
          Inscripción
        </p>
        <p className="mt-3 text-[2rem] font-bold text-[var(--dip-gold)]">
          {ins.feeMain}
        </p>
        <div className="my-3 h-px bg-white/15" />
        <p className="text-sm">{ins.feeNote}</p>
        <p className="mt-3 text-sm text-white/90">{ins.paymentNote}</p>
        <p className="mt-4 text-sm text-[#b2d8d1]">
          {ins.accountLabel}{" "}
          <span className="text-[#7ec8ff] underline">{ins.account}</span>
        </p>
        <p className="mt-1 text-sm text-[#b2d8d1]">
          {ins.rncLabel}{" "}
          <span className="text-[#7ec8ff] underline">{ins.rnc}</span>
        </p>
        <a
          href={`mailto:${ins.email}`}
          className="mt-3 block text-sm text-[#b2d8d1] underline-offset-2 hover:underline"
        >
          {ins.email}
        </a>
      </div>

      <DiplomadoInscriptionSchedule />

      <div className="mt-5 flex gap-3">
        <span className="diplomado-quote-line" aria-hidden />
        <p className="text-xs font-normal leading-relaxed text-[var(--dip-muted)]">
          {ins.footnote}
        </p>
      </div>

      <a
        href={inscribeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-6 flex w-full max-w-[300px] items-center justify-center gap-2 rounded-full bg-[var(--dip-gold)] px-6 py-3.5 text-sm font-bold text-[#1a1a18]"
      >
        Quiero inscribirme
        <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  );
}
