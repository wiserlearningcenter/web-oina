"use client";

import { Suspense, type ReactNode } from "react";
import { VenuesCmsEditProvider } from "@/components/cms/VenuesCmsEditContext";

export function VenuesPageShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <VenuesCmsEditProvider>{children}</VenuesCmsEditProvider>
    </Suspense>
  );
}
