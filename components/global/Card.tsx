import React from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (() => void) | undefined;
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'outlined' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hover = true,
  variant = 'default',
  padding = 'md',
  style
}) => {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden";

  const variantClasses = {
    default: "shadow-sm border border-gray-200 dark:border-gray-700",
    elevated: "shadow-lg border-0",
    outlined: "shadow-none border-2 border-gray-200 dark:border-gray-700",
    none: ""
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  const hoverClasses = hover ? "hover:-translate-y-2 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500 transition-all duration-300" : "";
  const clickClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], paddingClasses[padding], hoverClasses, clickClasses, className)}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;