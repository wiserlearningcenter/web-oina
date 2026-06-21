"use client";

import { ArrowRight } from "lucide-react";
import { InquiryMailForm } from "@/components/InquiryMailForm";
import { accentTokens } from "@/lib/brand-accents";
import { buildCourseInfoMailto } from "@/lib/contact-routing";
import type { InscribeActivity } from "@/lib/whatsapp-messages";

type Props = InscribeActivity & {
  accentIndex?: number;
  label?: string;
  className?: string;
};

const KIND_LABEL: Record<NonNullable<InscribeActivity["kind"]>, string> = {
  curso: "Curso",
  taller: "Taller",
  actividad: "Actividad",
  conferencia: "Conferencia",
};

/** Abre formulario con el curso/taller preseleccionado → cursos.oinadom@acropolis.org */
export function CourseInscribeButton({
  title,
  kind = "curso",
  sede,
  facilitador,
  accentIndex = 0,
  label = "Solicitar info",
  className = "",
}: Props) {
  const a = accentTokens(accentIndex);
  const contextLines = [
    `«${title}»`,
    `Tipo: ${KIND_LABEL[kind]}`,
    ...(sede ? [`Sede: ${sede}`] : []),
    ...(facilitador ? [`Facilitador: ${facilitador}`] : []),
  ];

  return (
    <InquiryMailForm
      triggerLabel={label}
      triggerIcon={<ArrowRight className="h-3.5 w-3.5" aria-hidden />}
      triggerIconAfter
      triggerClassName={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm transition hover:brightness-105 ${a.badge} ${className}`}
      modalTitle="Solicitar información"
      modalIntro="Completa tus datos y enviaremos tu consulta al equipo de cursos y talleres."
      contextLines={contextLines}
      buildMailto={(base) =>
        buildCourseInfoMailto({
          ...base,
          curso: title,
          kind: KIND_LABEL[kind],
          sede,
          facilitador,
        })
      }
    />
  );
}
