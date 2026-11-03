// File: components/CloudinaryHeroSlider.tsx
"use client";

// `<img>` (not `next/image`) is intentional: with `images.unoptimized: true` (next.config.ts)
// `next/image` emits no `srcSet`, and the point is to let Cloudinary resize + negotiate
// format per breakpoint via `srcSet`/`sizes`.

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cloudinaryImageUrl, cloudinarySrcSet } from "@/lib/cloudinary";
import {
  HERO_CROSSFADE_MS,
  HERO_SLIDE_DURATION_MS,
  HERO_SLIDES,
  MAX_HERO_SLIDES,
  fetchHeroSlides,
  type HeroSlide,
} from "@/lib/hero-slides";

/**
 * Readability wash. Tuned for the "muted texture" look that was chosen with the client:
 * the logo and the existing light-blue logistics animation keep their current contrast while
 * the photos read as a slow colour/shape drift behind them.
 * To show more photo, lower the opacities (e.g. /70 /60); to mute further, raise them.
 */
export const HERO_SCRIM_CLASSES =
  "bg-gradient-to-b from-white/88 via-white/84 to-gray-50/95 dark:from-gray-950/92 dark:via-gray-950/88 dark:to-gray-900/95";

/** Desktop is composed 16:9; a phone viewport is tall, so it gets a 9:16 crop — otherwise
 *  `object-cover` would chop a portrait screen down to a thin sliver of the 16:9 frame. */
const DESKTOP_ASPECT = 16 / 9;
const MOBILE_ASPECT = 9 / 16;
const DESKTOP_WIDTHS = [1280, 1920, 2560];
const MOBILE_WIDTHS = [480, 768, 1080];

interface CloudinaryHeroSliderProps {
  /** Override the slides (defaults to committed list, then Cloudinary tags). */
  slides?: HeroSlide[];
  intervalMs?: number;
  fadeMs?: number;
  /** Extra classes for the photo wrapper. */
  className?: string;
  /** Readability wash — override to re-tune without touching the component. */
  overlayClassName?: string;
  /** Pull fresh slides from the `hero` / `deals` tag after first paint. */
  syncFromTag?: boolean;
}

export default function CloudinaryHeroSlider({
  slides: slidesProp,
  intervalMs = HERO_SLIDE_DURATION_MS,
  fadeMs = HERO_CROSSFADE_MS,
  className,
  overlayClassName = HERO_SCRIM_CLASSES,
  syncFromTag = true,
}: CloudinaryHeroSliderProps) {
  const prefersReducedMotion = useReducedMotion();

  const [slides, setSlides] = useState<HeroSlide[]>(() =>
    (slidesProp ?? HERO_SLIDES).slice(0, MAX_HERO_SLIDES)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  // Stage the extra slides in after first paint (one more every 1.5s) so the initial load
  // is only the single LCP image, but the next slide is always ready before its crossfade.
  const [stagedCount, setStagedCount] = useState(1);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pause the rotation while the hero is off-screen …
  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // … or the tab is in the background.
  useEffect(() => {
    const onVisibilityChange = () =>
      setIsDocumentHidden(document.visibilityState === "hidden");
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Optional: pick up newly tagged Cloudinary images without a redeploy. First paint always
  // uses the committed list, so this swap causes no flash and no CLS.
  useEffect(() => {
    if (!syncFromTag || slidesProp) return;

    let cancelled = false;
    fetchHeroSlides()
      .then((fresh) => {
        if (cancelled || fresh.length === 0) return;
        setSlides(fresh);
        setActiveIndex((current) => (current < fresh.length ? current : 0));
      })
      .catch(() => {
        /* committed list keeps rendering */
      });

    return () => {
      cancelled = true;
    };
  }, [slidesProp, syncFromTag]);

  // Trickle in the remaining slides after the LCP image. Skip entirely under
  // reduced-motion: the slider is a static single frame there, so extra slides
  // would only waste bandwidth.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (stagedCount >= slides.length) return;
    const timer = window.setTimeout(
      () => setStagedCount((count) => count + 1),
      1500
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, stagedCount, slides.length]);

  const canRotate =
    !prefersReducedMotion && slides.length > 1 && isInView && !isDocumentHidden;

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [canRotate, intervalMs, slides.length]);

  const removeSlide = useCallback((publicId: string) => {
    setSlides((current) => {
      if (current.length <= 1) return current;
      const next = current.filter((slide) => slide.publicId !== publicId);
      return next.length > 0 ? next : current;
    });
    setActiveIndex(0);
  }, []);

  if (slides.length === 0) return null;

  const safeIndex = activeIndex % slides.length;
  // Always keep the outgoing slide mounted through its fade, and stage in the next one.
  const renderCount = Math.max(stagedCount, safeIndex + 1);
  // Reduce at reduced-motion: no fade, single static slide.
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: fadeMs / 1000, ease: "easeInOut" as const };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gray-50 dark:bg-gray-900 ${className ?? ""}`}
    >
      {slides.slice(0, Math.min(renderCount, slides.length)).map((slide, index) => (
        <motion.div
          key={slide.publicId}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: index === safeIndex ? 1 : 0 }}
          transition={transition}
          style={{ willChange: "opacity" }}
        >
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={cloudinarySrcSet(slide.publicId, MOBILE_WIDTHS, MOBILE_ASPECT, {
                quality: "auto:eco",
              })}
              sizes="100vw"
            />
            <img
              src={cloudinaryImageUrl(slide.publicId, {
                width: 1920,
                height: 1080,
                quality: "auto:eco",
              })}
              srcSet={cloudinarySrcSet(slide.publicId, DESKTOP_WIDTHS, DESKTOP_ASPECT, {
                quality: "auto:eco",
              })}
              sizes="100vw"
              alt=""
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              onError={() => removeSlide(slide.publicId)}
            />
          </picture>
        </motion.div>
      ))}

      {/* Readability wash — keeps the logo and the existing logistics animation legible. */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
