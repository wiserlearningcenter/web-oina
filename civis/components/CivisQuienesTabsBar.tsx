"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  CIVIS_QUIENES_PAGE_TABS,
  quienesTabFromLocation,
  quienesTabRoute,
  type CivisQuienesTabId,
} from "@/lib/civis-content";

export function CivisQuienesTabsBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = quienesTabFromLocation(pathname, searchParams);

  const selectTab = (id: CivisQuienesTabId) => {
    router.push(quienesTabRoute(id));
  };

  return (
    <div
      role="tablist"
      aria-label="Secciones de Quiénes somos"
      className="flex flex-wrap gap-2 border-b border-na-civis/10 pb-6"
    >
      {CIVIS_QUIENES_PAGE_TABS.map(({ id, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`quienes-panel-${id}`}
            id={`quienes-tab-${id}`}
            onClick={() => selectTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 sm:py-2.5 ${
              isActive
                ? "bg-na-civis text-white shadow-md shadow-na-civis/25"
                : "bg-na-civis/[0.06] text-na-muted ring-1 ring-na-civis/15 hover:bg-na-civis/10 hover:text-na-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
