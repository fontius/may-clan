
"use client"; 

import { useSectionInView } from "@/lib/hooks"; // Import the hook
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Image from 'next/image';
import AnimatedLogisticsBackground from "@/components/AnimatedLogisticsBackground";



export default function Home() {


  const { ref: homeRef } = useSectionInView("Home", 0.5); // 0.5 threshold for home, adjust as needed
  const { ref: aboutRef } = useSectionInView("About Us");
  const { ref: servicesRef } = useSectionInView("Services");
  // Ensure names match lib/data.ts
 

    // const { ref: contactRef } = useSectionInView("Contact"); // contactRef is handled inside Contact.tsx nowv

  return (
    <main className="flex flex-col items-center px-4">
      <section
        ref={homeRef}
        id="home"
        className="h-screen bg-gray-50 dark:bg-gray-900 w-full flex flex-col items-center justify-center px-4 scroll-mt-19 relative overflow-hidden"
      >
        

        <div className="text-center max-w-4xl z-10">

          {/* May-Clan Logo */}
          <div className="mb-8 flex flex-col items-center">
            <Image 
              src="/images/logobig.png" 
              alt="May-Clan Logo"
              width={216}
              height={72}
              className="w-[162px] h-[54px] md:w-[216px] md:h-[72px] mb-6"
            />

            {/* Company Name and Tagline with fluid typography */}
            <div className="mb-8">
              <AnimatedLogisticsBackground />
              <p className="text-base md:text-lg font-medium mb-2 text-sky-700 dark:text-sky-400">Procurement &gt; Logistics &gt; Delivery.</p>
              <h2 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">Your Trusted Partner for Outsourcing / Order Processing / Cartage / Shipping &amp; Delivery services.</h2>
            </div>
          </div>

          {/* Introductory Content with fade-in */}
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Seamless Services &amp; Delivery.</h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              May-Clan offers comprehensive and reliable cargo handling and freight forwarding services globally.
              We facilitate your consignments with utmost diligence &amp; timeliness.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-sky-700 dark:text-sky-400">Commitment:</span>{" "}
              At May-Clan, we provide a suite of specialized logistics solutions designed to effortlessly make
              cargo handling &amp; international shipping seamless &amp; efficient.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={aboutRef}
        id="about"
        className="bg-white dark:bg-gray-900 w-full flex flex-col items-center scroll-mt-19 py-16 md:py-24"
      >
        <div className="w-full max-w-4xl px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">About Us</h3>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              May-Clan is a business conceived from the desire to make a difference. The company was built solely on
              the principle of integrity hence our unwavering disposition to absolute professionalism.
            </p>
            <p>
              Since its inception in 2008, May-Clan has evolved into a reputable service provider synonymous with
              quality and efficient services.
            </p>
            <p>
              With an affiliate team of dedicated professionals, May-Clan remains innovative and dynamic in our quest
              to safely get your goods to your door steps and promote your best interests…
            </p>
          </div>
        </div>
      </section>

      <section
        ref={servicesRef}
        id="services"
        className="bg-gray-50 dark:bg-gray-900/30 w-full flex flex-col items-center scroll-mt-19 py-16 md:py-24"
      >
        <div className="w-full max-w-4xl px-4">
          {/* Services Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Services</h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              We render a broad range of services including out-sourcing of heavy equipment / machineries / trucks &amp;
              automobiles, parts and general cargo. We facilitate cartage, shipping and delivery services to your
              doorsteps globally (Land, Air or Sea freight) via Ro-Ro or containerized shipment.
            </p>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              We ensure safe packaging / labelling / loading and handling of relevant import / export.
            </p>
            <p>
              Our affiliate agents manage all international freight forwarding / customs brokerage &amp; solutions.
            </p>

            <div className="pt-4">
              <h4 className="text-2xl font-bold mb-4 text-sky-700 dark:text-sky-400">Warehousing &amp; Real-Time Tracking</h4>
              <p>
                Secure warehousing options available internationally. Plus, stay updated with real-time tracking of
                your shipments from origin to final destination.
              </p>
            </div>

            <p className="pt-6 text-xl md:text-2xl font-semibold italic text-sky-700 dark:text-sky-400">
               Representing your best interests
            </p>
          </div>
        </div>
      </section>


      <section
        id="deals"
  className="bg-gray-50 dark:bg-gray-900/30 w-full flex flex-col items-center scroll-mt-19 py-16 md:py-24"
>
  <div className="w-full max-w-6xl px-4">
    <div className="text-center mb-12">
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Special Deals & Offers</h3>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
        Explore our latest shipping deals, discounts, and featured shipments!
      </p>
    </div>
    {/* Cloudinary Gallery */}
    <Gallery />
  </div>
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
        The Contact component is already a <motion.section>, so we'll use that.
      */}
      {/* No need for an outer section tag here, Contact.tsx provides its own */}
      <Contact />

    </main>
  );
}
