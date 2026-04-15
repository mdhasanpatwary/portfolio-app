import React from "react";
import { IconType } from "react-icons";
import { SkillGroup } from "../../types/data";
import { Card } from "@/components/global";

interface SkillCardProps {
  group: SkillGroup;
  iconMap: Record<string, IconType>;
  brandColors: Record<string, string>;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  group,
  iconMap,
  brandColors,
  index,
}) => (
  <Card
    padding="none"
    className="group flex flex-col items-stretch"
    style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
    {/* Title as full-width table header */}
    <div className="w-full px-8 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
      <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-400 text-left">
        {group.title}
      </h3>
    </div>
    {/* Skills as grid/table with light borders */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-100 dark:bg-gray-700">
      {group.technologies.map((tech, idx) => {
        const Icon = iconMap[tech.icon as keyof typeof iconMap];
        const brandColor = brandColors[tech.icon] || "#888";
        return (
          <a
            key={idx}
            href={tech.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${tech.name} documentation in a new tab`}
            className="flex flex-col items-center justify-center gap-1 px-4 py-6 bg-white dark:bg-gray-800 transition-colors duration-200 cursor-pointer focus:outline-none hover:bg-primary-50 dark:hover:bg-primary-900/40 focus:bg-primary-50 dark:focus:bg-primary-900/40 hover:text-primary-600 dark:hover:text-primary-400">
            <div
              className="text-3xl mb-1 drop-shadow-md"
              style={{ color: brandColor }}>
              {Icon ? <Icon aria-hidden="true" focusable="false" /> : null}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-center flex items-center gap-1">
              {tech.name}
            </span>
          </a>
        );
      })}
    </div>
  </Card>
);

export default SkillCard;
