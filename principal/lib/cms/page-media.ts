import type {
  CmsDocument,
  CmsPageMediaCard,
  CmsPageMediaSection,
  CmsPageMediaTarget,
} from "@/lib/cms/types";

export const PAGE_MEDIA_SECTION_ID = "__page-media-section__";

export function pageMediaForPage(
  sections: CmsPageMediaSection[] | undefined,
  pageId: CmsPageMediaTarget,
): CmsPageMediaSection[] {
  return (sections ?? []).filter((s) => s.pageId === pageId);
}

export function mergePageMediaForPage(
  all: CmsPageMediaSection[] | undefined,
  pageId: CmsPageMediaTarget,
  updated: CmsPageMediaSection[],
): CmsPageMediaSection[] {
  const rest = (all ?? []).filter((s) => s.pageId !== pageId);
  return [...rest, ...updated];
}

export function mergePageMediaIntoDoc(
  base: CmsDocument,
  pageId: CmsPageMediaTarget,
  sections: CmsPageMediaSection[],
): CmsDocument {
  return {
    ...base,
    sections: {
      ...base.sections,
      pageMediaSections: mergePageMediaForPage(
        base.sections.pageMediaSections,
        pageId,
        sections,
      ),
    },
  };
}

export function newPageMediaSectionId() {
  return `pms-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function newPageMediaCardId() {
  return `pmc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function pageMediaSectionSelectedId(id: string) {
  return `page-media-section:${id}`;
}

export function pageMediaCardSelectedId(sectionId: string, cardId: string) {
  return `page-media-card:${sectionId}:${cardId}`;
}

export function parsePageMediaSectionSelectedId(selectedId: string | null) {
  if (!selectedId?.startsWith("page-media-section:")) return null;
  return selectedId.slice("page-media-section:".length);
}

export function parsePageMediaCardSelectedId(selectedId: string | null) {
  if (!selectedId?.startsWith("page-media-card:")) return null;
  const rest = selectedId.slice("page-media-card:".length);
  const colon = rest.indexOf(":");
  if (colon < 0) return null;
  return {
    sectionId: rest.slice(0, colon),
    cardId: rest.slice(colon + 1),
  };
}

export function emptyPageMediaCard(): CmsPageMediaCard {
  return {
    id: newPageMediaCardId(),
    kind: "image",
    src: "",
    alt: "",
    title: "",
    caption: "",
  };
}

export function emptyPageMediaSection(
  pageId: CmsPageMediaTarget,
): CmsPageMediaSection {
  return {
    id: newPageMediaSectionId(),
    pageId,
    eyebrow: "Galería",
    title: "Nueva sección",
    intro: "",
    cards: [],
  };
}
