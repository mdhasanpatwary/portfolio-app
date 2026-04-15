import React from "react";
import { FaBriefcase } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ExperienceTimelineItem from "./ExperienceTimelineItem";
import type { Experience as ExperienceType } from "@/types/data";

const ProfessionalExperience: React.FC<{ experiences: ExperienceType }> = ({
  experiences,
}) => (
  <section
    id="experience"
    className="w-full py-16 md:py-24 px-6 bg-gray-50 dark:bg-gray-950 content-visibility-auto"
  >
    <div className="max-w-3xl mx-auto">
      {/* Section Header */}
      <SectionTitle
        title={experiences.title}
        icon={
          <FaBriefcase className="text-primary-600 dark:text-primary-400 text-2xl" />
        }
      >
        {experiences.subtitle}
      </SectionTitle>

      {/* Timeline */}
      <div className="relative">
        {experiences.items.map((experience, index) => (
          <ExperienceTimelineItem
            key={index}
            experience={experience}
            index={index}
            isLast={index === experiences.items.length - 1}
          />
        ))}
      </div>
    </div>
  </section>
);

export default ProfessionalExperience;
