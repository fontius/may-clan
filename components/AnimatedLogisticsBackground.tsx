// components/AnimatedLogisticsBackground.tsx
"use client";

import { motion } from "framer-motion";
import { Truck, Ship, Package } from "lucide-react"; // Make sure you have lucide-react installed: npm install lucide-react
import { useEffect, useRef, useState } from "react";

type Direction = "ltr" | "rtl";
type Variant = "hero" | "section";

interface AnimatedLogisticsBackgroundProps {
  className?: string;
  /** Which direction the repeating elements travel. Defaults to "ltr" (left to right). */
  direction?: Direction;
  /** "hero" = full-viewport layer (original default); "section" = lighter, container-relative layer. */
  variant?: Variant;
  /** Overrides the wrapper's z-index layer (defaults to "-z-10"). */
  layerClassName?: string;
}

const AnimatedLogisticsBackground: React.FC<AnimatedLogisticsBackgroundProps> = ({
  className,
  direction = "ltr",
  variant = "hero",
  layerClassName = "-z-10",
}) => {
  const rtl = direction === "rtl";

  // Measure the layer so "section" elements can travel across the panel width
  // with transform-only animation (`x` percentages are element-relative).
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Full-viewport travel for the hero (original behavior, unchanged for "ltr").
  const xFrom = (n: number): number | string => (rtl ? `calc(100vw + ${n}px)` : -n);
  const xTo = (n: number): number | string => (rtl ? -n : `calc(100vw + ${n}px)`);

  // Container-relative travel for the "section" variant.
  const secFrom = (n: number): string => (rtl ? `${containerWidth + n}px` : `${-n}px`);
  const secTo = (n: number): string => (rtl ? `${-n}px` : `${containerWidth + n}px`);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${layerClassName} ${className || ""}`}
      aria-hidden="true"
    >
      {variant === "hero" ? (
        <>
      {/* Moving Ships */}
      <motion.div
        className="absolute top-20 text-blue-200 dark:text-blue-700/50" // Added dark mode variant
        initial={{ x: xFrom(100) }}
        animate={{ x: xTo(100) }}
        transition={{
          duration: 45, // Slower for background
          repeat: Infinity, // Use Infinity for clarity
          ease: "linear",
        }}
      >
        <Ship size={60} />
      </motion.div>

      <motion.div
        className="absolute top-32 text-blue-300 dark:text-blue-600/50"
        initial={{ x: xFrom(80) }}
        animate={{ x: xTo(80) }}
        transition={{
          duration: 55, // Slower
          repeat: Infinity,
          ease: "linear",
          delay: 10,
        }}
      >
        <Ship size={40} />
      </motion.div>

      {/* Moving Containers (Simplified as colored divs) */}
      <motion.div
        className="absolute bottom-40 flex space-x-4"
        initial={{ x: xFrom(200) }}
        animate={{ x: xTo(200) }}
        transition={{
          duration: 40, // Slower
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-16 h-10 bg-blue-100/60 dark:bg-blue-600/40 rounded-sm"></div>
        <div className="w-16 h-10 bg-blue-200/60 dark:bg-blue-700/40 rounded-sm"></div>
        <div className="w-16 h-10 bg-blue-300/60 dark:bg-blue-800/40 rounded-sm"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-28 flex space-x-4"
        initial={{ x: xFrom(150) }}
        animate={{ x: xTo(150) }}
        transition={{
          duration: 38, // Slower
          repeat: Infinity,
          ease: "linear",
          delay: 8,
        }}
      >
        <div className="w-12 h-8 bg-yellow-300/50 dark:bg-yellow-700/30 rounded-sm"></div>
        <div className="w-12 h-8 bg-purple-300/50 dark:bg-purple-700/30 rounded-sm"></div>
      </motion.div>

      {/* Moving Trucks */}
      <motion.div
        className="absolute bottom-16 text-gray-300 dark:text-gray-600/50"
        initial={{ x: xFrom(60) }}
        animate={{ x: xTo(60) }}
        transition={{
          duration: 35, // Slower
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      >
        <Truck size={32} />
      </motion.div>

      {/* Floating Packages */}
      <motion.div
        className="absolute top-1/3 left-1/4 text-orange-200 dark:text-orange-600/50"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8, // Slower
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Package size={24} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3 text-teal-200 dark:text-teal-600/50"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 10, // Slower
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Package size={20} />
      </motion.div>

      {/* Wave Animation - Consider if this fits with the home section's bg color */}
      {/* You might want to remove this or adjust its colors based on the home section's actual background */}
      <motion.div
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-100/30 to-transparent dark:from-blue-900/20"
        animate={{
          scaleY: [1, 1.05, 1], // More subtle
        }}
        transition={{
          duration: 12, // Slower
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Grid Pattern - Also consider if this fits */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"> {/* Even more subtle */}
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-blue-500/50 dark:bg-blue-300/30 rounded-full w-2 h-2"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5, // Slower
                repeat: Infinity,
                delay: i * 0.2, // Slower stagger
              }}
            />
          ))}
        </div>
      </div>
        </>
      ) : containerWidth > 0 ? (
        <>
          {/* Lightweight, container-relative variant for inline sections (e.g. Contact). */}
          <motion.div
            className="absolute top-8 text-blue-200 dark:text-blue-700/40"
            initial={{ x: secFrom(60) }}
            animate={{ x: secTo(60) }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <Ship size={42} />
          </motion.div>

          <motion.div
            className="absolute top-1/2 text-blue-300 dark:text-blue-600/40"
            initial={{ x: secFrom(40) }}
            animate={{ x: secTo(40) }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 6 }}
          >
            <Ship size={28} />
          </motion.div>

          <motion.div
            className="absolute bottom-40 flex space-x-3"
            initial={{ x: secFrom(90) }}
            animate={{ x: secTo(90) }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-10 h-6 bg-blue-100/50 dark:bg-blue-600/30 rounded-sm"></div>
            <div className="w-10 h-6 bg-blue-200/50 dark:bg-blue-700/30 rounded-sm"></div>
          </motion.div>

          <motion.div
            className="absolute bottom-24 text-gray-300 dark:text-gray-600/40"
            initial={{ x: secFrom(50) }}
            animate={{ x: secTo(50) }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3 }}
          >
            <Truck size={26} />
          </motion.div>

          <motion.div
            className="absolute top-1/4 right-1/4 text-orange-200 dark:text-orange-600/40"
            animate={{
              y: [0, -14, 0],
              rotate: [0, 4, -4, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <Package size={20} />
          </motion.div>
        </>
      ) : null}
    </div>
  );
};

export default AnimatedLogisticsBackground;