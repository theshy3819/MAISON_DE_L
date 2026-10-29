import type { NextConfig } from "next";

/*
 * Static export for GitHub Pages. The site is served from /MAISON_DE_L/, which the
 * deploy workflow passes in as NEXT_PUBLIC_BASE_PATH; locally it stays at the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimiser; photos are pre-sized JPEGs in /public
    unoptimized: true,
  },
};

export default nextConfig;
