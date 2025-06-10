// components/AnimatedLogisticsBackground.tsx
"use client";

import { motion } from "framer-motion";
import { Truck, Ship, Package } from "lucide-react"; // Make sure you have lucide-react installed: npm install lucide-react

interface AnimatedLogisticsBackgroundProps {
  // You can add props here if you need to customize it later,
  // e.g., element counts, speeds, colors. For now, we'll keep it simple.
  className?: string;
}

const AnimatedLogisticsBackground: React.FC<AnimatedLogisticsBackgroundProps> = ({ className }) => {
  return (
    <div
      className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true" // Decorative
    >
      {/* Moving Ships */}
      <motion.div
        className="absolute top-20 text-blue-200 dark:text-blue-700/50" // Added dark mode variant
        initial={{ x: -100 }}
        animate={{ x: "calc(100vw + 100px)" }}
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
        initial={{ x: -80 }}
        animate={{ x: "calc(100vw + 80px)" }}
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
        initial={{ x: -200 }}
        animate={{ x: "calc(100vw + 200px)" }}
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
        initial={{ x: -150 }}
        animate={{ x: "calc(100vw + 150px)" }}
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
        initial={{ x: -60 }}
        animate={{ x: "calc(100vw + 60px)" }}
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
    </div>
  );
};

export default AnimatedLogisticsBackground;