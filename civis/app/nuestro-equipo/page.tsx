import type { Metadata } from "next";
import { Suspense } from "react";

import { CivisNuestroEquipoSection } from "@/components/CivisQuienesSomos";
import { CivisFooter } from "@/components/CivisFooter";
import { CIVIS_NUESTRO_EQUIPO_PATH } from "@/lib/civis-content";

export const metadata: Metadata = {
  title: "Nuestro equipo",
  alternates: { canonical: CIVIS_NUESTRO_EQUIPO_PATH },
};

export default function NuestroEquipoPage() {
  return (
    <>
      <Suspense fallback={null}>
        <CivisNuestroEquipoSection />
      </Suspense>
      <CivisFooter />
    </>
  );
}
