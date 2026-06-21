"use client";

import { WorldMapWithLogo } from "@/components/WorldMapWithLogo";
import { BRAND_NA_MAP_MONOGRAM } from "@/lib/brand-assets";
import { DIPLOMADO_SCHOOL_MARKERS } from "@/lib/diplomado-school-markers";

function uniqueMarkers(): [number, number][] {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  for (const [lat, lon] of DIPLOMADO_SCHOOL_MARKERS) {
    const key = `${lat.toFixed(1)},${lon.toFixed(1)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push([lat, lon]);
  }
  return out;
}

const MARKERS = uniqueMarkers();

export function SpinningGlobe() {
  return (
    <WorldMapWithLogo
      className="diplomado-world-map mx-auto mt-6 w-full max-w-[360px] lg:max-w-[400px]"
      markers={MARKERS}
      logo={
        // img nativo: evita recorte del wrapper de next/image con lockups horizontales.
        <img
          src={BRAND_NA_MAP_MONOGRAM.webpWhite}
          alt={BRAND_NA_MAP_MONOGRAM.alt}
          width={BRAND_NA_MAP_MONOGRAM.width}
          height={BRAND_NA_MAP_MONOGRAM.height}
          decoding="async"
          className="diplomado-world-map__logo block h-[3rem] w-auto max-w-[62%] object-contain object-center sm:h-[3.35rem]"
        />
      }
    />
  );
}
