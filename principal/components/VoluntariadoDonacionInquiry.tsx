"use client";

import { ArrowRight } from "lucide-react";
import { InquiryMailForm } from "@/components/InquiryMailForm";
import { buildVoluntariadoDonacionMailto } from "@/lib/contact-routing";
import { VOLUNTARIADO_EMAIL } from "@/lib/site-config";

const DELIVERY_NOTE = `Tu mensaje llegará a ${VOLUNTARIADO_EMAIL}.`;

type VoluntariadoDonacionInquiryProps = {
  triggerLabel: string;
  triggerClassName?: string;
};

export function VoluntariadoDonacionInquiry({
  triggerLabel,
  triggerClassName = "mt-5 inline-flex items-center gap-2 rounded-full bg-na-amon px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-na-amon/25 transition hover:brightness-105",
}: VoluntariadoDonacionInquiryProps) {
  return (
    <InquiryMailForm
      triggerLabel={triggerLabel}
      triggerClassName={triggerClassName}
      triggerIcon={<ArrowRight className="h-4 w-4" />}
      triggerIconAfter
      modalTitle="Quiero donar"
      modalIntro={DELIVERY_NOTE}
      contextLines={[
        "Donación para proyectos de ecología, apoyo social y formación humanitaria.",
      ]}
      defaultMensaje="Indique monto, forma de aporte o cualquier detalle que debamos conocer (opcional)."
      buildMailto={buildVoluntariadoDonacionMailto}
      deliveryNote={DELIVERY_NOTE}
    />
  );
}
