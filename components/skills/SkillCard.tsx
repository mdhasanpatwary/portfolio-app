import React from "react";
import { SkillGroup } from "../../types/data";

const SkillCard = ({
  group,
  iconMap,
  brandColors,
  index,
}: {
  group: SkillGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconMap: Record<string, React.ComponentType<any>>;
  brandColors: Record<string, string>;
  index: number;
}) => (
  <div
    className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500 p-0 flex flex-col items-stretch rounded-lg overflow-hidden"
    style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
    {/* Title as full-width table header */}
    <div className="w-full px-8 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
      <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 text-left">
        {group.title}
      </h3>
    </div>
    {/* Skills as grid/table with light borders */}
    <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-gray-100 dark:divide-gray-700">
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
            className="flex flex-col items-center justify-center gap-1 px-4 py-6 bg-white dark:bg-gray-800 transition-colors duration-200 cursor-pointer focus:outline-none hover:bg-primary-50 dark:hover:bg-primary-900/40 focus:bg-primary-50 dark:focus:bg-primary-900/40 rounded-none hover:text-primary-500 dark:hover:text-primary-400">
            <div
              className="text-3xl mb-1 drop-shadow-md"
              style={{ color: brandColor }}>
              {Icon ? <Icon /> : null}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-center flex items-center gap-1">
              {tech.name}
            </span>
          </a>
        );
      })}
    </div>
  </div>
);

export default SkillCard;
