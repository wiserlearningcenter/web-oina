import type { HeroImage } from "@/lib/hero-images";
import { resolveCmsMediaUrl } from "@/lib/cms/api-client";
import { CIVIS_HERO_IMAGES } from "@/lib/hero-images";
import type { CmsDocument } from "@/lib/cms/types";

export type CmsHeroCarouselItem = {
  id: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

export function newCivisHeroSlideId() {
  return `civis-hero-${Date.now().toString(36)}`;
}

export function itemsFromCivisHero(images: HeroImage[]): CmsHeroCarouselItem[] {
  return images.map((img, i) => ({
    id: `default-${i}`,
    src: img.src,
    alt: img.alt,
    objectPosition: img.objectPosition,
  }));
}

export function toCivisHeroImage(item: CmsHeroCarouselItem): HeroImage | null {
  if (!item.src?.trim()) return null;
  return {
    src: resolveCmsMediaUrl(item.src) ?? item.src,
    alt: item.alt,
    objectPosition: item.objectPosition,
  };
}

export function resolveCivisHeroCarousel(
  doc: CmsDocument | null | undefined,
): CmsHeroCarouselItem[] {
  const stored = doc?.sections.civisHeroCarousel;
  if (stored?.length) return stored;
  return itemsFromCivisHero(CIVIS_HERO_IMAGES);
}

export function resolveCivisHeroCarouselImages(
  doc: CmsDocument | null | undefined,
): HeroImage[] {
  return resolveCivisHeroCarousel(doc)
    .map(toCivisHeroImage)
    .filter((img): img is HeroImage => img !== null);
}
