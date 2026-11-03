// File: lib/hero-slides.ts
//
// Source of truth for the decorative hero background slider.
//
// Resolution order (first non-empty wins — but the committed list always paints first,
// so first paint never waits on a network request):
//   1. Cloudinary tag HERO_TAG          ("hero")
//   2. Cloudinary tag HERO_FALLBACK_TAG ("deals") — the tag the Deals gallery already uses
//   3. HERO_SLIDES below                 — committed fallback list
//
// Tag listing is public on this account (verified: res.cloudinary.com/dsmgnh5rj/image/list/deals.json
// returns 200 with `access-control-allow-origin: *`), so NO api key / build secret is needed
// and retagging an image in Cloudinary is enough to update the hero — no redeploy.

import { CLOUDINARY_BASE } from "@/lib/cloudinary";

export interface HeroSlide {
  /** Cloudinary public id (no file extension — that is how the list endpoint returns it). */
  publicId: string;
  /** Decorative layer → always empty alt. Kept for future use. */
  alt: string;
}

export const HERO_TAG = "hero";
export const HERO_FALLBACK_TAG = "deals";

/** Crossfade every ~6.5s … */
export const HERO_SLIDE_DURATION_MS = 6500;
/** … over 1.2s, so the change reads as a slow drift through the scrim. */
export const HERO_CROSSFADE_MS = 1200;
/** Cap: every extra slide is another ~150KB of Cloudinary bandwidth. */
export const MAX_HERO_SLIDES = 5;

/**
 * Committed, curated landscape assets from the live `deals` tag. Keep these high-res so
 * the LCP file is sharp on a large desktop. To swap in new images, copy `public_id` values
 * from https://res.cloudinary.com/dsmgnh5rj/image/list/hero.json (or `deals.json`).
 */
export const HERO_SLIDES: HeroSlide[] = [
  { publicId: "5f7c79ba-d438-429e-b612-6b0aba2b6e4f_bloy62", alt: "" }, // 2048x1188
  { publicId: "3e809a48-d973-4b91-bef0-2e495f63035a_tsfhsp", alt: "" }, // 2048x1536
  { publicId: "148d01a2-0da0-4af1-89c4-b86939e957bb_icoh7l", alt: "" }, // 2048x1536
  { publicId: "635f84ee-03f9-4eea-ab11-89b9af7f0a55_fokkid", alt: "" }, // 1600x1200
  { publicId: "f70e53e6-dfb3-4ff2-b2c9-60097d774cd9_nsveex", alt: "" }, // 1600x1200
];

interface CloudinaryListResource {
  public_id: string;
  width: number;
  height: number;
  created_at?: string;
}

interface CloudinaryListResponse {
  resources?: Array<Partial<CloudinaryListResource>>;
}

async function listTag(tag: string): Promise<CloudinaryListResource[]> {
  try {
    const response = await fetch(`${CLOUDINARY_BASE}/image/list/${tag}.json`);
    if (!response.ok) return [];
    const data = (await response.json()) as CloudinaryListResponse;
    return (data.resources ?? []).filter(
      (resource): resource is CloudinaryListResource =>
        typeof resource.public_id === "string" &&
        typeof resource.width === "number" &&
        typeof resource.height === "number" &&
        resource.width >= resource.height // landscape only — portraits make poor full-bleed backdrops
    );
  } catch {
    // Offline / blocked / CDN hiccup → the committed list above keeps the hero working.
    return [];
  }
}

/**
 * Fetch the hero slides straight from Cloudinary: newest first, capped at MAX_HERO_SLIDES.
 * Falls back from HERO_TAG to HERO_FALLBACK_TAG, and returns [] if neither has landscape assets.
 */
export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  for (const tag of [HERO_TAG, HERO_FALLBACK_TAG]) {
    const resources = await listTag(tag);
    const slides = [...resources]
      .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
      .slice(0, MAX_HERO_SLIDES)
      .map((resource) => ({ publicId: resource.public_id, alt: "" }));

    if (slides.length > 0) return slides;
  }
  return [];
}
