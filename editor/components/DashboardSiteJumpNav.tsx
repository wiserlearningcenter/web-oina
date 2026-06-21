"use client";

import {
  DASHBOARD_SITES,
  dashboardSiteAnchor,
  type DashboardSiteKey,
} from "@/lib/dashboard-sites";

function scrollToSite(id: DashboardSiteKey) {
  const el = document.getElementById(dashboardSiteAnchor(id));
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DashboardSiteJumpNav() {
  return (
    <nav
      aria-label="Ir a un sitio"
      className="mt-4 flex flex-wrap gap-2 sm:gap-3"
    >
      {DASHBOARD_SITES.map((site) => (
        <button
          key={site.id}
          type="button"
          onClick={() => scrollToSite(site.id)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${site.buttonClass}`}
        >
          {site.label}
        </button>
      ))}
    </nav>
  );
}
