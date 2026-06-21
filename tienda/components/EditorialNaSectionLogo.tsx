import {
  NaBrandLockupGroup,
  type NaBrandLockupSize,
} from "@/components/NaBrandLockupGroup";

const SIZE_MAP = {
  /** Footer — escala submarca (referencia Civis). */
  footer: "footerSubmarca",
  /** Quiénes somos — proporción legible sin recortar el anagrama. */
  section: "contenidoHub",
  content: "contenidoHub",
} as const satisfies Record<string, NaBrandLockupSize>;

type EditorialNaSectionLogoProps = {
  size?: keyof typeof SIZE_MAP;
  variant?: "color" | "white";
  align?: "left" | "center";
  render?: "auto" | "hybrid" | "raster";
};

/** Lockup OINA agrupado para Editorial. */
export function EditorialNaSectionLogo({
  size = "section",
  variant = "color",
  align = "center",
  render,
}: EditorialNaSectionLogoProps) {
  const maxWidthClass =
    size === "footer"
      ? "max-w-[min(92vw,13.5rem)]"
      : "max-w-[min(92vw,10.5rem)]";

  return (
    <NaBrandLockupGroup
      lockup="oina"
      size={SIZE_MAP[size]}
      variant={variant}
      align={align === "center" ? "center" : "start"}
      render={render}
      maxWidthClass={maxWidthClass}
    />
  );
}
