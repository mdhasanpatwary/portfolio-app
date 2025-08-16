import React from "react";
import {
  FaMagic,
  FaTools,
  FaPaintBrush,
  FaChartLine,
  FaMobileAlt,
  FaRocket,
  FaCogs,
  FaCode,
  FaFigma,
  FaSearch,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import type { Service } from "../../types/data";

const iconMap = {
  FaMagic,
  FaTools,
  FaPaintBrush,
  FaChartLine,
  FaMobileAlt,
  FaRocket,
  FaCogs,
  FaCode,
  FaFigma,
  FaSearch,
  FaAws,
  FaDocker,
};

type ServiceCardProps = {
  service: Service;
  idx: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, idx }) => {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  return (
    <div
      key={idx}
      className="p-5 sm:p-8 flex flex-col items-stretch overflow-hidden transition-colors duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/40">
      {/* Row 1: Icon and Title */}
      <div className="flex items-center gap-4 w-full mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center w-14 h-14 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_16px_4px_rgba(var(--color-primary-500-rgb),0.18)]">
          {Icon ? <Icon /> : null}
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-primary-600 dark:text-primary-400">
          {service.title}
        </h3>
      </div>
      {/* Row 2: Description */}
      <div className="w-full mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {service.description}
        </p>
      </div>
      {/* Row 3: Tags */}
      <div className="flex flex-wrap gap-2 w-full">
        {service.tools.map((tool, i) => (
          <span
            key={i}
            className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-white text-xs font-medium px-3 py-1 rounded-full">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
