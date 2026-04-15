import React from "react";
import AnimateIn from "@/components/global/AnimateIn";

interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  icon,
  children,
  className = "",
}) => (
  <AnimateIn className={`text-center mb-12 sm:mb-16 ${className}`}>
    {/* Icon — centered above title in a pill container */}
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 mb-5 text-2xl shadow-sm">
      {icon}
    </div>

    {/* Title */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
      {title}
    </h2>

    {/* Accent line */}
    <div className="flex justify-center mb-4">
      <span className="block w-16 h-1 bg-primary-500 rounded-full" />
    </div>

    {/* Optional subtitle */}
    {children && (
      <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
        {children}
      </p>
    )}
  </AnimateIn>
);

export default SectionTitle;
