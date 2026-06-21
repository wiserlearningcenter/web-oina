"use client";

import { useEffect, useState } from "react";
import { fetchSmtpSettings, saveSmtpSettings, type SmtpSettings } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

const empty: SmtpSettings = {
  host: "mail.acropolis.org.do",
  port: 465,
  secure: "ssl",
  user: "smtp_user@acropolis.org.do",
  passwordSet: false,
  from_email: "no-reply@acropolis.org",
  from_name: "Nueva Acrópolis RD",
  forms: {
    civis_solicitud: {
      to_email: "civis@acropolis.org",
      to_name: "Civis Consulting",
      subject_prefix: "[CIVIS] Solicitud de propuesta",
      copy_to_sender: true,
    },
  },
};

export function SmtpSettingsPanel() {
  const [values, setValues] = useState<SmtpSettings>(empty);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchSmtpSettings(token)
      .then((data) => setValues({ ...empty, ...data }))
      .catch(() => setStatus("No se pudo cargar la configuración SMTP."))
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    setStatus("");
    try {
      const saved = await saveSmtpSettings(token, {
        ...values,
        password: password.trim() || undefined,
      });
      setValues({ ...empty, ...saved });
      setPassword("");
      setStatus("Configuración guardada.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  const field =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";
  const label = "block text-sm font-medium text-slate-700";

  if (loading) {
    return (
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Cargando configuración de correo…
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-sm font-bold text-slate-800">Correo (SMTP compartido)</h2>
      <p className="mt-1 text-sm text-slate-600">
        Mismo servidor que Biblioteca y formularios de los sitios. Las copias automáticas
        salen desde <strong>no-reply@acropolis.org</strong>.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Servidor
          <input
            className={field}
            value={values.host}
            onChange={(e) => setValues((s) => ({ ...s, host: e.target.value }))}
            required
          />
        </label>
        <label className={label}>
          Puerto
          <input
            type="number"
            className={field}
            value={values.port}
            onChange={(e) =>
              setValues((s) => ({ ...s, port: Number(e.target.value) || 465 }))
            }
            required
          />
        </label>
        <label className={label}>
          Seguridad
          <select
            className={field}
            value={values.secure}
            onChange={(e) => setValues((s) => ({ ...s, secure: e.target.value }))}
          >
            <option value="ssl">SSL (465)</option>
            <option value="tls">TLS (587)</option>
          </select>
        </label>
        <label className={label}>
          Usuario SMTP
          <input
            className={field}
            value={values.user}
            onChange={(e) => setValues((s) => ({ ...s, user: e.target.value }))}
            required
          />
        </label>
        <label className={label}>
          Contraseña SMTP
          <input
            type="password"
            className={field}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={values.passwordSet ? "•••••••• (sin cambios)" : "Contraseña"}
            autoComplete="new-password"
          />
        </label>
        <label className={label}>
          Remitente (From)
          <input
            className={field}
            value={values.from_email}
            onChange={(e) => setValues((s) => ({ ...s, from_email: e.target.value }))}
            required
          />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Nombre del remitente
          <input
            className={field}
            value={values.from_name}
            onChange={(e) => setValues((s) => ({ ...s, from_name: e.target.value }))}
            required
          />
        </label>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-bold text-slate-800">Formulario Civis — Inscríbete</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Correo destino (equipo Civis)
            <input
              className={field}
              value={values.forms.civis_solicitud.to_email}
              onChange={(e) =>
                setValues((s) => ({
                  ...s,
                  forms: {
                    ...s.forms,
                    civis_solicitud: {
                      ...s.forms.civis_solicitud,
                      to_email: e.target.value,
                    },
                  },
                }))
              }
              required
            />
          </label>
          <label className={label}>
            Prefijo del asunto
            <input
              className={field}
              value={values.forms.civis_solicitud.subject_prefix}
              onChange={(e) =>
                setValues((s) => ({
                  ...s,
                  forms: {
                    ...s.forms,
                    civis_solicitud: {
                      ...s.forms.civis_solicitud,
                      subject_prefix: e.target.value,
                    },
                  },
                }))
              }
              required
            />
          </label>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.forms.civis_solicitud.copy_to_sender}
            onChange={(e) =>
              setValues((s) => ({
                ...s,
                forms: {
                  ...s.forms,
                  civis_solicitud: {
                    ...s.forms.civis_solicitud,
                    copy_to_sender: e.target.checked,
                  },
                },
              }))
            }
            className="h-4 w-4 rounded border-slate-300"
          />
          Enviar copia al correo de quien solicita
        </label>
      </div>

      {status ? (
        <p
          className={`mt-4 text-sm ${status.includes("guardada") ? "text-emerald-700" : "text-red-600"}`}
        >
          {status}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 rounded-lg bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
      >
        {saving ? "Guardando…" : "Guardar configuración SMTP"}
      </button>
    </form>
  );
}
