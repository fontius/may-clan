// File: components/SubmitBtn.tsx
"use client"; // Uses useFormStatus hook

import React from "react";
import { FaPaperPlane } from "react-icons/fa"; // An icon for the button
import { useFormStatus } from "react-dom"; // Hook to get form submission status

export default function SubmitBtn() {
  // --- Data Flow: Consuming Form Status ---
  // 1. `useFormStatus()` is a hook specifically designed to be used inside a <form>.
  //    It provides information about the status of the parent form, most notably `pending`.
  // 2. `pending` is a boolean:
  //    - `true` when the form is currently submitting.
  //    - `false` otherwise.
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      // --- Data Flow: Conditional Styling & Content ---
      // 3. The button's appearance and content change based on the `pending` state:
      //    - `disabled={pending}`: The button is disabled during submission to prevent multiple submits.
      //    - Styling classes for normal, hover, active, and disabled states are applied.
      //    - If `pending` is true, a loading spinner is shown.
      //    - If `pending` is false, the "Submit" text and a paper plane icon are shown.
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  );
}