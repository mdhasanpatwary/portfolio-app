"use client";

import React from "react";
import { FaBriefcase } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ExperienceCard from "./ExperienceCard";

type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  location: string;
  website: string;
  highlights: string[];
  techStack: { icon: string; name: string }[];
};

type ExperienceData = {
  title: string;
  subtitle: string;
  items: ExperienceItem[];
};

const ProfessionalExperience: React.FC<{ experiences: ExperienceData }> = ({
  experiences,
}) => (
  <section
    id="experience"
    className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionTitle
        title={experiences.title}
        icon={
          <FaBriefcase className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }>
        {experiences.subtitle}
      </SectionTitle>

      {/* Experience Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {experiences.items.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </div>
    </div>
  </section>
);

export default ProfessionalExperience;
