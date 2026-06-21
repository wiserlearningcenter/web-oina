/**
 * Obtiene shortcodes recientes del perfil @nuevaacropolisdominicana
 * y descarga thumbnails locales para el carrusel.
 * Uso: node scripts/fetch-instagram-posts.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { downloadAsWebp } from "./image-webp.mjs";

const USERNAME = "nuevaacropolisdominicana";
const PROFILE_URL = `https://www.instagram.com/${USERNAME}/`;
const INSTAGRAM_PROFILE = `https://www.instagram.com/${USERNAME}/`;
const MAX_POSTS = 6;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = join(ROOT, "public", "img", "instagram");
const HOME = join(ROOT, "lib", "home-content.ts");

async function fetchRecentPosts() {
  const res = await fetch(PROFILE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${PROFILE_URL}`);
  const html = await res.text();

  const shortcodes = [];
  const seen = new Set();
  for (const m of html.matchAll(/"shortcode":"([A-Za-z0-9_-]+)"/g)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    shortcodes.push(m[1]);
    if (shortcodes.length >= MAX_POSTS) break;
  }

  if (shortcodes.length === 0) {
    throw new Error("No se encontraron publicaciones en el perfil de Instagram.");
  }

  const posts = [];
  for (let i = 0; i < shortcodes.length; i++) {
    const code = shortcodes[i];
    const oembedUrl = `https://www.instagram.com/p/${code}/embed/captioned/`;
    const embedRes = await fetch(oembedUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const embedHtml = embedRes.ok ? await embedRes.text() : "";
    const thumbMatch =
      embedHtml.match(/src="(https:\/\/[^"]+\.jpg[^"]*)"/) ??
      embedHtml.match(/srcset="(https:\/\/[^"\s]+)/);
    const thumbUrl = thumbMatch?.[1]?.replace(/&amp;/g, "&");
    if (!thumbUrl) {
      console.warn(`  Sin thumbnail para /p/${code}/ — se omite`);
      continue;
    }

    const file = `${code}.webp`;
    const publicPath = await downloadAsWebp(
      thumbUrl,
      DEST,
      "img/instagram",
      file,
    );
    posts.push({
      src: publicPath,
      alt: `Publicación de @${USERNAME} en Instagram`,
      href: `https://www.instagram.com/p/${code}/`,
    });
    console.log(`  /p/${code}/ → ${publicPath}`);
  }

  return posts;
}

const posts = await fetchRecentPosts();

const block = `/** Publicaciones recientes — @${USERNAME} (imágenes locales WebP). */
export const INSTAGRAM_POSTS: InstagramPost[] = [
${posts
  .map(
    (p) => `  {
    src: "${p.src}",
    alt: "${p.alt}",
    href: "${p.href}",
  }`,
  )
  .join(",\n")}
];`;

let text = readFileSync(HOME, "utf8");
text = text.replace(
  /\/\*\* Publicaciones recientes[\s\S]*?export const INSTAGRAM_POSTS: InstagramPost\[\] = \[[\s\S]*?\];/,
  block,
);

writeFileSync(HOME, text, "utf8");
console.log(`Actualizado lib/home-content.ts (${posts.length} publicaciones)`);
