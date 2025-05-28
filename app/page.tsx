
"use client"; 

import { useSectionInView } from "@/lib/hooks"; // Import the hook
import Contact from "@/components/Contact";
import { SectionName } from "@/lib/types";


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
  const { ref: servicesRef } = useSectionInView("services" as SectionName);
  const { ref: aboutUsRef } = useSectionInView("About Us"); // Ensure names match lib/data.ts
    // const { ref: contactRef } = useSectionInView("Contact"); // contactRef is handled inside Contact.tsx nowv

  return (
    <main className="flex flex-col items-center px-4">
      <section
        ref={homeRef}
        id="home"
        className="h-screen bg-blue-100 w-full flex flex-col items-center justify-center px-4 scroll-mt-19"
      >
        <div className="text-center max-w-4xl">
          {/* Grey Matter Logo with animation */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-16 h-16 md:w-24 md:h-24 mb-6">
              <div className="absolute inset-0 bg-amber-400 rounded-md animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center animate-bounce">
                    <div className="h-3 w-3 md:h-4 md:w-4 bg-white rounded-full mr-1"></div>
                    <div className="h-3 w-3 md:h-4 md:w-4 border-2 border-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Name and Tagline with fluid typography */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Grey Matter</h1>
              <h2 className="text-xl md:text-2xl font-medium mb-4">Fire & Security</h2>
              <p className="text-base md:text-lg font-medium text-gray-700">Your Protection Matters</p>
            </div>
          </div>

          {/* Fire Detection Systems Content with fade-in */}
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Fire Detection Systems</h3>
            <p className="text-base md:text-lg leading-relaxed">
              We have extensive knowledge of Open, Closed and Managed protocol Fire Detection: Linear Heat, Air Sampling
              and PAVA systems
            </p>
          </div>
        </div>
      </section>

      <section
        ref={servicesRef}
        id="services"
        className="min-h-screen bg-green-100 w-full flex flex-col items-center scroll-mt-19 py-16"
      >
        <div className="w-full max-w-6xl px-4">
          {/* Services Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Reliable Fire Safety Solutions for Your Business</h3>
              <p className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
                The effects of a fire can be devastating. A reliable and effective fire detection and alarm system,
                compliant with BS 5839-1:2013, is absolutely essential. Grey Matter Fire & Security Ltd. provides quality,
                cost-effective solutions, leveraging in-house expertise and an extensive product range to perfectly match
                your unique fire risk and environmental conditions.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Point Detection Systems */}
              <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Point Detection Systems</h4>
                <p className="text-gray-700 leading-relaxed">
                  The most common fire detection, forming the foundation of many installations. Analogue Addressable
                  systems report to a central panel, offering a single point of reference. We provide a wide range of
                  choices to meet diverse budgetary and technical needs.
                </p>
              </div>

              {/* Card 2: Air Sampling Systems */}
              <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Air Sampling Systems</h4>
                <p className="text-gray-700 leading-relaxed">
                  Highly sensitive systems using aspirating technology to draw air through pipes for smoke analysis. Ideal
                  for early warning in critical areas like computer rooms and ducting, or high, hard-to-access locations.
                </p>
              </div>

              {/* Card 3: Gas Suppression Systems */}
              <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Gas Suppression Systems</h4>
                <p className="text-gray-700 leading-relaxed">
                  Combines point detection with a mechanical system that automatically discharges a gaseous agent to
                  extinguish fires. Primarily used for protecting computer rooms and areas with financially valuable or
                  business-critical assets.
                </p>
              </div>

              {/* Card 4: Wire-Free Detection */}
              <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Wire-Free Detection</h4>
                <p className="text-gray-700 leading-relaxed">
                  A flexible alternative to traditional wired systems, minimizing disruption and installation time. Ideal
                  for retrofits, listed buildings, and temporary setups, offering advanced detection without damaging
                  building fabric.
                </p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="text-amber-500 font-medium text-lg mb-2">Peace of Mind</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Securing What Matters Most to You</h3>
              <p className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
                Because what matters to you, matters to us, Grey Matter Fire & Security Ltd. is dedicated to protecting
                your premises, assets, and people. We design, install, and maintain quality security systems that minimize
                risks like theft and trespassing, creating a safer environment. Our independent status allows us to tailor
                solutions to your specific needs and budget.
              </p>
            </div>

            {/* Security Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
              {/* Card 1: Advanced Access Control */}
              <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Advanced Access Control</h4>
                <p className="text-gray-700 leading-relaxed">
                  Secure your premises and manage access effectively. We offer biometric, smart card, and keypad solutions
                  for single or multi-door systems, enabling tailored access levels and real-time tracking for enhanced
                  safety and control.
                </p>
              </div>

              {/* Card 2: Modern CCTV Surveillance */}
              <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Modern CCTV Surveillance</h4>
                <p className="text-gray-700 leading-relaxed">
                  Monitor your property in real-time and record incidents with crystal-clear digital CCTV. Our
                  user-friendly systems offer remote viewing via broadband or mobile, providing peace of mind and crucial
                  evidence when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={aboutUsRef}
        id="about-us"
        className="min-h-screen bg-yellow-100 w-full flex items-center justify-center scroll-mt-19 py-16 px-4"
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Us</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Welcome to Grey Matter Fire & Security Ltd., we are a leading Fire Detection and Security Solutions provider with over 35 years combined experience within the industry.
              </p>
              <p className="text-lg leading-relaxed">
                {`Our company ethos `}
                <span className="font-semibold text-amber-600">
                  "Your Protection Matters"
                </span>
                {` stands at the core of everything we do. We take great pride that every aspect of our service meets the highest mark and exceed our customers' expectations. That's why most of our clients stay with us for years, confident of our service quality and reassured by our diligence to their protection needs.`}
              </p>
              <p className="text-lg leading-relaxed">
                Grey Matters directors are respected fire and security industry professionals who have worked on projects of every size, discipline and timescale, from the smallest of extensions to major construction projects. We design, supply, install and maintain Life Safety, Security and Emergency Systems nationwide.
              </p>
              <p className="text-lg leading-relaxed font-medium">
                We have specialist knowledge of the legislations and standards for all of the systems we support and will handle every aspect of your project meticulously and professionally.
              </p>
            </div>
          </div>
          
          {/* Image Placeholder */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500">About Us Image</span>
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
