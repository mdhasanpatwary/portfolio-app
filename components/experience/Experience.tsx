import React from "react";
import { FaBriefcase } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ExperienceCard from "./ExperienceCard";
import type { Experience as ExperienceType } from "@/types/data";

const ProfessionalExperience: React.FC<{ experiences: ExperienceType }> = ({ experiences }) => (
  <section
    id="experience"
    className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionTitle
        title={experiences.title}
        icon={
          <FaBriefcase className="text-primary-600 dark:text-primary-400 text-3xl" />
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
