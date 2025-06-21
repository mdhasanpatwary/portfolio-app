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

type Service = {
  title: string;
  description: string;
  tools: string[];
  icon: string;
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
      className="text-left group relative bg-white/70 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-2xl p-8 transition duration-300 ease-in-out hover:border-indigo-500">
      <div className="absolute -top-6 left-6 bg-white dark:bg-gray-900 border border-indigo-500 p-3 rounded-full text-indigo-600 dark:text-indigo-400 text-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
        {Icon ? <Icon /> : null}
      </div>
      <div className="pt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {service.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {service.tools.map((tool, i) => (
            <span
              key={i}
              className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white text-xs font-medium px-3 py-1 rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
