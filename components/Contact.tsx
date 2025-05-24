// File: components/Contact.tsx
"use client"; // This component uses client-side hooks and interactivity

import React from "react";
import SectionHeading from "./SectionHeading"; // Reusable section title component
import { motion } from "framer-motion"; // For animations
import { useSectionInView } from "@/lib/hooks"; // To trigger animations when in view
import SubmitBtn from "./SubmitBtn"; // The specialized submit button

export default function Contact() {
  // --- Data Flow: Section Visibility ---
  // 1. `useSectionInView("Contact")` is called.
  //    - It registers this component with the ActiveSectionContext (indirectly, by setting "Contact" as active when scrolled to).
  //    - It provides a `ref` to attach to the main section element.
  //    - This `ref` is used by `react-intersection-observer` (inside the hook) to determine
  //      if the section is visible in the viewport.
  //    - (Although not directly used for animation triggering in *this* simplified example from AnikaPortfolio,
  //      the `motion.section`'s `whileInView` and `viewport` props achieve a similar effect directly with Framer Motion.)
  const { ref } = useSectionInView("Contact");

  // Replace with YOUR Formspree endpoint ID
  const formspreeEndpoint = "mgvkbjrl"; // e.g., "xzzezgwp" from Anika's portfolio

  return (
    <motion.section
      id="contact" // ID for navigation anchor
      ref={ref}    // Ref for `useSectionInView`
      // Basic styling for the section
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      // Framer Motion animation properties: fade in when it comes into view
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true, // Animation plays only once
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {/* Update this text to be relevant to GREYMATTER */}
        Unlocking your full potential starts here. {/* Placeholder from Anika's portfolio */}
      </p>

      {/* --- Data Flow: Form Submission ---
          2. The HTML `<form>` element:
             - `action`: This is set to your Formspree endpoint URL.
                        (e.g., "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT_ID")
                        When the form is submitted, the browser will POST the form data to this URL.
             - `method="POST"`: Specifies the HTTP method for submission.
             - Formspree handles the backend processing (receiving data, sending emails, spam filtering, etc.).
             - After submission, Formspree typically redirects the user to a "thank you" page
               (configurable in Formspree settings) or can show an inline message if using AJAX (not done here for simplicity).
      */}
      <form
        className="mt-10 flex flex-col dark:text-black"
        action={`https://formspree.io/f/${formspreeEndpoint}`}
        method="POST"
      >
        {/* Email Input Field */}
        <input
          className="h-14 px-4 rounded-lg border border-black/10 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="email" // `name` attribute is crucial for Formspree to identify the field
          type="email"
          required       // HTML5 validation: field must be filled
          maxLength={500}  // HTML5 validation: max characters
          placeholder="Your email"
        />
        {/* Message Textarea Field */}
        <textarea
          className="h-52 my-3 rounded-lg border border-black/10 p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message" // `name` attribute for Formspree
          placeholder="Your message"
          required
          maxLength={5000}
        />
        {/* --- Data Flow: Submit Button Integration ---
            3. `<SubmitBtn />` component is rendered here.
               - Being a child of the `<form>`, `useFormStatus()` inside `SubmitBtn`
                 will correctly reflect the submission state of this specific form.
        */}
        <SubmitBtn />
      </form>
    </motion.section>
  );
}