"use client";

import { InquiryMailForm } from "@/components/InquiryMailForm";
import {
  buildEsferaCollaborateMailto,
  type EsferaCollaborateKind,
} from "@/lib/contact-routing";
import { ESFERA_CC_EMAIL, VOLUNTARIADO_EMAIL } from "@/lib/site-config";

const DELIVERY_NOTE = `Tu mensaje llegará a ${VOLUNTARIADO_EMAIL} con copia a ${ESFERA_CC_EMAIL}.`;

type EsferaCollaborateInquiryProps = {
  kind: EsferaCollaborateKind;
  triggerLabel: string;
  triggerClassName?: string;
};

export function EsferaCollaborateInquiry({
  kind,
  triggerLabel,
  triggerClassName,
}: EsferaCollaborateInquiryProps) {
  const modalTitle = kind === "donar" ? "Quiero donar" : "Proponer alianza";
  const contextLines =
    kind === "donar"
      ? ["Donación para proyectos de Punto Focal Esfera."]
      : ["Alianza institucional con Punto Focal Esfera."];

  return (
    <InquiryMailForm
      triggerLabel={triggerLabel}
      triggerClassName={triggerClassName}
      modalTitle={modalTitle}
      modalIntro={DELIVERY_NOTE}
      contextLines={contextLines}
      buildMailto={(base) => buildEsferaCollaborateMailto(kind, base)}
      deliveryNote={DELIVERY_NOTE}
    />
  );
}
