// File: components/Header.tsx
"use client"; // This is a client component because it uses hooks and interactivity

import React from "react";
import { motion } from "framer-motion"; // For animations
import { links } from "@/lib/data"; // Your navigation links data
import Link from "next/link"; // For client-side navigation
import clsx from "clsx"; // For conditional class names
import { useActiveSectionContext } from "@/context/active-section-context"; // To get/set active section

export default function Header() {
  // --- Data Flow: Consuming Context ---
  // 1. `useActiveSectionContext` hook is called.
  // 2. It retrieves `activeSection`, `setActiveSection`, and `setTimeOfLastClick`
  //    from the `ActiveSectionContext` that wraps our application in `layout.tsx`.
  //
  // - `activeSection`: A string (SectionName type) representing the currently active section (e.g., "Home", "Services").
  //    This is used to determine which link in the header should be highlighted.
  // - `setActiveSection`: A function to update the `activeSection` state in the context.
  //    This is called when a user clicks on a navigation link.
  // - `setTimeOfLastClick`: A function to record the timestamp of the last link click.
  //    This helps the `useSectionInView` hook to not immediately override a manual click
  //    with a scroll-triggered active section change.
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    // The header container, fixed at the top, centered.
    <header className="z-[999] relative">
      <motion.div
        // Background of the header, with a subtle animation on load.
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-black/10 dark:border-white/10 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:bg-opacity-75"
        // Animation properties from framer-motion
        initial={{ y: -100, x: "-50%", opacity: 0 }} // Starts off-screen and transparent
        animate={{ y: 0, x: "-50%", opacity: 1 }}   // Animates into place
      ></motion.div>

      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {/* --- Data Flow: Rendering Links ---
              3. The `links` array (from `lib/data.ts`) is mapped over to create a list item (`<li>`)
                 and a Next.js `<Link>` component for each navigation item.
          */}
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash} // Unique key for each list item
              initial={{ y: -100, opacity: 0 }} // Initial animation state for each link
              animate={{ y: 0, opacity: 1 }}     // Animate links into view
            >
              <Link
                className={clsx(
                  // Base styles for all links
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                  {
                    // --- Data Flow: Conditional Styling ---
                    // 4. `clsx` conditionally applies "text-gray-950 dark:text-gray-200"
                    //    IF `link.name` (e.g., "Services") matches the `activeSection`
                    //    state from the context. This highlights the active link.
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.name,
                  }
                )}
                href={link.hash} // The URL fragment (e.g., "#services")
                onClick={() => {
                  // --- Data Flow: Updating Context on Click ---
                  // 5. When a link is clicked:
                  //    a. `setActiveSection(link.name)` is called. This updates the
                  //       `activeSection` state in the `ActiveSectionContext`. The re-render
                  //       caused by this state change will then re-evaluate step 4,
                  //       highlighting the newly clicked link.
                  //    b. `setTimeOfLastClick(Date.now())` is called. This records the
                  //       current time, signaling to `useSectionInView` that a manual
                  //       click just occurred.
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name} {/* The display text of the link (e.g., "Services") */}

                {/* --- Data Flow: Active Link Indicator ---
                    6. If this `link.name` is the `activeSection`:
                       An animated `motion.span` is rendered. This span acts as the
                       visual background/underline indicator for the active link.
                       `layoutId="activeSection"` allows framer-motion to smoothly
                       animate this span from one link to another when `activeSection` changes.
                */}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="activeSection" // Crucial for shared layout animation
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}