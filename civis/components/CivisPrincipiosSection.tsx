"use client";

import { Compass, HeartHandshake, Users } from "lucide-react";
import type { CmsCivisPrincipioItem } from "@/lib/cms/types";

const PRINCIPIO_ICONS = [Users, HeartHandshake, Compass] as const;

/** Tonos secundarios de marca (Kefer, Civis, Amón/Helios) por principio. */
const PRINCIPIO_STYLES = [
  {
    card: "border-na-kefer/25 bg-gradient-to-br from-na-kefer/[0.14] via-white to-na-kefer/[0.05]",
    icon: "bg-na-kefer text-white ring-4 ring-na-kefer/15",
    title: "text-na-heket",
  },
  {
    card: "border-na-civis/30 bg-gradient-to-br from-na-civis/[0.18] via-white to-na-civis/[0.06]",
    icon: "bg-na-civisDark text-white ring-4 ring-na-civis/20",
    title: "text-na-civisDark",
  },
  {
    card: "border-na-amon/30 bg-gradient-to-br from-na-amon/[0.12] via-white to-na-helios/[0.14]",
    icon: "bg-na-amon text-white ring-4 ring-na-amon/20",
    title: "text-na-amon",
  },
] as const;

/** Sección «Nuestros principios». */
export function CivisPrincipiosSection({
  className = "",
  title = "Nuestros principios",
  items,
}: {
  className?: string;
  title?: string;
  items: CmsCivisPrincipioItem[];
}) {
  return (
    <div className={className}>
      <h2 className="text-balance text-3xl font-black text-na-ink sm:text-4xl">
        {title}
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-3">
        {items.map((item, i) => {
          const Icon = PRINCIPIO_ICONS[i] ?? Compass;
          const tone = PRINCIPIO_STYLES[i] ?? PRINCIPIO_STYLES[0];
          return (
            <li
              key={`${item.title}-${i}`}
              className={`flex h-full flex-col rounded-2xl border p-6 shadow-na-soft ${tone.card}`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <p className={`mt-5 font-bold ${tone.title}`}>{item.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-na-muted">
                {item.text}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
