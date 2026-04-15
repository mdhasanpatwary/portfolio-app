import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import type { Service } from "../../types/data";
import { getIcon } from "@/utils/icons";
import { Card } from "@/components/global";

type ServiceCardProps = {
  service: Service;
  idx: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = getIcon(service.icon);
  return (
    <Card
      padding="none"
      className={`group relative h-full flex flex-col items-stretch p-6 sm:p-8 ${service.popular ? "border-primary-500 shadow-md shadow-primary-500/10 dark:hover:border-primary-500 hover:border-primary-500" : ""}`}
    >
      {service.popular && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-bl-xl z-10 shadow-sm">
          Most Popular
        </div>
      )}
      
      {/* Row 1: Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="shrink-0 flex items-center justify-center w-14 h-14 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-2xl rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_16px_4px_rgba(var(--color-primary-500-rgb),0.18)]">
          {Icon ? <Icon /> : null}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {service.title}
        </h3>
      </div>
      
      {/* Row 2: Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3">
        {service.description}
      </p>

      {/* Row 3: Highlights */}
      <ul className="space-y-2.5 mb-6 flex-1 w-full">
        {service.highlights?.map((highlight, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <FaCheckCircle className="text-primary-500 mt-[3px] shrink-0 text-sm" />
            <span className="leading-snug">{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Row 4: Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {service.tools.map((tool, i) => (
          <span
            key={i}
            className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-white text-xs font-medium px-3 py-1 rounded-full">
            {tool}
          </span>
        ))}
      </div>

      {/* Row 5: CTA */}
      <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-700/80 flex justify-start">
        <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300">
          Discuss Project <FaArrowRight className="text-[11px] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;
