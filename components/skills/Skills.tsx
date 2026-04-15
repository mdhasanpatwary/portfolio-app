"use client";

import React from "react";
import SectionTitle from "@/components/global/SectionTitle";
import SkillCard from "./SkillCard";
import { SkillsData } from "../../types/data";
import { StaggerContainer, StaggerItem } from "@/components/global/AnimateIn";
import { globalIconMap as iconMap, globalBrandColors as brandColors } from "@/utils/icons";
import { FaLayerGroup } from "react-icons/fa";

type SkillsProps = {
  skills: SkillsData;
};

const Skills: React.FC<SkillsProps> = ({ skills }) => (
  <section
    id="skills"
    className="w-full py-16 md:py-24 px-6 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto text-center">
      <SectionTitle
        title={skills.title}
        icon={
          <FaLayerGroup className="text-primary-600 dark:text-primary-400 text-2xl" />
        }>
        {skills.subtitle}
      </SectionTitle>
      <StaggerContainer
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        stagger={0.1}
        delayChildren={0.05}
      >
        {skills.groups.map((group, i) => (
          <StaggerItem key={i}>
            <SkillCard
              group={group}
              iconMap={iconMap}
              brandColors={brandColors}
              index={i}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default Skills;
