"use client";

import { Suspense, type ReactNode } from "react";
import { CmsPageMediaWrap } from "@/components/cms/CmsPageMediaWrap";
import { FilosofiaCmsEditProvider } from "@/components/filosofia/cms/FilosofiaCmsEditContext";
import { FilosofiaQueEsWheelModal } from "@/components/filosofia/FilosofiaQueEsWheelModal";

export function FilosofiaPageShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <FilosofiaCmsEditProvider>
        <CmsPageMediaWrap pageId="filosofia">
          {children}
          <FilosofiaQueEsWheelModal />
        </CmsPageMediaWrap>
      </FilosofiaCmsEditProvider>
    </Suspense>
  );
}
