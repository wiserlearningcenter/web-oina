"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ExternalLink,
  GraduationCap,
  Library,
  ShoppingBag,
} from "lucide-react";
import {
  DIPLOMADO_PATH,
  platformEffectiveUrl,
  platformIsExternal,
  type PlatformId,
} from "@/lib/site-config";

type NavItem = {
  id: PlatformId | "diplomado";
  label: string;
  href: string;
  icon: typeof Library;
};

const ALL_ITEMS: NavItem[] = [
  {
    id: "biblioteca",
    label: "Biblioteca",
    href: platformEffectiveUrl("biblioteca"),
    icon: Library,
  },
  {
    id: "tienda",
    label: "Librería Editorial Logos",
    href: platformEffectiveUrl("tienda"),
    icon: ShoppingBag,
  },
  {
    id: "civis",
    label: "Civis",
    href: platformEffectiveUrl("civis"),
    icon: Briefcase,
  },
  {
    id: "diplomado",
    label: "Diplomado",
    href: DIPLOMADO_PATH,
    icon: GraduationCap,
  },
];

function isDiplomadoRoute(pathname: string): boolean {
  return pathname === DIPLOMADO_PATH || pathname.startsWith(`${DIPLOMADO_PATH}/`);
}

function itemClassName(id: NavItem["id"], active: boolean): string {
  const base =
    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition sm:px-3.5 sm:text-xs ";

  if (active) {
    return (
      base +
      "ring-2 ring-white/90 ring-offset-1 ring-offset-na-heket " +
      (id === "diplomado"
        ? "bg-na-kefer text-white"
        : "bg-white/25 text-white")
    );
  }

  switch (id) {
    case "tienda":
      return base + "bg-na-editorial text-white hover:bg-na-editorialDark";
    case "civis":
      return base + "bg-na-civis text-white hover:bg-na-civisDark";
    case "biblioteca":
      return base + "bg-na-helios text-na-ink hover:brightness-105";
    case "diplomado":
      return base + "bg-na-kefer text-white hover:bg-na-keferLight";
    default:
      return base + "bg-white/15 text-white hover:bg-white/25";
  }
}

function isItemActive(id: NavItem["id"], pathname: string): boolean {
  if (id === "diplomado") return isDiplomadoRoute(pathname);
  return false;
}

export function PlatformNavBar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-na-heket/15 bg-na-heket text-white">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-end gap-2 overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ALL_ITEMS.map((item) => {
          const Icon = item.icon;
          const external = platformIsExternal(item.href);
          const active = isItemActive(item.id, pathname);
          const className = itemClassName(item.id, active);
          const content = (
            <>
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {item.label}
              {external ? (
                <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
              ) : null}
            </>
          );

          if (external) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={className}
              aria-current={active ? "page" : undefined}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
