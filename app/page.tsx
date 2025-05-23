// File: app/page.tsx
"use client"; // This page now uses a client-side hook

import Image from "next/image";
import { useSectionInView } from "@/lib/hooks"; // Import the hook
import { links } from "@/lib/data"; // To get section names easily (optional, can hardcode)

export default function Home() {
  // --- Data Flow: Connecting Sections to Context ---
  // For each section, `useSectionInView` is called:
  // a. It takes the `SectionName` (e.g., "Home", "Services") as an argument.
  // b. It returns a `ref` object.
  // c. This `ref` is attached to the corresponding `<section>` element.
  // d. When the section scrolls into view (based on the threshold in the hook),
  //    the hook's internal `useEffect` calls `setActiveSection` (from the context),
  //    updating the global state. This, in turn, causes the `Header` to re-render
  //    and highlight the correct link.

  const { ref: homeRef } = useSectionInView("Home", 0.5); // 0.5 threshold for home, adjust as needed
  const { ref: servicesRef } = useSectionInView("Services");
  const { ref: aboutUsRef } = useSectionInView("About Us"); // Ensure names match lib/data.ts
  const { ref: contactRef } = useSectionInView("Contact");

  return (
    <main className="flex flex-col items-center px-4">
      <section
        ref={homeRef}
        id="home"
        className="h-screen bg-blue-100 w-full flex items-center justify-center scroll-mt-19" // UPDATED scroll-mt
      >
        <h1 className="text-4xl">Home Section (UNDER_CONSTRUCTION)</h1>
      </section>

      <section
        ref={servicesRef}
        id="services"
        className="h-screen bg-green-100 w-full flex items-center justify-center scroll-mt-19" // UPDATED scroll-mt
      >
        <h2 className="text-3xl">Services Section</h2>
      </section>

      <section
        ref={aboutUsRef}
        id="about-us"
        className="h-screen bg-yellow-100 w-full flex items-center justify-center scroll-mt-19" // UPDATED scroll-mt
      >
        <h2 className="text-3xl">About Us Section</h2>
      </section>

      <section
        ref={contactRef}
        id="contact"
        className="h-screen bg-purple-100 w-full flex items-center justify-center scroll-mt-19" // UPDATED scroll-mt
      >
        <h2 className="text-3xl">Contact Section</h2>
      </section>
    </main>
  );
}