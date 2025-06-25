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
import SkillCard from "./SkillCard";
import { SkillsData } from "../../types/data";

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
  skills: SkillsData;
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
          <SkillCard
            key={i}
            group={group}
            iconMap={iconMap}
            brandColors={brandColors}
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
