"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "./cn";

export const SparklesText = ({
  className,
  words,
  ...props
}: {
  className?: string;
  words: string;
  [key: string]: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sparklesCount, setSparklesCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalDelay = 150;

  // Only run client-side effects after mounting
  useEffect(() => {
    setIsMounted(true);

    intervalRef.current = setInterval(() => {
      setSparklesCount((prevCount) => (prevCount + 1) % 10);
    }, intervalDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Split the sentence into words
  const wordsArray = words.split(" ");

  // Fixed positions for sparkles to avoid hydration mismatch
  const sparklePositions = [
    { left: "10%", top: "20%" },
    { left: "30%", top: "10%" },
    { left: "50%", top: "15%" },
    { left: "70%", top: "25%" },
    { left: "90%", top: "5%" },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 text-5xl font-bold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {wordsArray.map((word, wordIdx) => (
        <div key={`word-${wordIdx}`} className="relative">
          <span>{word}</span>

          {/* Only render sparkles on client side after component is mounted */}
          {isMounted &&
            Array.from({ length: 5 }).map((_, sparkleIdx) => {
              const isVisible = sparklesCount === sparkleIdx;
              const position = sparklePositions[sparkleIdx];

              // Use fixed size to avoid hydration mismatch
              const size = 1.5;

              return isVisible ? (
                <motion.div
                  key={`sparkle-${wordIdx}-${sparkleIdx}`}
                  className="absolute z-10 h-1 w-1 rounded-full bg-primary"
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: [1, 0], scale: [0, size, size * 2] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                />
              ) : null;
            })}
        </div>
      ))}
    </div>
  );
};
