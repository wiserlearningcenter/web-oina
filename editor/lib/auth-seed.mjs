import { hashPassword } from "./password.mjs";
import { upsertUsers, usersFileExists } from "./auth-store.mjs";

/** Usuarios iniciales del CMS (6 roles). Contraseñas solo para el primer seed. */
export const DEFAULT_AUTH_USERS = [
  {
    username: "admin",
    password: process.env.CMS_ADMIN_PASSWORD || "acropolis-edit",
    role: "admin",
    label: "Administrador",
  },
  {
    username: "voluntariado",
    password: process.env.CMS_VOLUNTARIADO_PASSWORD || "na-voluntariado",
    role: "voluntariado",
    label: "Voluntariado",
  },
  {
    username: "esfera",
    password: process.env.CMS_ESFERA_PASSWORD || "na-esfera",
    role: "esfera",
    label: "Esfera y Sedes",
  },
  {
    username: "editorial",
    password: process.env.CMS_EDITORIAL_PASSWORD || "na-editorial",
    role: "editorial",
    label: "Cursos, Civis, Cultura y Contenido",
  },
  {
    username: "viajes",
    password: process.env.CMS_VIAJES_PASSWORD || "na-viajes",
    role: "viajes",
    label: "Viajes",
  },
  {
    username: "filosofia",
    password: process.env.CMS_FILOSOFIA_PASSWORD || "na-filosofia",
    role: "filosofia",
    label: "Diplomado y Filosofía",
  },
];

export function ensureAuthUsersSeeded() {
  if (usersFileExists()) return false;
  upsertUsers(
    DEFAULT_AUTH_USERS.map((u) => ({
      username: u.username,
      passwordHash: hashPassword(u.password),
      role: u.role,
      label: u.label,
      totpSecret: null,
    })),
  );
  return true;
}
