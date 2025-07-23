"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ExperienceAchievements = ({ highlights }: { highlights: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        <span>Key Achievements</span>
        <FaChevronDown
          className={`transform transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid gap-2 mt-2 transition-all duration-200 ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="overflow-hidden">
          <ul className="grid grid-cols-1 gap-2">
            {highlights.map((point, idx) => (
              <li key={idx} className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex">
                <span className="text-xs leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceAchievements;