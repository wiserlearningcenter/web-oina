/**
 * Regenera editor/data/auth/users.json con los 6 usuarios por defecto.
 * Uso: node scripts/reset-auth.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_AUTH_USERS } from "../lib/auth-seed.mjs";
import { hashPassword } from "../lib/password.mjs";
import { upsertUsers } from "../lib/auth-store.mjs";

const authDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "auth",
);
const usersFile = path.join(authDir, "users.json");

if (fs.existsSync(usersFile)) {
  const backup = `${usersFile}.bak-${Date.now()}`;
  fs.copyFileSync(usersFile, backup);
  console.log(`Respaldo: ${backup}`);
}

upsertUsers(
  DEFAULT_AUTH_USERS.map((u) => ({
    username: u.username,
    passwordHash: hashPassword(u.password),
    role: u.role,
    label: u.label,
    totpSecret: null,
  })),
);

console.log("Usuarios regenerados (2FA pendiente de configurar en primer login):");
for (const u of DEFAULT_AUTH_USERS) {
  console.log(`  ${u.username} → ${u.role} (${u.label})`);
}
