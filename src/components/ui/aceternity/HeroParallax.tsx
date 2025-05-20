"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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

  // Create transforms individually at the top level
  const yTransform0 = useTransform(scrollYProgress, [0, 1], [0, 0 * 250]);
  const yTransform1 = useTransform(scrollYProgress, [0, 1], [0, 1 * 250]);
  const yTransform2 = useTransform(scrollYProgress, [0, 1], [0, 2 * 250]);

  const opacityTransform0 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.5, 0]
  );
  const opacityTransform1 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.5, 0]
  );
  const opacityTransform2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.5, 0]
  );

  // Create an array of the transforms
  const transforms = [
    { yTransform: yTransform0, opacityTransform: opacityTransform0 },
    { yTransform: yTransform1, opacityTransform: opacityTransform1 },
    { yTransform: yTransform2, opacityTransform: opacityTransform2 },
  ];

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
                ref={(el) => {
                  productRefs.current[idx] = el;
                }}
                key={idx}
                style={{
                  top: `${idx * 20}%`,
                  right: `${idx * 5}%`,
                  rotate: `${idx % 2 === 0 ? -5 : 5}deg`,
                  y: transforms[idx].yTransform,
                  opacity: transforms[idx].opacityTransform,
                }}
                className="absolute w-64 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full h-40 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
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
