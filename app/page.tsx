
"use client"; 

import { useSectionInView } from "@/lib/hooks"; // Import the hook
import Contact from "@/components/Contact";

import Image from 'next/image';


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
        className="h-screen bg-gray-50 dark:bg-gray-900 w-full flex flex-col items-center justify-center px-4 scroll-mt-19"
      >
        <div className="text-center max-w-4xl">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-gray-800 dark:text-gray-100">May-Clan</h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-sky-700 dark:text-sky-400">Shipping & Logistics</h2>
              <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">Your Trusted Partner for Canada-Nigeria Shipments.</p>
            </div>
          </div>

          {/* Introductory Content with fade-in */}
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Seamless Shipping, Delivered.</h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              May-Clan offers comprehensive and reliable vehicle and freight forwarding services from Canada to Nigeria. 
              We handle your shipments with care, ensuring timely and secure delivery.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={servicesRef}
        id="services"
        className="min-h-screen bg-emerald-50 dark:bg-emerald-900/30 w-full flex flex-col items-center scroll-mt-19 py-16"
      >
        <div className="w-full max-w-6xl px-4">
          {/* Services Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Our Core Shipping Services</h3>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                At May-Clan, we provide a suite of specialized logistics solutions designed to make shipping between Canada and Nigeria
                effortless and efficient. Whether its your car, commercial goods, or personal items, weve got you covered.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Vehicle Shipping */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-sky-700 dark:text-sky-400">Vehicle Shipping (Canada to Nigeria)</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Specializing in RoRo (Roll-on/Roll-off) and containerized shipping for cars, trucks, and heavy machinery. We ensure safe transit and handle all export/import documentation.
                </p>
              </div>

              {/* Card 2: Freight Forwarding */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-sky-700 dark:text-sky-400">Freight Forwarding</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Comprehensive air and sea freight solutions for commercial cargo and personal effects. We offer door-to-door, port-to-port services, tailored to your budget and timeline.
                </p>
              </div>

              {/* Card 3: Customs Clearance */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-sky-700 dark:text-sky-400">Customs Clearance & Documentation</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Navigating customs can be complex. Our experts manage all customs brokerage and documentation requirements in Canada and Nigeria, ensuring a smooth clearance process.
                </p>
              </div>

              {/* Card 4: Logistics & Tracking */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-sky-700 dark:text-sky-400">Warehousing & Real-Time Tracking</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Secure warehousing options available in both Canada and Nigeria. Plus, stay updated with real-time tracking of your shipments from origin to final destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={aboutUsRef}
        id="about-us"
        className={`min-h-screen bg-amber-50 dark:bg-amber-900/30 w-full flex items-center justify-center scroll-mt-19 py-16 px-4`}
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">About May-Clan</h2>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                May-Clan is a premier shipping and logistics company specializing in connecting Canada and Nigeria. With years of experience, weve built a reputation for reliability, efficiency, and customer-centric service.
              </p>
              <p className="text-lg leading-relaxed">
                {`Our mission is to `}
                <span className="font-semibold text-sky-700 dark:text-sky-400">
                  simplify international shipping
                </span>
                {` for individuals and businesses' alike. We understand the challenges of cross-border logistics and strive to provide transparent, cost-effective solutions tailored to your' unique needs.`}
              </p>
              <p className="text-lg leading-relaxed">
                The May-Clan team comprises experienced professionals dedicated to ensuring your cargo reaches its destination safely and on time. We leverage a global network and local expertise to navigate the complexities of international trade regulations and transportation.
              </p>
              <p className="text-lg leading-relaxed font-medium text-gray-800 dark:text-gray-200">
                Whether youre relocating, importing goods for your business, or sending personal items, May-Clan is your trusted partner every step of the way.
              </p>
            </div>
          </div>
          
          {/* Image Placeholder - Could be an image of a ship, a team, or operations */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Image: May-Clan Operations / Happy Customer</span>
            </div>
          </div>
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
        The AnikaPortfolio's Contact component is already a <motion.section>, so we'll use that.
      */}
      {/* No need for an outer section tag here, Contact.tsx provides its own */}
      <Contact />

    </main>
  );
}
