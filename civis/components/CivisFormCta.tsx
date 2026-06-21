import Link from "next/link";
import { CIVIS_FORM_HREF } from "@/lib/civis-content";

export type CivisFormCtaVariant = "inscribir" | "solicitar" | "contactar";

const LABELS: Record<CivisFormCtaVariant, string> = {
  inscribir: "Inscribirse",
  solicitar: "Solicitar propuesta",
  contactar: "Contactar",
};

type CivisFormCtaProps = {
  variant?: CivisFormCtaVariant;
  className?: string;
};

export function CivisFormCta({
  variant = "solicitar",
  className = "",
}: CivisFormCtaProps) {
  return (
    <Link
      href={CIVIS_FORM_HREF}
      className={`inline-flex items-center justify-center rounded-full bg-na-civis px-6 py-3 text-sm font-bold text-white shadow-md shadow-na-civis/25 transition hover:bg-na-civisDark ${className}`}
    >
      {LABELS[variant]}
    </Link>
  );
}
