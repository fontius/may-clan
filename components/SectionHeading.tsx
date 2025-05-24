// File: components/SectionHeading.tsx
import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    // --- Data Flow: Props ---
    // 1. This component receives `children` as a prop.
    //    `children` will typically be the text for the section title (e.g., "Contact me").
    // 2. It renders an `<h2>` tag with specific styling.
    //    The `children` are rendered inside this `<h2>`.
    <h2 className="text-3xl font-medium capitalize mb-8 text-center">
      {children}
    </h2>
  );
}