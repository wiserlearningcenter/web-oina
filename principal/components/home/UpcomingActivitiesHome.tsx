"use client";

import { UpcomingActivitiesCarousel } from "@/components/home/UpcomingActivitiesCarousel";
import { useHomeCmsEdit } from "@/components/cms/HomeCmsEditContext";
import { cmsEntryToAgenda } from "@/lib/cms/agenda-edit";
import { getHomeAgendaItems, type AgendaEntry } from "@/lib/agenda";
import type { CmsAgendaEntry } from "@/lib/cms/types";
import { useCmsHomeAgenda } from "@/lib/cms/hooks";
import { getHomeUpcomingAgenda } from "@/lib/agenda-registry";
import { isCmsEnabled } from "@/lib/cms/provider";

function carouselItemsForEdit(entries: CmsAgendaEntry[]): AgendaEntry[] {
  const mapped = entries.map(cmsEntryToAgenda);
  const visible = getHomeAgendaItems(mapped);
  return visible.length > 0 ? visible : mapped;
}

/** Carrusel del home — usa CMS publicado si NEXT_PUBLIC_CMS_URL está definido. */
export function UpcomingActivitiesHome() {
  const edit = useHomeCmsEdit();
  const cmsItems = useCmsHomeAgenda();
  const fallbackItems = getHomeUpcomingAgenda();

  const items =
    edit?.ready
      ? carouselItemsForEdit(edit.carousel)
      : isCmsEnabled()
        ? cmsItems
        : fallbackItems;

  if (items.length === 0 && !edit?.ready) return null;

  return (
    <UpcomingActivitiesCarousel
      items={items}
      editMode={
        edit?.ready
          ? {
              onEditItem: (id) => edit.setSelected("carousel", id),
              onAddItem: () => edit.addCarousel(),
            }
          : undefined
      }
    />
  );
}
