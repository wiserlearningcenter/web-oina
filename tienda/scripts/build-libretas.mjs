/**
 * Compone las libretas: portada ilustrada (IA) + frase incrustada con tipografía
 * elegante. Genera también la contraportada (logo NA + país).
 *
 * Uso: npm run libretas:build
 */
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { buildStackedLockupBuffer } from "./lib/na-lockup.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "scripts/regalos-src");
const OUT = path.join(ROOT, "public/img/regalos");
const LOCKUP_WIDTH = 280;
/** Ancho relativo de la banda de espiral (para centrar el logo). */
const SPIRAL_X_RATIO = 0.15;
/** Canvas uniforme (referencia: libreta-escribir). */
const REF_W = 779;
const REF_H = 922;

const ITEMS = [
  {
    key: "conocete",
    out: "libreta-conocete",
    centerX: 821,
    color: "#f7f5ef",
    accent: "#f4cf73",
    backAccent: "#1f5a4e",
    lines: [
      { t: "Conócete a ti mismo", s: 48 },
      { t: "y conocerás", s: 44 },
      { t: "el universo y los dioses", s: 44, accent: true },
    ],
    startY: 165,
  },
  {
    key: "escribir",
    out: "libreta-escribir",
    centerX: 805,
    color: "#1f5a4e",
    accent: "#c2543f",
    backAccent: "#1f5a4e",
    lines: [
      { t: "El arte de escribir", s: 47 },
      { t: "nuestros pensamientos", s: 47, accent: true },
    ],
    startY: 150,
  },
  {
    key: "lectura",
    out: "libreta-lectura",
    centerX: 821,
    color: "#4a3a1c",
    accent: "#9a5b27",
    backAccent: "#9a5b27",
    lines: [
      { t: "Donde hay amor", s: 34 },
      { t: "por la lectura,", s: 34 },
      { t: "hay esperanza para el futuro", s: 32, accent: true },
    ],
    author: "Delia Steinberg Guzmán",
    startY: 138,
  },
];

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textSvg(item) {
  let y = item.startY;
  const parts = [];
  for (const line of item.lines) {
    const fill = line.accent ? item.accent : item.color;
    parts.push(
      `<text x="${item.centerX}" y="${y}" fill="${fill}" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="700" font-size="${line.s}" text-anchor="middle">${escapeXml(line.t)}</text>`,
    );
    y += Math.round(line.s * 1.22);
  }
  if (item.author) {
    parts.push(
      `<text x="${item.centerX}" y="${y + 10}" fill="${item.color}" font-family="Arial, sans-serif" font-size="22" font-style="italic" text-anchor="middle" opacity="0.85">— ${escapeXml(item.author)}</text>`,
    );
  }
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024">${parts.join("")}</svg>`,
  );
}

function isBgPixel(r, g, b) {
  const lum = (r + g + b) / 3;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  return lum >= 188 && sat < 20 && Math.abs(r - g) < 10 && Math.abs(g - b) < 12;
}

function isNeutralFill(r, g, b) {
  const lum = (r + g + b) / 3;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  return lum >= 155 && sat < 25 && Math.abs(r - g) < 14;
}

function floodBgMask(data, width, height, channels) {
  const bg = new Uint8Array(width * height);
  const queue = [];
  const key = (x, y) => y * width + x;

  const trySeed = (x, y) => {
    const idx = key(x, y);
    if (bg[idx]) return;
    const i = idx * channels;
    if (!isBgPixel(data[i], data[i + 1], data[i + 2])) return;
    bg[idx] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      trySeed(nx, ny);
    }
  }

  return bg;
}

function stripAttachedShadow(data, width, height, channels, bg) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (bg[y * width + x]) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  for (let y = maxY; y >= minY; y--) {
    let neutral = 0;
    let total = 0;
    for (let x = minX; x <= maxX; x++) {
      const idx = y * width + x;
      if (bg[idx]) continue;
      total++;
      const i = idx * channels;
      if (isNeutralFill(data[i], data[i + 1], data[i + 2])) neutral++;
    }
    if (total === 0 || neutral / total < 0.9) break;
    for (let x = minX; x <= maxX; x++) {
      const idx = y * width + x;
      if (bg[idx]) continue;
      bg[idx] = 1;
    }
  }

  for (let x = maxX; x >= minX; x--) {
    let neutral = 0;
    let total = 0;
    const yStart = minY + Math.round((maxY - minY) * 0.35);
    for (let y = yStart; y <= maxY; y++) {
      const idx = y * width + x;
      if (bg[idx]) continue;
      total++;
      const i = idx * channels;
      if (isNeutralFill(data[i], data[i + 1], data[i + 2])) neutral++;
    }
    if (total === 0 || neutral / total < 0.88) break;
    for (let y = minY; y <= maxY; y++) {
      const idx = y * width + x;
      if (bg[idx]) continue;
      bg[idx] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (bg[idx]) continue;
      const i = idx * channels;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (lum < 45 && x <= minX + 40 && y >= maxY - 28) bg[idx] = 1;
    }
  }
}

/** Mancha/sombra gris o negra en esquina inferior derecha del mockup. */
function stripBottomRightSmudge(data, width, height, channels, bg) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (bg[y * width + x]) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxY <= minY) return;

  const bodyW = maxX - minX + 1;
  const bodyH = maxY - minY + 1;
  const zoneLeft = maxX - Math.max(28, Math.round(bodyW * 0.18));
  const zoneTop = maxY - Math.max(24, Math.round(bodyH * 0.1));
  const spiralX = spiralMaxX(width);

  for (let y = zoneTop; y < height; y++) {
    for (let x = zoneLeft; x < width; x++) {
      const idx = y * width + x;
      if (bg[idx]) continue;
      const i = idx * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (r + g + b) / 3;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      const inCorner = x >= maxX - Math.round(bodyW * 0.12) && y >= maxY - Math.round(bodyH * 0.06);
      if (!inCorner && y <= maxY + 8) continue;
      if (x <= spiralX + 8) continue;
      if ((lum < 178 && sat < 45) || lum < 92) bg[idx] = 1;
    }
  }
}

function stripDarkShadow(data, width, height, channels, bg) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (bg[y * width + x]) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxY <= minY) return;

  const padX = Math.max(32, Math.round((maxX - minX + 1) * 0.1));
  const shadowDepth = Math.max(40, Math.round((maxY - minY + 1) * 0.14));

  for (let y = maxY + 1; y < height; y++) {
    for (let x = 0; x < width; x++) bg[y * width + x] = 1;
  }

  for (let y = maxY; y < Math.min(height, maxY + shadowDepth); y++) {
    const t = (y - maxY) / shadowDepth;
    const lumMax = 210 - t * 95;
    for (let x = minX - padX; x <= maxX + padX + 24; x++) {
      if (x < 0 || x >= width) continue;
      const idx = y * width + x;
      if (bg[idx]) continue;
      const i = idx * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (r + g + b) / 3;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (lum <= lumMax && sat < 42) bg[idx] = 1;
    }
  }
}

async function polishNotebookEdges(pngBuf) {
  const { data, info } = await sharp(pngBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const i = idx * channels;
      if (data[i + 3] < 16) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const stripX = Math.max(24, Math.round((maxX - minX + 1) * 0.08));
  const stripY = Math.max(20, Math.round((maxY - minY + 1) * 0.06));
  const extraY = Math.max(12, Math.round((maxY - minY + 1) * 0.025));

  for (let y = maxY - stripY; y <= maxY + extraY; y++) {
    if (y < 0 || y >= height) continue;
    for (let x = maxX - stripX; x <= maxX + Math.round(stripX * 0.35); x++) {
      if (x < 0 || x >= width) continue;
      const idx = y * width + x;
      const i = idx * channels;
      if (data[i + 3] < 16) continue;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const sat = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
      if (
        isNeutralFill(data[i], data[i + 1], data[i + 2]) ||
        isBgPixel(data[i], data[i + 1], data[i + 2]) ||
        (lum < 175 && sat < 48)
      ) {
        data[i + 3] = 0;
      }
    }
  }

  return sharp(Buffer.from(data), {
    raw: { width, height, channels },
  })
    .trim()
    .png()
    .toBuffer();
}

async function extractNotebook(composedBuf) {
  const { data, info } = await sharp(composedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const bg = floodBgMask(data, width, height, channels);
  stripAttachedShadow(data, width, height, channels, bg);
  stripDarkShadow(data, width, height, channels, bg);
  stripBottomRightSmudge(data, width, height, channels, bg);

  const out = Buffer.from(data);
  for (let idx = 0; idx < width * height; idx++) {
    if (bg[idx]) out[idx * channels + 3] = 0;
  }

  const trimmed = await sharp(out, {
    raw: { width, height, channels },
  })
    .trim()
    .png()
    .toBuffer();

  const polished = await polishNotebookEdges(trimmed);
  const meta = await sharp(polished).metadata();
  const fitted = await fitNotebookCanvas(polished, REF_W, REF_H);
  const fittedMeta = await sharp(fitted).metadata();
  return {
    buffer: fitted,
    width: fittedMeta.width,
    height: fittedMeta.height,
  };
}

async function fitNotebookCanvas(pngBuf, targetW, targetH) {
  const meta = await sharp(pngBuf).metadata();
  const srcW = meta.width ?? targetW;
  const srcH = meta.height ?? targetH;
  const scale = Math.min(targetW / srcW, targetH / srcH);
  const newW = Math.max(1, Math.round(srcW * scale));
  const newH = Math.max(1, Math.round(srcH * scale));
  const left = Math.round((targetW - newW) / 2);
  const top = Math.round((targetH - newH) / 2);
  const resized = await sharp(pngBuf)
    .resize(newW, newH, { kernel: sharp.kernel.lanczos3 })
    .toBuffer();

  return sharp({
    create: {
      width: targetW,
      height: targetH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([{ input: resized, top, left }])
    .png()
    .toBuffer();
}

function spiralMaxX(width) {
  return Math.round(width * SPIRAL_X_RATIO);
}

function isSpiralPixel(x, r, g, b, spiralX) {
  if (x > spiralX) return false;
  const lum = (r + g + b) / 3;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  if (lum < 95 || lum > 235) return false;
  return sat < 48;
}

async function buildCoverReplaceMask(frontBuf, width, height) {
  const { data, info } = await sharp(frontBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { channels } = info;
  const replace = new Uint8Array(width * height);
  const spiralX = spiralMaxX(width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const i = idx * channels;
      const alpha = channels > 3 ? data[i + 3] : 255;
      if (alpha < 16) {
        replace[idx] = 0;
        continue;
      }
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      replace[idx] = isSpiralPixel(x, r, g, b, spiralX) ? 0 : 1;
    }
  }

  return replace;
}

function kraftFromPhotoPixel(r, g, b) {
  const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  const t = Math.min(1, Math.max(0, Math.pow(lum, 0.9)));
  const lr = 235;
  const lg = 228;
  const lb = 212;
  const dr = 207;
  const dg = 192;
  const db = 165;
  return [
    Math.round(dr + (lr - dr) * t),
    Math.round(dg + (lg - dg) * t),
    Math.round(db + (lb - db) * t),
  ];
}

async function buildNotebookBackPlate(frontPath, accent, width, height) {
  const frontBuf = await sharp(frontPath).ensureAlpha().png().toBuffer();

  const { data: frontPx, info: frontInfo } = await sharp(frontBuf)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { channels } = frontInfo;
  const replace = await buildCoverReplaceMask(frontBuf, width, height);
  const out = Buffer.from(frontPx);

  for (let idx = 0; idx < width * height; idx++) {
    if (!replace[idx]) continue;
    const i = idx * channels;
    const [kr, kg, kb] = kraftFromPhotoPixel(
      frontPx[i],
      frontPx[i + 1],
      frontPx[i + 2],
    );
    out[i] = kr;
    out[i + 1] = kg;
    out[i + 2] = kb;
    if (channels > 3) out[i + 3] = 255;
  }

  return sharp(out, {
    raw: { width, height, channels },
  })
    .png()
    .toBuffer();
}

async function buildBack(item, width, height) {
  const frontPath = path.join(OUT, `${item.out}.png`);
  const plateBuf = await buildNotebookBackPlate(
    frontPath,
    item.backAccent,
    width,
    height,
  );
  const lockupBuf = await buildStackedLockupBuffer({ width: LOCKUP_WIDTH });
  const lockupMeta = await sharp(lockupBuf).metadata();
  const spiralW = spiralMaxX(width);
  const coverCenter = spiralW + Math.round((width - spiralW) / 2);
  const lockupLeft =
    coverCenter - Math.round((lockupMeta.width ?? LOCKUP_WIDTH) / 2);
  const bottomPad = Math.max(48, Math.round(height * 0.075));
  const lockupTop = height - (lockupMeta.height ?? 0) - bottomPad;

  await sharp(plateBuf)
    .composite([{ input: lockupBuf, top: lockupTop, left: lockupLeft }])
    .png()
    .toFile(path.join(OUT, `${item.out}-back.png`));

  console.log("Contraportada:", `${item.out}-back.png`);
}

async function build() {
  for (const item of ITEMS) {
    const base = path.join(SRC, `libreta-base-${item.key}.png`);
    const composed = await sharp(base)
      .composite([{ input: textSvg(item), top: 0, left: 0 }])
      .png()
      .toBuffer();

    const { buffer, width, height } = await extractNotebook(composed);
    await sharp(buffer).png().toFile(path.join(OUT, `${item.out}.png`));
    await buildBack(item, width, height);

    console.log("Libreta:", `${item.out}.png`, `${width}x${height}`);
  }
}

build();
