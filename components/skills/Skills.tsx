"use client";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaSass,
  FaGulp,
  FaLinux,
  FaBootstrap,
  FaFigma,
  FaFolderOpen,
} from "react-icons/fa";
import {
  SiJquery,
  SiNextdotjs,
  SiTailwindcss,
  SiWebpack,
  SiAdobephotoshop,
  SiAdobexd,
  SiTypescript,
} from "react-icons/si";
import React from "react";
import SectionTitle from "@/components/global/SectionTitle";

const iconMap = {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaSass,
  FaGulp,
  FaLinux,
  FaBootstrap,
  FaFigma,
  SiJquery,
  SiNextdotjs,
  SiTailwindcss,
  SiWebpack,
  SiAdobephotoshop,
  SiAdobexd,
  SiTypescript,
};

// Brand colors for each technology icon
const brandColors: Record<string, string> = {
  FaHtml5: "#E44D26",
  FaCss3Alt: "#1572B6",
  FaJs: "#F7DF1E",
  FaReact: "#61DAFB",
  FaVuejs: "#42B883",
  FaNodeJs: "#339933",
  FaGitAlt: "#F05032",
  FaDocker: "#2496ED",
  FaAws: "#FF9900",
  FaSass: "#CC6699",
  FaGulp: "#CF4647",
  FaLinux: "#FCC624",
  FaBootstrap: "#7952B3",
  FaFigma: "#F24E1E",
  SiJquery: "#0769AD",
  SiNextdotjs: "#000000",
  SiTailwindcss: "#06B6D4",
  SiWebpack: "#8DD6F9",
  SiAdobephotoshop: "#31A8FF",
  SiAdobexd: "#FF61F6",
  SiTypescript: "#3178C6",
};

type SkillsProps = {
  skills: {
    title: string;
    subtitle: string;
    groups: Array<{
      title: string;
      technologies: Array<{ name: string; icon: string; docUrl?: string }>;
    }>;
  };
};

const Skills: React.FC<SkillsProps> = ({ skills }) => (
  <section
    id="skills"
    className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="relative max-w-7xl mx-auto text-center z-10">
      <SectionTitle
        title={skills.title}
        icon={
          <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }>
        {skills.subtitle}
      </SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.groups.map((group, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 p-0 flex flex-col items-stretch rounded-lg overflow-hidden">
            {/* Title as full-width table header */}
            <div className="w-full px-8 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 text-left">
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
                    className="flex flex-col items-center justify-center gap-1 px-4 py-6 bg-white dark:bg-gray-800 transition-colors duration-200 cursor-pointer focus:outline-none hover:bg-indigo-50 dark:hover:bg-indigo-900/40 focus:bg-indigo-50 dark:focus:bg-indigo-900/40 rounded-none hover:text-indigo-500 dark:hover:text-indigo-400">
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
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
