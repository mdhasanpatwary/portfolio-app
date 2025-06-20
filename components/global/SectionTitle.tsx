import React from "react";

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
  <div className={`text-center mb-12 sm:mb-16 ${className}`}>
    <div className="flex items-center justify-center gap-3 mb-4">
      {icon}
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
    </div>
    {children && (
      <div className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">
        {children}
      </div>
    )}
  </div>
);

export default SectionTitle;
