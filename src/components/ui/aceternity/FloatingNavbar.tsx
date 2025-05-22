"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
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
  const [isDark, setIsDark] = useState(false);

  // On mount, check localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      // System preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Toggle dark mode
  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

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
        {/* Dark mode toggle button */}
        <button
          aria-label="Toggle dark mode"
          onClick={toggleDark}
          className="ml-4 p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? (
            <FaSun className="text-yellow-400 w-5 h-5" />
          ) : (
            <FaMoon className="text-gray-700 w-5 h-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
};
