// File: components/Gallery.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary?: {
      galleryWidget: (options: Record<string, unknown>) => { 
        render: () => void;
        // You can add other methods here if you know them, e.g., destroy(): void;
        [key: string]: any; // Allows for other properties/methods on the widget instance
      };
    };
  }
}

function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetInstanceRef = useRef<any>(null); // To store the widget instance

  useEffect(() => {
    const galleryDiv = containerRef.current;

    if (!galleryDiv) {
      // This shouldn't happen if the div is part of the component's static JSX
      console.warn("Gallery container div not yet available.");
      return;
    }

    let intervalId: NodeJS.Timeout | null = null;

    const initGallery = () => {
      // Check if the Cloudinary script and galleryWidget function are available
      if (window.cloudinary && typeof window.cloudinary.galleryWidget === 'function') {
        console.log("Cloudinary script loaded. Initializing gallery widget.");
        
        // Clear previous widget if any, or if container has old content
        if (widgetInstanceRef.current && typeof widgetInstanceRef.current.destroy === 'function') {
          // Ideal if widget has a destroy method
          // widgetInstanceRef.current.destroy(); 
        }
        // Ensure the container is empty before rendering a new widget
        while (galleryDiv.firstChild) {
          galleryDiv.removeChild(galleryDiv.firstChild);
        }

        const widget = window.cloudinary.galleryWidget({
          container: galleryDiv,
          // IMPORTANT: Replace "makeup" with your actual Cloudinary cloud name
          cloudName: "makeup", 
          aspectRatio: "16:9",
          zoom: false,
          bgColor: "#F9FAFB",
          themeProps: {
            primary: "#000000",
            onPrimary: "#FFFFFF",
          },
          mediaAssets: [
            {
              // IMPORTANT: Ensure 'web' tag exists in your Cloudinary library and has assets
              tag: "web", 
              transformation: {
                crop: "fill",
              },
            },
            {
              // IMPORTANT: Ensure 'web-video' tag exists and has video assets
              tag: "web-video", 
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

        // If we were polling, stop it
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        return true; // Initialization successful
      }
      // console.log("Cloudinary script not yet available or galleryWidget function missing.");
      return false; // Cloudinary not ready
    };

    // Attempt to initialize. If window.cloudinary is not ready, start polling.
    if (!initGallery()) {
      console.log("Cloudinary script not ready, starting poll mechanism...");
      intervalId = setInterval(() => {
        if (initGallery()) {
          console.log("Cloudinary script became available via polling. Widget initialized.");
          // Interval will be cleared inside initGallery upon success
        }
      }, 500); // Poll every 500ms
    }

    // Cleanup function for when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      // Attempt to clean up the widget if it has a destroy method (this is speculative)
      if (widgetInstanceRef.current && typeof widgetInstanceRef.current.destroy === 'function') {
        console.log("Destroying Cloudinary gallery widget instance on unmount.");
        widgetInstanceRef.current.destroy();
      }
      widgetInstanceRef.current = null;
    };
  }, []); // Empty dependency array: effect runs once after mount. Polling handles async script load.

  // Ensure the container div has some dimensions, otherwise the gallery might not be visible.
  // Adjust width/height as needed for your design.
  return <div ref={containerRef} style={{ width: "100%", minHeight: "400px" }} />;
}

export default Gallery;