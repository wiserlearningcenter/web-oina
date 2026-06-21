import type { NextConfig } from "next";

/** `output: export` solo al hacer build (cPanel). En `dev` evita errores 500 en el navegador. */
const nextConfig: NextConfig = {
  ...(process.env.npm_lifecycle_event === "build"
    ? { output: "export" as const }
    : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
