
"use client"; 

import { useSectionInView } from "@/lib/hooks"; // Import the hook
import Contact from "@/components/Contact";


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
    // const { ref: contactRef } = useSectionInView("Contact"); // contactRef is handled inside Contact.tsx nowv

  return (
    <main className="flex flex-col items-center px-4">
      <section
        ref={homeRef}
        id="home"
        className="h-screen bg-blue-100 w-full flex items-center justify-center" // UPDATED scroll-mt
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

{/*
        The Contact component itself is a <motion.section> with id="contact".
        It also internally calls useSectionInView("Contact").
        So, we don't need to wrap it in another <section> tag here,
        nor do we need to call useSectionInView for "Contact" here in page.tsx.
        The `scroll-mt` will be applied by the `id="contact"` on the <motion.section>
        within Contact.tsx, but we should ensure it has the correct scroll margin.
        Let's add it to the Contact.tsx itself if needed or rely on the section structure.

        For simplicity and consistency with other sections, let's wrap it,
        but the `id` and `ref` are effectively managed by the Contact component.
        Alternatively, let Contact component handle its own top-level <section> and scroll-margin.
        The AnikaPortfolio's Contact component is already a <motion.section>, so we'll use that.
      */}
      {/* No need for an outer section tag here, Contact.tsx provides its own */}
      <Contact />

    </main>
  );
}