"use client";

import { m as motion, useInView, Variants, useReducedMotion } from "framer-motion";
import React, { useRef, ReactNode } from "react";

/** Shared fade-up variant for entrance animations */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Container that staggers its children */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// ─────────────────────────────────────────────
// AnimateIn — generic single-element fade-up
// ─────────────────────────────────────────────
interface AnimateInProps {
  children: ReactNode;
  className?: string;
  /** Extra delay before the element enters (seconds). Default: 0 */
  delay?: number;
  /** Duration override (seconds). Default: 0.6 */
  duration?: number;
  /** y offset to animate from. Default: 30 */
  yOffset?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export const AnimateIn = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  as: Tag = "div",
}: AnimateInProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -60px 0px",
  });
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as "div"];

  const effectiveYOffset = shouldReduceMotion ? 0 : yOffset;
  const effectiveDuration = shouldReduceMotion ? 0 : duration;
  const effectiveDelay = shouldReduceMotion ? 0 : delay;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: effectiveYOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: effectiveYOffset }}
      transition={{ duration: effectiveDuration, delay: effectiveDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

// ─────────────────────────────────────────────
// StaggerContainer — staggers direct children
// ─────────────────────────────────────────────
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child (seconds). Default: 0.12 */
  stagger?: number;
  /** Initial delay before first child (seconds). Default: 0.05 */
  delayChildren?: number;
}

export const StaggerContainer = ({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.05,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { 
        staggerChildren: shouldReduceMotion ? 0 : stagger, 
        delayChildren: shouldReduceMotion ? 0 : delayChildren 
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// StaggerItem — one child inside StaggerContainer
// ─────────────────────────────────────────────
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const StaggerItem = ({
  children,
  className,
  as: Tag = "div",
}: StaggerItemProps) => {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0 } }
  } : fadeUpVariants;

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
};

// ─────────────────────────────────────────────
// Exports (re-export shared variants for custom use)
// ─────────────────────────────────────────────
export { fadeUpVariants, staggerContainerVariants };
export default AnimateIn;
