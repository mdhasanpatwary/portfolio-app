"use client";

import React, { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaChevronDown,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiSass,
  SiGithub,
  SiVuedotjs,
  SiMaterialdesignicons,
  SiAmazon,
  SiGulp,
  SiWebpack,
  SiFigma,
} from "react-icons/si";

const iconMap = {
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaChevronDown,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiSass,
  SiGithub,
  SiVuedotjs,
  SiMaterialdesignicons,
  SiAmazon,
  SiGulp,
  SiWebpack,
  SiFigma,
};

type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  location: string;
  website: string;
  highlights: string[];
  techStack: { icon: string; name: string }[];
};

type ExperianceProps = {
  experiences: ExperienceItem[];
};

const ProfessionalExperience: React.FC<ExperianceProps> = ({ experiences }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <section
      id="experience"
      className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Professional Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            A timeline of my professional growth and achievements in the tech
            industry.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500">
              {/* Card Header */}
              <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        at
                      </span>
                      <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-indigo-500 dark:text-indigo-400 text-xs" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400 text-xs" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    <span className="hidden sm:inline">Visit</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>

              {/* Tech Stack - Always Visible */}
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {exp.techStack.map((tech, idx) => {
                    const Icon = iconMap[tech.icon as keyof typeof iconMap];
                    return (
                      <span
                        key={idx}
                        className="group/tech relative text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200 hover:scale-110 transform">
                        {Icon && <Icon />}
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
                          {tech.name}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Key Achievements - Expandable on Mobile */}
              <div className="p-3 bg-white dark:bg-gray-800 rounded-b-lg">
                <div className="sm:hidden">
                  <button
                    onClick={() => {
                      const newExpanded = { ...expanded };
                      newExpanded[index] = !newExpanded[index];
                      setExpanded(newExpanded);
                    }}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <span>Key Achievements</span>
                    <FaChevronDown
                      className={`transform transition-transform duration-200 ${
                        expanded[index] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid gap-2 mt-2 transition-all duration-200 ${
                      expanded[index]
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}>
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-1 gap-2">
                        {exp.highlights.map((point, idx) => (
                          <li
                            key={idx}
                            className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <span className="text-xs leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <ul className="grid grid-cols-2 gap-2">
                    {exp.highlights.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="text-xs leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
