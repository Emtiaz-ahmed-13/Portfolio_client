"use client";

import { motion } from "framer-motion";
import React, { ReactNode, useRef, useState } from "react";
import { cn } from "./cn";

export const ThreeDCard = ({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const cardCenterX = rect.left + cardWidth / 2;
    const cardCenterY = rect.top + cardHeight / 2;

    // Calculate rotation values
    const rotateY = ((e.clientX - cardCenterX) / cardWidth) * 15; // Max 15deg rotation
    const rotateX = -((e.clientY - cardCenterY) / cardHeight) * 15;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    // Reset rotation to zero
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={cn("relative perspective-1000px", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        className={cn(
          "relative transition-transform duration-200 ease-out transform-style-3d",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {children}

        {/* Pseudo shine effect */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(1px) rotateX(${rotateX / 1.5}deg) rotateY(${
              rotateY / 1.5
            }deg)`,
          }}
        />
      </motion.div>
    </div>
  );
};
