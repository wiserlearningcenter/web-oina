import { Footer } from "@/components/Footer";
import { DiplomadoNav } from "@/components/diplomado/DiplomadoNav";

export function DiplomadoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="diplomado-shell flex min-h-screen flex-col">
      <div className="diplomado-phone mx-auto flex w-full min-h-screen flex-col">
        <DiplomadoNav />
        <div className="diplomado-phone__content flex-1">{children}</div>
        <div className="diplomado-footer-wrap">
          <Footer />
        </div>
      </div>
    </div>
  );
}
