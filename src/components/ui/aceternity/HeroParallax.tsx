"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "./cn";

export type ProductType = {
  title: string;
  description: string;
  link: string;
  thumbnail: string;
};

export const HeroParallax = ({
  products,
  className,
}: {
  products: ProductType[];
  className?: string;
}) => {
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative w-full overflow-hidden bg-background px-4 py-20 md:px-8",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold md:text-7xl">
              <span className="block mb-2">Welcome to My</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              >
                Portfolio
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8 max-w-lg text-lg text-muted-foreground"
            >
              Showcasing my journey, projects, and skills in web development
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="rounded-full bg-primary px-6 py-3 text-white transition-all hover:scale-105 hover:shadow-lg">
                View Projects
              </button>
              <button className="rounded-full border border-primary bg-transparent px-6 py-3 text-primary transition-all hover:scale-105 hover:shadow-lg">
                Contact Me
              </button>
            </motion.div>
          </div>
          <div className="relative h-[500px] md:h-auto">
            {products.slice(0, 3).map((product, idx) => (
              <motion.div
                ref={(el) => (productRefs.current[idx] = el)}
                key={idx}
                style={{
                  top: `${idx * 20}%`,
                  right: `${idx * 5}%`,
                  rotate: `${idx % 2 === 0 ? -5 : 5}deg`,
                  y: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [0, idx * 250],
                    springConfig
                  ),
                  opacity: useTransform(
                    scrollYProgress,
                    [0, 0.5, 1],
                    [1, 0.5, 0],
                    springConfig
                  ),
                }}
                className="absolute w-64 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
