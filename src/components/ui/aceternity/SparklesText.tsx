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
  const [sparklesCount, setSparklesCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalDelay = 150;

  useEffect(() => {
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

          {/* Sparkles */}
          {Array.from({ length: 5 }).map((_, sparkleIdx) => {
            const isVisible = sparklesCount === sparkleIdx;
            const leftPosition = Math.random() * 100;
            const topPosition = Math.random() * 100;
            const size = Math.random() * 1 + 0.5;

            return isVisible ? (
              <motion.div
                key={`sparkle-${wordIdx}-${sparkleIdx}`}
                className="absolute z-10 h-1 w-1 rounded-full bg-primary"
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: [1, 0], scale: [0, size, size * 2] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  left: `${leftPosition}%`,
                  top: `${topPosition}%`,
                }}
              />
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
};
