import { CivisSalones } from "@/components/CivisSalones";

import { CivisFooter } from "@/components/CivisFooter";

import { SalonesPageShell } from "@/components/cms/SalonesPageShell";



export default function SalonesPage() {

  return (

    <SalonesPageShell>

      <>

        <CivisSalones />

        <CivisFooter />

      </>

    </SalonesPageShell>

  );

}

