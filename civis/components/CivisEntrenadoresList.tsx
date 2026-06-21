"use client";



import { Award } from "lucide-react";

import { CivisEditPencil } from "@/components/cms/CmsEditFields";
import { CivisMediaImage } from "@/components/cms/CivisMediaImage";

import { useCivisCmsEdit } from "@/components/cms/CivisCmsEditContext";

import { entrenadorSlug } from "@/lib/cms/civis-display";

import type { EntrenadorCivis } from "@/lib/civis-content";

type EntrenadorDisplay = EntrenadorCivis & { id?: string };

export function CivisEntrenadoresList({

  entrenadores,

  compact = false,

}: {

  entrenadores: EntrenadorDisplay[];

  compact?: boolean;

}) {

  const edit = useCivisCmsEdit();



  return (

    <ul className="mt-8 grid gap-6 lg:grid-cols-2">

      {entrenadores.map((persona, i) => {
        const personaId = persona.id ?? entrenadorSlug(persona.name);

        return (
        <li

          key={personaId}

          className={`relative flex flex-col gap-6 rounded-[1.75rem] border border-na-civis/12 bg-white p-6 shadow-na-soft sm:flex-row sm:p-7 ${

            i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""

          }`}

        >

          {edit?.ready ? (

            <CivisEditPencil

              label={`Editar ${persona.name}`}

              onClick={() =>

                edit.setSelectedId(`entrenador:${personaId}`)

              }

            />

          ) : null}

          <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-na-civis/10 sm:mx-0">

            {persona.photo ? (

              <CivisMediaImage

                src={persona.photo}

                alt={persona.photoAlt ?? persona.name}

                fill

                className="object-cover"

                style={{

                  objectPosition:

                    persona.photoObjectPosition ?? "center 22%",

                }}

                sizes="128px"

              />

            ) : (

              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-na-civisDark via-na-civis to-na-civis/80 text-2xl font-black text-white">

                {persona.initials}

              </div>

            )}

          </div>

          <div className="min-w-0 flex-1">

            <h4 className="text-xl font-black text-na-ink">{persona.name}</h4>

            <p className="mt-1 text-sm font-semibold text-na-civisDark">

              {persona.role}

            </p>

            <p

              className={`mt-3 text-sm leading-relaxed text-na-muted ${compact ? "line-clamp-3" : ""}`}

            >

              {persona.bio}

            </p>

            {!compact ? (

              <ul

                className={`mt-4 space-y-2 ${i % 2 === 1 ? "sm:ml-auto sm:max-w-md" : ""}`}

              >

                {persona.certifications.map((cert) => (

                  <li

                    key={cert}

                    className="flex gap-2 text-sm text-na-muted sm:items-start"

                  >

                    <Award

                      className="mt-0.5 h-4 w-4 shrink-0 text-na-civis"

                      aria-hidden

                    />

                    {cert}

                  </li>

                ))}

              </ul>

            ) : null}

          </div>

        </li>

        );
      })}

    </ul>

  );

}


