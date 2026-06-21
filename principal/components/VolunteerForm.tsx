"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  ClipboardCopy,
  HeartHandshake,
  HeartPulse,
  Mail,
  Send,
  ShieldAlert,
  Sprout,
  Users,
  X,
} from "lucide-react";
import {
  buildVolunteerMailto,
  buildVolunteerMessage,
  VOLUNTEER_AREAS,
} from "@/lib/contact-routing";

const AREAS = [
  {
    id: VOLUNTEER_AREAS[0],
    desc: "Actividades educativas y recreativas con niños en la comunidad.",
    icon: Users,
  },
  {
    id: VOLUNTEER_AREAS[1],
    desc: "Acompañamiento y visitas solidarias a personas mayores.",
    icon: HeartHandshake,
  },
  {
    id: VOLUNTEER_AREAS[2],
    desc: "Formación y respuesta humanitaria ante emergencias.",
    icon: ShieldAlert,
  },
  {
    id: VOLUNTEER_AREAS[3],
    desc: "Jornadas de salud comunitaria y apoyo en ferias médicas.",
    icon: HeartPulse,
  },
  {
    id: VOLUNTEER_AREAS[4],
    desc: "Reforestación, limpieza de espacios y educación ambiental.",
    icon: Sprout,
  },
] as const;

type FormState = {
  nombre: string;
  telefono: string;
  email: string;
  areas: string[];
  mensaje: string;
};

const initial: FormState = {
  nombre: "",
  telefono: "",
  email: "",
  areas: [],
  mensaje: "",
};

type VolunteerFormProps = {
  triggerLabel?: string;
  triggerClassName?: string;
  showTriggerIcon?: boolean;
};

export function VolunteerForm({
  triggerLabel = "Quiero ser voluntario",
  triggerClassName = "inline-flex items-center justify-center gap-2 rounded-full bg-na-heket px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-na-heket/25 transition hover:bg-na-kefer",
  showTriggerIcon = true,
}: VolunteerFormProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [copyOk, setCopyOk] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const inputClass =
    "w-full rounded-xl border border-na-heket/20 bg-white px-3 py-2.5 text-sm text-na-ink outline-none transition placeholder:text-na-muted/60 focus:border-na-heket focus:ring-2 focus:ring-na-heket/20";

  const toggleArea = (area: string) =>
    setValues((s) => ({
      ...s,
      areas: s.areas.includes(area)
        ? s.areas.filter((a) => a !== area)
        : [...s.areas, area],
    }));

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setCopyOk(false);
    const e: Record<string, string> = {};
    if (!values.nombre.trim()) e.nombre = "Indica tu nombre.";
    if (!values.telefono.trim()) e.telefono = "Indica un teléfono o WhatsApp.";
    if (values.areas.length === 0) e.areas = "Elige al menos una línea.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const { href, recipients: to, body } = buildVolunteerMailto(values);
    setRecipients(to);

    try {
      await navigator.clipboard.writeText(body);
      setCopyOk(true);
    } catch {
      setCopyOk(false);
    }

    setDone(true);

    if (href.length < 1800) {
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setDone(false);
    setRecipients([]);
    setCopyOk(false);
    setOpen(false);
  };

  const recipientLabel = recipients.join(", ");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {showTriggerIcon ? <HeartHandshake className="h-4 w-4" /> : null}
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-na-ink/70 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Quiero ser voluntario/a"
          onClick={close}
        >
          <div
            className="relative my-6 w-full max-w-lg overflow-hidden rounded-[1.5rem] bg-na-surface shadow-na-card sm:my-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-na-heket/10 text-na-heketDark transition hover:bg-na-heket/20"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-na-heket" />
                <h3 className="mt-4 text-xl font-black text-na-heketDark">
                  Solicitud lista para enviar
                </h3>
                <p className="mt-2 text-sm text-na-muted">
                  El texto completo{" "}
                  {copyOk
                    ? "se copió al portapapeles."
                    : "puede copiarse con el botón de abajo."}{" "}
                  Si su correo no se abrió automáticamente, envíe el mensaje a{" "}
                  <span className="font-semibold text-na-heketDark">
                    {recipientLabel}
                  </span>
                  .
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        buildVolunteerMessage(values),
                      );
                      setCopyOk(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-na-heket/25 px-4 py-2.5 text-sm font-semibold text-na-heketDark hover:bg-na-heket/5"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                    Copiar de nuevo
                  </button>
                  <a
                    href={buildVolunteerMailto(values).href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-na-heket px-4 py-2.5 text-sm font-bold text-white hover:bg-na-kefer"
                  >
                    <Mail className="h-4 w-4" />
                    Abrir correo
                  </a>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-sm font-semibold text-na-heket underline-offset-2 hover:underline"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
                <h3 className="text-xl font-black text-na-heketDark sm:text-2xl">
                  Quiero ser voluntario/a
                </h3>
                <p className="mt-1.5 text-sm text-na-muted">
                  Solo para voluntariado humanitario y Punto Focal Esfera. Elige
                  las líneas que te interesen; tu solicitud se enviará por correo
                  al equipo de voluntariado.
                </p>

                <fieldset className="mt-5">
                  <legend className="text-sm font-semibold text-na-heketDark">
                    ¿En qué te gustaría participar?{" "}
                    <span className="text-na-amon">*</span>
                  </legend>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {AREAS.map(({ id, desc, icon: Icon }) => {
                      const active = values.areas.includes(id);
                      return (
                        <li
                          key={id}
                          className={
                            id === VOLUNTEER_AREAS[2] ? "sm:col-span-2" : undefined
                          }
                        >
                          <label
                            className={`flex h-full cursor-pointer gap-3 rounded-xl border p-3 transition ${
                              active
                                ? "border-na-heket bg-na-heket/[0.07]"
                                : "border-na-heket/15 hover:border-na-heket/35"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={active}
                              onChange={() => toggleArea(id)}
                              className="sr-only"
                            />
                            <Icon
                              className={`mt-0.5 h-5 w-5 shrink-0 ${
                                active ? "text-na-heket" : "text-na-muted"
                              }`}
                              strokeWidth={1.8}
                            />
                            <span>
                              <span className="block text-sm font-bold text-na-heketDark">
                                {id}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-na-muted">
                                {desc}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {errors.areas && (
                    <p className="mt-2 text-xs text-na-amon">{errors.areas}</p>
                  )}
                </fieldset>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-na-muted"
                      htmlFor="v-nombre"
                    >
                      Nombre <span className="text-na-amon">*</span>
                    </label>
                    <input
                      id="v-nombre"
                      className={inputClass}
                      value={values.nombre}
                      onChange={(e) =>
                        setValues((s) => ({ ...s, nombre: e.target.value }))
                      }
                      autoComplete="name"
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-na-amon">{errors.nombre}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-na-muted"
                      htmlFor="v-tel"
                    >
                      Teléfono / WhatsApp <span className="text-na-amon">*</span>
                    </label>
                    <input
                      id="v-tel"
                      type="tel"
                      className={inputClass}
                      value={values.telefono}
                      onChange={(e) =>
                        setValues((s) => ({ ...s, telefono: e.target.value }))
                      }
                      autoComplete="tel"
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-xs text-na-amon">
                        {errors.telefono}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    className="mb-1.5 block text-sm font-medium text-na-muted"
                    htmlFor="v-email"
                  >
                    Correo
                  </label>
                  <input
                    id="v-email"
                    type="email"
                    className={inputClass}
                    value={values.email}
                    onChange={(e) =>
                      setValues((s) => ({ ...s, email: e.target.value }))
                    }
                    autoComplete="email"
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="mb-1.5 block text-sm font-medium text-na-muted"
                    htmlFor="v-msg"
                  >
                    Comentario
                  </label>
                  <textarea
                    id="v-msg"
                    rows={2}
                    className={`${inputClass} min-h-[3.5rem] resize-y`}
                    placeholder="Disponibilidad, sede de interés, etc. (opcional)"
                    value={values.mensaje}
                    onChange={(e) =>
                      setValues((s) => ({ ...s, mensaje: e.target.value }))
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-na-heket px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-na-heket/25 transition hover:bg-na-kefer"
                >
                  <Send className="h-4 w-4" />
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
