"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlatformNavBar } from "@/components/PlatformNavBar";
import { PrincipalLegacyHashRedirect } from "@/components/PrincipalLegacyHashRedirect";
import { DIPLOMADO_PATH } from "@/lib/site-config";

function isDiplomadoRoute(pathname: string): boolean {
  return pathname === DIPLOMADO_PATH || pathname.startsWith(`${DIPLOMADO_PATH}/`);
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const diplomado = isDiplomadoRoute(pathname);

  if (diplomado) {
    return (
      <>
        <PlatformNavBar />
        <main className="flex-1">{children}</main>
      </>
    );
  }

  return (
    <>
      <PrincipalLegacyHashRedirect />
      <PlatformNavBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
