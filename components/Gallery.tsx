// File: components/Gallery.tsx
import { useEffect, useRef } from "react";

// Define a more specific type for the gallery widget instance
interface GalleryWidgetInstance {
  render: () => void;
  destroy?: () => void; // Make destroy optional as it's a common cleanup method, but not guaranteed
  // If you discover other methods or properties used by the widget,
  // you can add them here for better type safety.
  // Using 'unknown' for other potential properties is safer than 'any'.
  [key: string]: unknown;
}

declare global {
  interface Window {
    cloudinary?: {
      // Update the return type of galleryWidget to use our defined interface
      galleryWidget: (options: Record<string, unknown>) => GalleryWidgetInstance;
    };
  }
}

function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Use the more specific type for the ref, allowing it to be null initially
  const widgetInstanceRef = useRef<GalleryWidgetInstance | null>(null);

  useEffect(() => {
    const galleryDiv = containerRef.current;

    if (!galleryDiv) {
      console.warn("Gallery container div not yet available.");
      return;
    }

    let intervalId: NodeJS.Timeout | null = null;

    const initGallery = () => {
      // Check if the Cloudinary script and galleryWidget function are available
      if (window.cloudinary && typeof window.cloudinary.galleryWidget === 'function') {
        console.log("Cloudinary script loaded. Initializing gallery widget.");
        
        // Clean up previous widget instance if it exists and has a destroy method
        if (widgetInstanceRef.current && typeof widgetInstanceRef.current.destroy === 'function') {
          try {
            widgetInstanceRef.current.destroy(); 
            console.log("Previous gallery widget instance destroyed.");
          } catch (e) {
            console.warn("Error destroying previous widget instance:", e);
          }
        }
        // Ensure the container is empty before rendering a new widget
        while (galleryDiv.firstChild) {
          galleryDiv.removeChild(galleryDiv.firstChild);
        }

        const widget = window.cloudinary.galleryWidget({
          container: galleryDiv,
          cloudName: "makeup", // IMPORTANT: Replace with your actual Cloudinary cloud name
          aspectRatio: "16:9",
          zoom: false,
          bgColor: "#F9FAFB",
          themeProps: {
            primary: "#000000",
            onPrimary: "#FFFFFF",
          },
          mediaAssets: [
            {
              tag: "web", // IMPORTANT: Ensure 'web' tag exists in your Cloudinary library and has assets
              transformation: {
                crop: "fill",
              },
            },
            {
              tag: "web-video", // IMPORTANT: Ensure 'web-video' tag exists and has video assets
              mediaType: "video",
            },
          ],
          carouselStyle: "thumbnails",
          carouselLocation: "left",
          viewportBreakpoints: [
            { breakpoint: 768, carouselStyle: "thumbnails", carouselLocation: "bottom" },
            { breakpoint: 480, carouselStyle: "indicators", carouselLocation: "bottom", navigation: "always" },
          ],
          // loading: { // The file /images/makeup-loader.svg was not found in your project structure.
          //   style: "custom", // If you have this SVG, place it in `public/images/makeup-loader.svg` and uncomment.
          //   url: "/images/makeup-loader.svg", 
          // },
        });
        
        widget.render();
        widgetInstanceRef.current = widget; // Store the new widget instance

        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        return true; // Initialization successful
      }
      return false; // Cloudinary not ready
    };

    if (!initGallery()) {
      console.log("Cloudinary script not ready, starting poll mechanism...");
      intervalId = setInterval(() => {
        if (initGallery()) {
          console.log("Cloudinary script became available via polling. Widget initialized.");
        }
      }, 500); // Poll every 500ms
    }

    // Cleanup function for when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (widgetInstanceRef.current && typeof widgetInstanceRef.current.destroy === 'function') {
        console.log("Destroying Cloudinary gallery widget instance on unmount.");
        try {
          widgetInstanceRef.current.destroy();
        } catch (e) {
            console.warn("Error destroying widget instance on unmount:", e);
        }
      }
      widgetInstanceRef.current = null;
    };
  }, []); // Empty dependency array

  return <div ref={containerRef} style={{ width: "100%", minHeight: "400px" }} />;
}

export default Gallery;