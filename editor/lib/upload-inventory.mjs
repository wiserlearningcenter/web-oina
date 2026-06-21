import fs from "node:fs";
import path from "node:path";

/** Recoge URLs de uploads referenciadas en un valor JSON. */
export function collectUploadPaths(value, site, found = new Set()) {
  const prefix = `/uploads/${site}/`;

  if (typeof value === "string") {
    const idx = value.indexOf(prefix);
    if (idx !== -1) {
      const rest = value.slice(idx + prefix.length).split(/[?#"'\s]/)[0];
      if (rest) found.add(`${prefix}${rest}`);
    }
    return found;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectUploadPaths(item, site, found);
    return found;
  }

  if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectUploadPaths(v, site, found);
  }

  return found;
}

export function readReferencedUploads(site, dataDir) {
  const referenced = new Set();
  for (const kind of ["draft.json", "published.json"]) {
    const file = path.join(dataDir, site, kind);
    if (!fs.existsSync(file)) continue;
    const doc = JSON.parse(fs.readFileSync(file, "utf8"));
    collectUploadPaths(doc, site, referenced);
  }
  return referenced;
}

/**
 * Lista archivos en data/{site}/uploads/ y marca si están referenciados en draft o published.
 * `relativePath` es la ruta relativa desde data/{site}/ para localizar en cPanel.
 */
export function buildUploadInventory(site, dataDir) {
  const uploadsPath = path.join(dataDir, site, "uploads");
  if (!fs.existsSync(uploadsPath)) {
    return { files: [], referencedCount: 0, orphanCount: 0 };
  }

  const referenced = readReferencedUploads(site, dataDir);
  const files = fs
    .readdirSync(uploadsPath)
    .filter((f) => !f.startsWith("."))
    .map((filename) => {
      const fp = path.join(uploadsPath, filename);
      const stat = fs.statSync(fp);
      const publicPath = `/uploads/${site}/${filename}`;
      const inUse = referenced.has(publicPath);
      return {
        filename,
        publicPath,
        relativePath: `uploads/${filename}`,
        sizeBytes: stat.size,
        modifiedAt: stat.mtime.toISOString(),
        inUse,
        status: inUse ? "in_use" : "orphan",
      };
    })
    .sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));

  const orphanCount = files.filter((f) => !f.inUse).length;
  return {
    files,
    referencedCount: files.length - orphanCount,
    orphanCount,
    uploadsFolder: `data/${site}/uploads/`,
  };
}
