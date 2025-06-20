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

type SkillsProps = {
  skills: Array<{
    title: string;
    technologies: Array<{ name: string; icon: string }>;
  }>;
};

const Skills: React.FC<SkillsProps> = ({ skills }) => (
  <section
    id="skills"
    className="w-full py-24 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        Skills
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
        Technologies I use to build seamless, performant, and responsive web
        experiences.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {skills.map((group, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 p-8">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
              {group.title}
            </h3>
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {group.technologies.map((tech, idx) => {
                const Icon = iconMap[tech.icon as keyof typeof iconMap];
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                    <div className="text-4xl mb-2">
                      {Icon ? <Icon /> : null}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {tech.name}
                    </span>
                  </div>
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
