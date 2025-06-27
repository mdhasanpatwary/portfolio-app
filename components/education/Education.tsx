"use client";

import { FC, useState } from "react";
import type { Education } from "@/types/data";
import { FaChevronDown } from "react-icons/fa";

interface EducationProps {
  educationData: Education;
}

const Education: FC<EducationProps> = ({ educationData }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="education"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {educationData.title}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {educationData.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.items.map((item) => (
            <div key={item.id} className="relative transition-all duration-300">
              <div
                className={`relative bg-white dark:bg-gray-800 rounded-2xl transition-all duration-300 ${
                  expandedId === item.id
                    ? "shadow-xl ring-2 ring-indigo-100 dark:ring-indigo-900"
                    : "shadow-md hover:shadow-lg"
                }`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full"></div>

                <div
                  className="p-8 cursor-pointer select-none"
                  onClick={() => handleCardClick(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardClick(item.id);
                    }
                  }}
                  aria-expanded={expandedId === item.id}
                  aria-controls={`education-details-${item.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800 transition-transform duration-200"
                          style={{
                            transform:
                              hoveredId === item.id
                                ? "scale(1.05)"
                                : "scale(1)",
                          }}>
                          {item.period}
                        </span>
                        <div
                          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-100 dark:border-yellow-800 transition-transform duration-200"
                          style={{
                            transform:
                              hoveredId === item.id
                                ? "scale(1.05)"
                                : "scale(1)",
                          }}>
                          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                            GPA: {item.gpa}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                          {item.degree}
                        </span>
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{item.institution}</span>
                      </div>
                    </div>

                    <div
                      className="text-indigo-500 p-3 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-transform duration-300"
                      style={{
                        transform: `rotate(${
                          expandedId === item.id ? 180 : 0
                        }deg) scale(${hoveredId === item.id ? 1.1 : 1})`,
                      }}>
                      <FaChevronDown />
                    </div>
                  </div>
                </div>

                {expandedId === item.id && (
                  <div
                    id={`education-details-${item.id}`}
                    className="overflow-hidden transition-all duration-300">
                    <div className="px-8 pb-8 space-y-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.keySkills.map((skill: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 select-none transition-transform duration-200"
                              style={{
                                transform:
                                  hoveredId === item.id
                                    ? "scale(1.05)"
                                    : "scale(1)",
                              }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Achievements
                        </h4>
                        <ul className="space-y-3">
                          {item.achievements.map(
                            (achievement: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg transition-transform duration-200"
                                style={{
                                  transform:
                                    hoveredId === item.id
                                      ? "scale(1.05)"
                                      : "scale(1)",
                                }}>
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                                {achievement}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
