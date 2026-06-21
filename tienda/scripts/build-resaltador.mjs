/**
 * Compone la foto del resaltador triple: foto base (IA) + monograma Nueva Acrópolis
 * y lema «Ilumina las ideas» sobre la cara blanca del triángulo.
 *
 * Uso: npm run resaltador:build
 */
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = path.join(ROOT, "scripts/regalos-src/resaltador-base.png");
const MONO = path.join(ROOT, "scripts/_na-mark-teal.png");
const OUT = path.join(ROOT, "public/img/regalos/resaltador-ideas.png");

const TEAL = "#1f5a4e";
// Centro de la cara blanca del triángulo en la base 1536x1024.
const CX = 768;

async function build() {
  const monoW = 230;
  const mono = await sharp(MONO).resize({ width: monoW }).png().toBuffer();
  const monoMeta = await sharp(mono).metadata();
  const monoLeft = Math.round(CX - monoMeta.width / 2);
  const monoTop = 372;

  const textSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024">
  <text x="${CX}" y="512" fill="${TEAL}" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="2" text-anchor="middle">NUEVA ACRÓPOLIS</text>
  <rect x="${CX - 95}" y="532" width="190" height="2" fill="${TEAL}" opacity="0.4"/>
  <text x="${CX}" y="608" fill="${TEAL}" font-family="Arial, sans-serif" font-size="50" font-weight="700" letter-spacing="6" text-anchor="middle">ILUMINA</text>
  <text x="${CX}" y="674" fill="${TEAL}" font-family="Arial, sans-serif" font-size="50" font-weight="700" letter-spacing="6" text-anchor="middle">LAS IDEAS</text>
</svg>`);

  const composed = await sharp(BASE)
    .composite([
      { input: mono, top: monoTop, left: monoLeft },
      { input: textSvg, top: 0, left: 0 },
    ])
    .png()
    .toBuffer();

  // Recorta a 3:4 (768x1024) centrado en el triángulo.
  const out = await sharp(composed)
    .extract({ left: 384, top: 0, width: 768, height: 1024 })
    .png()
    .toFile(OUT);

  console.log("Resaltador:", `${out.width}x${out.height}`);
}

build();
