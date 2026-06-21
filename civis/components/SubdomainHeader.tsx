import { ExternalLink } from "lucide-react";

import { CivisBrandMark } from "@/components/CivisBrandMark";

import { PRINCIPAL_SITE_URL } from "@/lib/site-config";



export function SubdomainHeader() {

  return (

    <header className="border-b border-na-civis/20 bg-na-surface shadow-sm backdrop-blur-md">

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">

        <div className="min-w-0 flex-1">
          <CivisBrandMark priority />
        </div>

        <a

          href={PRINCIPAL_SITE_URL}

          target="_blank"

          rel="noopener noreferrer"

          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-na-muted transition hover:text-na-civisDark sm:text-sm"

        >

          acropolis.org.do

          <ExternalLink className="h-3.5 w-3.5" aria-hidden />

        </a>

      </div>

    </header>

  );

}

