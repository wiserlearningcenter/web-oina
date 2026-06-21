/**
 * Actualiza separadores: lockup OINADOM blanco completo, sin recorte (fit por altura).
 *
 * Uso: npm run separadores:rebrand
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = path.join(ROOT, "public/img/regalos");
const LOCKUP = path.join(ROOT, "public/brand/logo-oinadom-white.webp");

const FRONTS = [
  "sep-suntzu-resultados-msg.svg",
  "sep-nervo-msg.svg",
  "sep-suntzu-conocete-msg.svg",
  "sep-platon-msg.svg",
  "sep-davinci-msg.svg",
  "sep-seneca-msg.svg",
];

const CARD_W = 220;
/** Altura del lockup OINADOM blanco en la cabecera (legible en impresión y pantalla). */
const LOCKUP_H = 72;

if (!fs.existsSync(LOCKUP)) {
  console.error("Falta lockup:", LOCKUP);
  process.exit(1);
}

const lockupMeta = await sharp(LOCKUP).metadata();
const aspect = (lockupMeta.width ?? 2429) / (lockupMeta.height ?? 1574);
const lockupW = Math.min(CARD_W - 16, Math.round(LOCKUP_H * aspect));
const lockupH = Math.round(lockupW / aspect);
const lockupLeft = Math.round((CARD_W - lockupW) / 2);
const LOCKUP_TOP = 38;

const lockupBuf = await sharp(LOCKUP)
  .resize({ height: lockupH, kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();
const lockupDataUri = `data:image/png;base64,${lockupBuf.toString("base64")}`;

const BRAND = `<image x="${lockupLeft}" y="${LOCKUP_TOP}" width="${lockupW}" height="${lockupH}" href="${lockupDataUri}" preserveAspectRatio="xMidYMid meet"/>`;

const ANY_BRAND_IMAGE =
  /<image x="\d+" y="\d+" width="\d+" height="\d+" href="[^"]+" preserveAspectRatio="[^"]*"\/>/;

for (const name of FRONTS) {
  const file = path.join(IMG, name);
  if (!fs.existsSync(file)) {
    console.warn("Falta:", name);
    continue;
  }

  let svg = fs.readFileSync(file, "utf8");
  if (ANY_BRAND_IMAGE.test(svg)) {
    svg = svg.replace(ANY_BRAND_IMAGE, BRAND);
  } else {
    console.warn("Sin bloque de marca:", name);
    continue;
  }

  fs.writeFileSync(file, svg, "utf8");
  console.log("Marca OINADOM (fit):", name, `${lockupW}x${lockupH}`);
}
