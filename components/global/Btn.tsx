import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

// ─── Variant Styles ─────────────────────────────────────────────────────────
const variantClasses = {
  primary:
    "inline-flex items-center justify-center gap-2 " +
    "bg-primary-600 text-white font-semibold " +
    "px-8 py-3.5 rounded-full " +
    "shadow-lg shadow-primary-400/20 " +
    "hover:bg-primary-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/30 " +
    "active:translate-y-0 " +
    "transition-all duration-300 " +
    "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none",

  secondary:
    "inline-flex items-center justify-center gap-2 " +
    "border-2 border-primary-600 text-primary-700 font-semibold " +
    "dark:border-primary-400 dark:text-primary-400 " +
    "px-8 py-3.5 rounded-full " +
    "hover:bg-primary-600/10 dark:hover:bg-primary-400/10 " +
    "hover:-translate-y-1 hover:shadow-lg " +
    "active:translate-y-0 " +
    "transition-all duration-300 " +
    "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none",

  /** Compact variant — same pill shape, smaller padding. Used for cards/modals. */
  "primary-sm":
    "inline-flex items-center justify-center gap-2 " +
    "bg-primary-600 text-white font-medium text-sm " +
    "px-5 py-2.5 rounded-full " +
    "shadow shadow-primary-400/20 " +
    "hover:bg-primary-500 hover:-translate-y-0.5 hover:shadow-md " +
    "active:translate-y-0 " +
    "transition-all duration-300 " +
    "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none",

  "secondary-sm":
    "inline-flex items-center justify-center gap-2 " +
    "border-2 border-primary-600 text-primary-700 font-medium text-sm " +
    "dark:border-primary-400 dark:text-primary-400 " +
    "px-5 py-2.5 rounded-full " +
    "hover:bg-primary-600/10 dark:hover:bg-primary-400/10 " +
    "hover:-translate-y-0.5 hover:shadow-md " +
    "active:translate-y-0 " +
    "transition-all duration-300 " +
    "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none",
};

type Variant = keyof typeof variantClasses;

// ─── Shared props ────────────────────────────────────────────────────────────
interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

// ─── <button> overload ───────────────────────────────────────────────────────
interface ButtonProps extends BaseProps {
  as?: "button";
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-busy"?: boolean;
}

// ─── <a> overload ───────────────────────────────────────────────────────────
interface AnchorProps extends BaseProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
  disabled?: never;
}

// ─── <Link> overload ────────────────────────────────────────────────────────
interface LinkProps extends BaseProps {
  as: "link";
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
  disabled?: never;
}

type BtnProps = ButtonProps | AnchorProps | LinkProps;

/**
 * Btn — unified, design-system-compliant button.
 *
 * Usage:
 *   <Btn variant="primary">Contact Me</Btn>
 *   <Btn variant="secondary" as="a" href="/resume.pdf">View Resume</Btn>
 *   <Btn variant="primary-sm" as="link" href="/projects">View All</Btn>
 */
const Btn: React.FC<BtnProps> = (props) => {
  const { variant = "primary", className, children, as, ...rest } = props;
  const classes = cn(variantClasses[variant], className);

  if (as === "a") {
    const { href, target, rel, onClick } = rest as AnchorProps;
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  if (as === "link") {
    const { href, onClick } = rest as LinkProps;
    return (
      <Link href={href} className={classes} {...(onClick ? { onClick } : {})}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick, "aria-busy": ariaBusy } = rest as ButtonProps;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-busy={ariaBusy}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Btn;
