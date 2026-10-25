// File: components/Gallery.tsx
"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

// Define a more specific type for the gallery widget instance
interface GalleryWidgetInstance {
  render: () => void;
  destroy?: () => void;
  [key: string]: unknown;
}

declare global {
  interface Window {
    cloudinary?: {
      galleryWidget: (options: Record<string, unknown>) => GalleryWidgetInstance;
    };
  }
}

function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetInstanceRef = useRef<GalleryWidgetInstance | null>(null);

  const initGallery = useCallback(() => {
    const galleryDiv = containerRef.current;
    if (!galleryDiv) return;
    if (!(window.cloudinary && typeof window.cloudinary.galleryWidget === "function")) return;

    // Clean up any previous widget instance before re-rendering
    if (widgetInstanceRef.current && typeof widgetInstanceRef.current.destroy === "function") {
      try {
        widgetInstanceRef.current.destroy();
      } catch (e) {
        console.warn("Error destroying previous gallery widget instance:", e);
      }
    }

    // Ensure the container is empty before rendering a new widget
    while (galleryDiv.firstChild) {
      galleryDiv.removeChild(galleryDiv.firstChild);
    }

    const widget = window.cloudinary.galleryWidget({
      container: galleryDiv,
      cloudName: "dsmgnh5rj",
      aspectRatio: "16:9",
      zoom: false,
      bgColor: "#F9FAFB",
      themeProps: {
        primary: "#000000",
        onPrimary: "#FFFFFF",
      },
      mediaAssets: [
        {
          tag: "deals",
          transformation: {
            crop: "fill",
          },
        },
      ],
      carouselStyle: "thumbnails",
      carouselLocation: "left",
      viewportBreakpoints: [
        { breakpoint: 768, carouselStyle: "thumbnails", carouselLocation: "bottom" },
        { breakpoint: 480, carouselStyle: "indicators", carouselLocation: "bottom", navigation: "always" },
      ],
    });

    widget.render();
    widgetInstanceRef.current = widget;
  }, []);

  // Initialize once the Cloudinary script finished loading.
  // Also covers StrictMode re-mounts / a cached script from a previous page load.
  useEffect(() => {
    if (window.cloudinary && typeof window.cloudinary.galleryWidget === "function") {
      initGallery();
    }
  }, [initGallery]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (widgetInstanceRef.current && typeof widgetInstanceRef.current.destroy === "function") {
        try {
          widgetInstanceRef.current.destroy();
        } catch (e) {
          console.warn("Error destroying widget instance on unmount:", e);
        }
      }
      widgetInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", minHeight: "400px" }} />
      <Script
        src="https://product-gallery.cloudinary.com/all.js"
        strategy="afterInteractive"
        onLoad={initGallery}
      />
    </>
  );
}

export default Gallery;
