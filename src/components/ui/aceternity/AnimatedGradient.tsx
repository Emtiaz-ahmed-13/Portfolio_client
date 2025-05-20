"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "./cn";

export const AnimatedGradient = ({
  className,
  containerClassName,
  children,
  gradientColors = [
    "rgba(255, 99, 71, 0.3)",
    "rgba(138, 43, 226, 0.3)",
    "rgba(50, 115, 220, 0.3)",
  ],
  ...rest
}: {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  gradientColors?: string[];
  [key: string]: any;
}) => {
  return (
    <div
      className={cn("relative overflow-hidden", containerClassName)}
      {...rest}
    >
      <motion.div
        className={cn("absolute inset-0 z-[-1] opacity-50", className)}
        style={{
          background: `radial-gradient(circle, ${gradientColors.join(", ")})`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${gradientColors.join(", ")})`,
            `radial-gradient(circle at 100% 0%, ${gradientColors.join(", ")})`,
            `radial-gradient(circle at 100% 100%, ${gradientColors.join(
              ", "
            )})`,
            `radial-gradient(circle at 0% 100%, ${gradientColors.join(", ")})`,
            `radial-gradient(circle at 0% 0%, ${gradientColors.join(", ")})`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      {children}
    </div>
  );
};
