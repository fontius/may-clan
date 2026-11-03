// File: lib/cloudinary.ts
//
// Helpers for building Cloudinary delivery URLs in the browser.
// The cloud name is public by design (it already ships as a literal `cloudName` in
// components/Gallery.tsx), so nothing here needs an API key. That matters because
// next.config.ts sets `output: 'export'` — there is no server runtime to keep secrets on.

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dsmgnh5rj";

export const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

export type CloudinaryCrop = "fill" | "fit" | "limit" | "scale";

export interface CloudinaryImageOptions {
  /** Target width in CSS px (the `w_` transform). */
  width: number;
  /** Target height in CSS px. Omit to keep the source aspect ratio. */
  height?: number;
  /** `fill` crops to the exact w/h box — what a full-bleed background needs. */
  crop?: CloudinaryCrop;
  /** `auto` = Cloudinary content-aware gravity, so crops keep the subject. */
  gravity?: string;
  /** `auto:eco` is plenty here: the hero scrim hides compression artefacts. */
  quality?: string;
  /** `auto` negotiates AVIF/WebP from the Accept header. */
  format?: string;
}

/**
 * Build a single Cloudinary delivery URL.
 *
 *   cloudinaryImageUrl("abc123", { width: 1920, height: 1080 })
 *   -> https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,c_fill,g_auto,w_1920,h_1080/abc123
 */
export function cloudinaryImageUrl(
  publicId: string,
  {
    width,
    height,
    crop = "fill",
    gravity = "auto",
    quality = "auto",
    format = "auto",
  }: CloudinaryImageOptions
): string {
  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    `g_${gravity}`,
    `w_${Math.round(width)}`,
  ];
  if (height) transforms.push(`h_${Math.round(height)}`);

  return `${CLOUDINARY_BASE}/image/upload/${transforms.join(",")}/${publicId}`;
}

/**
 * Build a `srcSet` for a fixed aspect ratio, so the browser downloads the smallest
 * file that still covers the viewport.
 */
export function cloudinarySrcSet(
  publicId: string,
  widths: number[],
  aspectRatio: number,
  options: Omit<CloudinaryImageOptions, "width" | "height"> = {}
): string {
  return widths
    .map((width) => {
      const height = Math.round(width / aspectRatio);
      return `${cloudinaryImageUrl(publicId, { ...options, width, height })} ${width}w`;
    })
    .join(", ");
}
