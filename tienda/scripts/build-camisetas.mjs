/**
 * Compone las camisetas: base (IA) + cita/título incrustado con tipografía nítida.
 * Recorta a cuadrado para la tarjeta de producto.
 *
 * Uso: npm run camisetas:build
 */
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "scripts/regalos-src");
const OUT = path.join(ROOT, "public/img/regalos");

// Recorte cuadrado centrado en la camiseta (base 1536x1024).
const CROP = { left: 256, top: 0, width: 1024, height: 1024 };

const FONTS = {
  serif: "Georgia, 'Times New Roman', serif",
  script: "'Segoe Script', 'Brush Script MT', 'Comic Sans MS', cursive",
  impact: "Impact, 'Arial Narrow', 'Arial Black', sans-serif",
  sans: "Arial, sans-serif",
};

const ITEMS = [
  {
    key: "socrates",
    out: "camiseta-socrates",
    texts: [
      { t: "«Solo sé que", x: 660, y: 652, s: 42, font: "serif", style: "italic", weight: 700, fill: "#2f2b26" },
      { t: "no sé nada.»", x: 660, y: 698, s: 42, font: "serif", style: "italic", weight: 700, fill: "#2f2b26" },
      { t: "— Sócrates", x: 660, y: 748, s: 30, font: "sans", style: "italic", weight: 400, fill: "#4a443c" },
    ],
  },
  {
    key: "negra",
    out: "camiseta-platon",
    texts: [
      { t: "La medida de un hombre", x: 768, y: 372, s: 38, font: "script", weight: 400, fill: "#f5f3ec" },
      { t: "es aquello que lo hace feliz.", x: 768, y: 430, s: 38, font: "script", weight: 400, fill: "#f5f3ec" },
      { t: "— Platón", x: 905, y: 502, s: 40, font: "script", weight: 400, fill: "#f5f3ec" },
    ],
  },
  {
    key: "metaphysica",
    out: "camiseta-metaphysica",
    texts: [
      { t: "METAPHYSICA", x: 745, y: 218, s: 66, font: "impact", weight: 400, fill: "#f2f2f2", spacing: 4 },
      { t: "PLATÓN", x: 648, y: 556, s: 21, font: "sans", weight: 700, fill: "#ededed", spacing: 1.5 },
      { t: "ARISTÓTELES", x: 852, y: 556, s: 19, font: "sans", weight: 700, fill: "#ededed", spacing: 1.2 },
      { t: "PITÁGORAS", x: 648, y: 828, s: 21, font: "sans", weight: 700, fill: "#ededed", spacing: 1.5 },
      { t: "SÓCRATES", x: 852, y: 828, s: 21, font: "sans", weight: 700, fill: "#ededed", spacing: 1.5 },
    ],
  },
];

function svgFor(item) {
  const parts = item.texts.map((tx) => {
    const style = tx.style ? `font-style="${tx.style}" ` : "";
    const spacing = tx.spacing ? `letter-spacing="${tx.spacing}" ` : "";
    return `<text x="${tx.x}" y="${tx.y}" fill="${tx.fill}" font-family="${FONTS[tx.font]}" font-size="${tx.s}" font-weight="${tx.weight}" ${style}${spacing}text-anchor="middle">${tx.t}</text>`;
  });
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024">${parts.join("")}</svg>`,
  );
}

async function build() {
  for (const item of ITEMS) {
    const base = path.join(SRC, `tee-base-${item.key}.png`);
    const composed = await sharp(base)
      .composite([{ input: svgFor(item), top: 0, left: 0 }])
      .png()
      .toBuffer();

    const out = await sharp(composed)
      .extract(CROP)
      .png()
      .toFile(path.join(OUT, `${item.out}.png`));

    console.log("Camiseta:", `${item.out}.png`, `${out.width}x${out.height}`);
  }
}

build();
