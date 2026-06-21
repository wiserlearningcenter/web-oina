"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { civisLegacyHashPath } from "@/lib/civis-content";

/** Redirige `#clientes` / `#equipo` en `/quienes-somos` a rutas limpias. */
export function CivisLegacyHashRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const next = civisLegacyHashPath(hash);
    if (!next) return;
    router.replace(next);
  }, [pathname, router]);

  return null;
}
