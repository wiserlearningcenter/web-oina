import { CivisHeroCms } from "@/components/CivisHeroCms";
import { CivisHomePrincipios } from "@/components/CivisHomePrincipios";
import { CivisOfertaResumen } from "@/components/CivisOfertaResumen";
import { ActividadesRecientesCarousel } from "@/components/ActividadesRecientesCarousel";
import { CivisEntrenadoresHome } from "@/components/CivisEntrenadoresHome";
import { CivisFooter } from "@/components/CivisFooter";

export default function HomePage() {
  return (
    <>
      <CivisHeroCms
        title="Civis Consulting"
        lede="Talleres y formación para empresas, equipos y líderes: comunicación, convivencia y habilidades para el entorno laboral."
        ctaHref="/talleres"
        ctaLabel="Ver talleres"
      />

      <CivisHomePrincipios />
      <CivisOfertaResumen />
      <ActividadesRecientesCarousel />
      <CivisEntrenadoresHome />
      <CivisFooter />
    </>
  );
}
