"use client";

import Image, { type ImageProps } from "next/image";
import { resolveCmsMediaUrl } from "@/lib/cms/api-client";

function resolveMediaSrc(src?: string | null): string | undefined {
  const trimmed = src?.trim();
  if (!trimmed) return undefined;
  return resolveCmsMediaUrl(trimmed) ?? trimmed;
}

/** Imagen del sitio o subida al CMS (/uploads/civis/… → API en :3401). */
export function CivisMediaImage({
  src,
  unoptimized = true,
  alt = "",
  className,
  fill,
  ...props
}: Omit<ImageProps, "src"> & { src?: string | null }) {
  const resolved = resolveMediaSrc(src);
  if (!resolved) {
    if (fill) {
      return (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-na-civis/10 text-sm text-na-muted ${className ?? ""}`.trim()}
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
        >
          Sin imagen
        </div>
      );
    }
    return null;
  }

  return (
    <Image
      {...props}
      fill={fill}
      className={className}
      src={resolved}
      alt={alt}
      unoptimized={unoptimized}
    />
  );
}
