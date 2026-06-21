"use client";

import { Suspense, type ReactNode } from "react";
import { SalonesCmsEditProvider } from "@/components/cms/SalonesCmsEditContext";

/** Activa el CMS de salones solo en `/salones` (modo `?cmsEdit=1`). */
export function SalonesPageShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SalonesCmsEditProvider>{children}</SalonesCmsEditProvider>
    </Suspense>
  );
}
