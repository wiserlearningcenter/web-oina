"use client";

import { EditField } from "@/components/cms/CmsEditFields";
import { AgendaEntryImageField } from "@/components/cms/AgendaEntryEditFields";
import type { CmsEsferaHomePromo } from "@/lib/cms/types";

export function EsferaHomeEditFields({
  value,
  token,
  onChange,
}: {
  value: CmsEsferaHomePromo;
  token: string | null;
  onChange: (patch: Partial<CmsEsferaHomePromo>) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="rounded-lg bg-sky-50 px-3 py-2 text-xs text-sky-950">
        Este bloque aparece en el <strong>inicio</strong> del sitio. El logo
        Esfera se edita en la pestaña Esfera (cuadro lateral de estándares).
      </p>
      <EditField
        label="Etiqueta superior"
        value={value.homeEyebrow ?? ""}
        onChange={(v) => onChange({ homeEyebrow: v })}
      />
      <EditField
        label="Título"
        value={value.homeTitle ?? ""}
        onChange={(v) => onChange({ homeTitle: v })}
      />
      <EditField
        label="Párrafo principal"
        value={value.homeIntro ?? ""}
        onChange={(v) => onChange({ homeIntro: v })}
        multiline
      />
      <EditField
        label="Párrafo complementario"
        value={value.homeDetail ?? ""}
        onChange={(v) => onChange({ homeDetail: v })}
        multiline
      />
      <AgendaEntryImageField
        label="Foto"
        site="acropolis"
        image={value.homeImageSrc ?? ""}
        imageAlt={value.homeImageAlt ?? ""}
        token={token}
        onChange={(patch) =>
          onChange({
            ...(patch.image !== undefined ? { homeImageSrc: patch.image } : {}),
            ...(patch.imageAlt !== undefined
              ? { homeImageAlt: patch.imageAlt }
              : {}),
          })
        }
      />
      <EditField
        label="Texto del botón"
        value={value.homeCtaLabel ?? ""}
        onChange={(v) => onChange({ homeCtaLabel: v })}
      />
    </div>
  );
}
