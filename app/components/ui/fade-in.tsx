"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  fullWidth?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.4,
  fullWidth = false
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset = {
    up: { y: 8, x: 0 },
    down: { y: -8, x: 0 },
    left: { x: 8, y: 0 },
    right: { x: -8, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: Math.min(duration, 0.5),
        delay: delay,
        ease: "easeOut",
      }}
      className={cn(fullWidth ? "w-full" : "", className)}
    >
      {children}
    </motion.div>
  );
}
