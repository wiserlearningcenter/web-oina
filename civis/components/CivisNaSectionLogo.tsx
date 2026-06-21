import {

  NaBrandLockupGroup,

  type NaBrandLockupSize,

} from "@/components/NaBrandLockupGroup";



const SIZE_MAP = {

  footer: "footerSubmarca",

  section: "quienesSomos",

  content: "sectionStacked",

} as const satisfies Record<string, NaBrandLockupSize>;



type CivisNaSectionLogoProps = {

  size?: keyof typeof SIZE_MAP;

  variant?: "color" | "white";

  align?: "left" | "center";

};



/** Lockup OINA agrupado para Civis (Organización Internacional). */

export function CivisNaSectionLogo({

  size = "section",

  variant = "color",

  align = "center",

}: CivisNaSectionLogoProps) {

  const maxWidthClass =

    size === "footer"

      ? "max-w-[min(92vw,14.75rem)]"

      : size === "content"

        ? "max-w-[min(92vw,12rem)]"

        : "max-w-[min(92vw,10rem)]";



  return (

    <NaBrandLockupGroup

      lockup="oina"

      size={SIZE_MAP[size]}

      variant={variant}

      align={align === "center" ? "center" : "start"}

      maxWidthClass={maxWidthClass}

    />

  );

}


