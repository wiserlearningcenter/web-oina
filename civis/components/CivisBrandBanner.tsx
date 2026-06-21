import { CivisBrandMark } from "@/components/CivisBrandMark";



/** Identificador Civis en barra blanca única (zona de respeto incluida). */

export function CivisBrandBanner() {

  return (

    <header className="w-full border-b border-na-civis/10 bg-white">

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">

        <CivisBrandMark priority />

      </div>

    </header>

  );

}

