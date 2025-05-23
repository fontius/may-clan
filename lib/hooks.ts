// File: lib/hooks.ts
"use client"; // This hook is used in client components

import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

// This hook encapsulates the logic for observing when a section comes into view
// and updating the global active section state.
export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  // 'ref' is assigned to the DOM element of the section we want to observe.
  // 'inView' is a boolean that becomes true when the observed element
  // is within the viewport according to the specified threshold.
  const { ref, inView } = useInView({
    threshold, // How much of the section needs to be visible (0.0 to 1.0)
                // 0.75 means 75% of the section must be visible.
  });

  // Accessing setActiveSection and timeOfLastClick from our global context.
  // setActiveSection will update which link is highlighted in the header.
  // timeOfLastClick helps prevent the observer from overriding a manual click
  // on a navigation link too quickly.
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    // This effect runs when 'inView' status changes or other dependencies change.
    // If the section is in view AND enough time has passed since the last
    // manual navigation click (to avoid race conditions where scroll triggers
    // immediately after a click), then we set this section as active.
    if (inView && Date.now() - timeOfLastClick > 1000) { // 1-second delay
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]); // Dependencies for the effect

  // The hook returns the 'ref' so it can be attached to the section element
  // in the component that uses this hook.
  return {
    ref,
  };
}