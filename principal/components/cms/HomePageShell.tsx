"use client";

import { Suspense, type ReactNode } from "react";
import { CmsPageMediaWrap } from "@/components/cms/CmsPageMediaWrap";
import { HomeCmsEditProvider } from "@/components/cms/HomeCmsEditContext";

export function HomePageShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <HomeCmsEditProvider>
        <CmsPageMediaWrap pageId="home">{children}</CmsPageMediaWrap>
      </HomeCmsEditProvider>
    </Suspense>
  );
}
