"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  ClipboardCopy,
  Mail,
  Send,
  X,
} from "lucide-react";
import type { InquiryContactValues, MailtoResult } from "@/lib/contact-routing";

type InquiryMailFormProps = {
  triggerLabel: string;
  triggerClassName?: string;
  triggerIcon?: ReactNode;
  triggerIconAfter?: boolean;
  modalTitle: string;
  modalIntro: string;
  contextLines?: string[];
  defaultMensaje?: string;
  buildMailto: (values: InquiryContactValues) => MailtoResult;
  deliveryNote?: string;
};

const initial: InquiryContactValues = {
  nombre: "",
  telefono: "",
  email: "",
  mensaje: "",
};

export function InquiryMailForm({
  triggerLabel,
  triggerClassName = "inline-flex items-center justify-center gap-2 rounded-full bg-na-heket px-6 py-3 text-sm font-bold text-white shadow-md shadow-na-heket/25 transition hover:bg-na-kefer",
  triggerIcon,
  triggerIconAfter = false,
  modalTitle,
  modalIntro,
  contextLines,
  defaultMensaje = "",
  buildMailto,
  deliveryNote,
}: InquiryMailFormProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<InquiryContactValues>({
    ...initial,
    mensaje: defaultMensaje,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [copyRecipients, setCopyRecipients] = useState<string[]>([]);
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

  const openForm = () => {
    setValues({ ...initial, mensaje: defaultMensaje });
    setErrors({});
    setDone(false);
    setRecipients([]);
    setCopyRecipients([]);
    setCopyOk(false);
    setOpen(true);
  };

  const inputClass =
    "w-full rounded-xl border border-na-heket/20 bg-white px-3 py-2.5 text-sm text-na-ink outline-none transition placeholder:text-na-muted/60 focus:border-na-heket focus:ring-2 focus:ring-na-heket/20";

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setCopyOk(false);
    const e: Record<string, string> = {};
    if (!values.nombre.trim()) e.nombre = "Indica tu nombre.";
    if (!values.telefono.trim()) e.telefono = "Indica un teléfono o WhatsApp.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const { href, recipients: to, cc, body } = buildMailto(values);
    setRecipients(to);
    setCopyRecipients(cc ?? []);

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
    setValues({ ...initial, mensaje: defaultMensaje });
    setErrors({});
    setDone(false);
    setRecipients([]);
    setCopyRecipients([]);
    setCopyOk(false);
    setOpen(false);
  };

  const recipientLabel = [
    recipients.join(", "),
    copyRecipients.length > 0 ? `(copia: ${copyRecipients.join(", ")})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button type="button" onClick={openForm} className={triggerClassName}>
        {!triggerIconAfter ? triggerIcon : null}
        {triggerLabel}
        {triggerIconAfter ? triggerIcon : null}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-na-ink/70 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={modalTitle}
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
                  {deliveryNote ? (
                    <span className="mt-2 block text-xs">{deliveryNote}</span>
                  ) : null}
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        buildMailto(values).body,
                      );
                      setCopyOk(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-na-heket/25 px-4 py-2.5 text-sm font-semibold text-na-heketDark hover:bg-na-heket/5"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                    Copiar de nuevo
                  </button>
                  <a
                    href={buildMailto(values).href}
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
                  {modalTitle}
                </h3>
                <p className="mt-1.5 text-sm text-na-muted">{modalIntro}</p>

                {contextLines && contextLines.length > 0 ? (
                  <div className="mt-4 rounded-xl border border-na-heket/15 bg-na-heket/[0.05] px-4 py-3 text-sm text-na-heketDark">
                    {contextLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-na-muted"
                      htmlFor="inq-nombre"
                    >
                      Nombre <span className="text-na-amon">*</span>
                    </label>
                    <input
                      id="inq-nombre"
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
                      htmlFor="inq-tel"
                    >
                      Teléfono / WhatsApp <span className="text-na-amon">*</span>
                    </label>
                    <input
                      id="inq-tel"
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
                    htmlFor="inq-email"
                  >
                    Correo
                  </label>
                  <input
                    id="inq-email"
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
                    htmlFor="inq-msg"
                  >
                    Comentario
                  </label>
                  <textarea
                    id="inq-msg"
                    rows={3}
                    className={`${inputClass} min-h-[4.5rem] resize-y`}
                    placeholder="Disponibilidad, fechas preferidas, etc. (opcional)"
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
