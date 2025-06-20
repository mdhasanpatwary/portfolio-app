import React from "react";
import type { JSX } from "react";
import {
  FaRocket,
  FaCogs,
  FaCode,
  FaPaintBrush,
  FaChartLine,
  FaMobileAlt,
  FaMagic,
  FaFigma,
  FaAws,
  FaDocker,
  FaTools,
  FaSearch,
} from "react-icons/fa";

const iconMap = {
  FaRocket,
  FaCogs,
  FaCode,
  FaPaintBrush,
  FaChartLine,
  FaMobileAlt,
  FaMagic,
  FaFigma,
  FaAws,
  FaDocker,
  FaTools,
  FaSearch,
};

type Service = {
  title: string;
  description: string;
  tools: string[];
  icon: string;
};

type ServicesProps = {
  services: Service[];
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section
      id="services"
      className="w-full py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          What I Offer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          Scalable solutions, clean UI/UX, and modernization strategies that
          elevate your product quality and speed.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
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
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
