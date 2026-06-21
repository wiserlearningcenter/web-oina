import { isCmsEnabled } from "@/lib/cms/provider";
import type { CmsPageHeroText } from "@/lib/cms/types";

export type PageHeroFallback = {
  eyebrow: string;
  title: string;
  lede?: string;
};

export function resolvePageHero(
  fallback: PageHeroFallback,
  cms?: CmsPageHeroText | null,
  edit?: CmsPageHeroText | null,
  editReady?: boolean,
): PageHeroFallback {
  if (editReady && edit) {
    return {
      eyebrow: edit.heroEyebrow ?? fallback.eyebrow,
      title: edit.heroTitle ?? fallback.title,
      lede: edit.heroLede ?? fallback.lede,
    };
  }
  if (isCmsEnabled() && cms) {
    return {
      eyebrow: cms.heroEyebrow ?? fallback.eyebrow,
      title: cms.heroTitle ?? fallback.title,
      lede: cms.heroLede ?? fallback.lede,
    };
  }
  return fallback;
}
