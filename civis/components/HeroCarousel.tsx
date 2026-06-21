"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroImage } from "@/lib/hero-images";

type Props = {
  images: HeroImage[];
  intervalMs?: number;
  priorityFirst?: boolean;
  defaultObjectPosition?: string;
  className?: string;
};

export function HeroCarousel({
  images,
  intervalMs = 5500,
  priorityFirst = false,
  defaultObjectPosition = "50% 30%",
  className = "absolute inset-0",
}: Props) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const visibleImages = images.filter((img) => img.src?.trim());
  const n = visibleImages.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduceMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
  }, []);

  useEffect(() => {
    if (n <= 1 || reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), intervalMs);
    return () => clearInterval(t);
  }, [n, intervalMs, reduceMotion]);

  if (n === 0) return null;

  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-hidden
    >
      {visibleImages.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{
              objectPosition: img.objectPosition ?? defaultObjectPosition,
            }}
            priority={priorityFirst && i === 0}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
