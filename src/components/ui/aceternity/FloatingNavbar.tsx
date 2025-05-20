"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "./cn";

export const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-5 inset-x-0 max-w-fit mx-auto z-50 flex items-center justify-center px-8 py-2 rounded-full border border-transparent dark:border-white/[0.2] bg-white/70 dark:bg-black/70 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.link}
            className="relative px-3 py-2 rounded-full text-sm transition-colors duration-200"
            onMouseEnter={() => setActiveItem(index)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <span className="relative z-10 flex items-center gap-1">
              {item.icon && <span>{item.icon}</span>}
              <span>{item.name}</span>
            </span>

            {activeItem === index && (
              <motion.div
                layoutId="navbar-active-item"
                className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-full"
                transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
