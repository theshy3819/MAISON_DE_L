/**
 * Prefix for files in /public. GitHub Pages serves the site from /MAISON_DE_L/, and next/image
 * does not add basePath to plain string sources, so every public path goes through here.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
