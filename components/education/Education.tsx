"use client";

import { FC } from "react";
import type { Education } from "@/types/data";
import { FaGraduationCap } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import EducationCard from "./EducationCard";

interface EducationProps {
  educationData: Education;
}

const Education: FC<EducationProps> = ({ educationData }) => {
  return (
    <section
      id="education"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={educationData.title}
          icon={
            <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-3xl" />
          }>
          {educationData.subtitle}
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-6">
          {educationData.items.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
