import { Suspense } from "react";

import { CivisQuienesSomos } from "@/components/CivisQuienesSomos";
import { CivisFooter } from "@/components/CivisFooter";

export default function QuienesSomosPage() {
  return (
    <>
      <Suspense fallback={null}>
        <CivisQuienesSomos />
      </Suspense>
      <CivisFooter />
    </>
  );
}
