"use client";

import { useCmsDocument } from "@/lib/cms/provider";
import { useHeroCarouselCmsEdit } from "@/components/cms/HeroCarouselCmsEditContext";
import {
  getHeroSlidesForKey,
  toHeroImage,
  type CmsHeroCarouselKey,
} from "@/lib/cms/hero-carousel-edit";
import type { HeroImage } from "@/lib/hero-images";

/** Imágenes del carrusel hero: CMS publicado o borrador en edición. */
export function useHeroCarouselImages(
  key: CmsHeroCarouselKey,
  fallback?: HeroImage[],
): HeroImage[] {
  const cms = useCmsDocument();
  const edit = useHeroCarouselCmsEdit();

  if (edit?.ready) {
    return getHeroSlidesForKey(edit.carousels, key)
      .map(toHeroImage)
      .filter((img): img is HeroImage => img !== null);
  }

  const fromCms = cms?.sections.heroCarousels?.[key];
  if (fromCms?.length) {
    return fromCms
      .map(toHeroImage)
      .filter((img): img is HeroImage => img !== null);
  }
  return fallback ?? [];
}
