import type { NextConfig } from "next";

/** Export estático para cPanel (sin Node en el servidor). */
const nextConfig: NextConfig = {
  output: "export",
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  /** Permite imports desde `../editor/data/` en dev y build del monorepo. */
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
