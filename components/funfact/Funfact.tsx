"use client";

import { FC } from "react";
import {
  FaCode,
  FaFolderOpen,
  FaGlobe,
  FaGraduationCap,
  FaChessKing,
} from "react-icons/fa";
import { FunFacts } from "@/types/data";
import SectionTitle from "@/components/global/SectionTitle";

const iconMap = {
  FaCode,
  FaFolderOpen,
  FaGlobe,
  FaGraduationCap,
  FaChessKing,
};

const brandColors: Record<string, string> = {
  FaCode: "#6366F1",
  FaFolderOpen: "#10B981",
  FaGlobe: "#F59E42",
  FaGraduationCap: "#F43F5E",
  FaChessKing: "#FBBF24",
};

type FunFactProps = { funFacts: FunFacts };

const FunFact: FC<FunFactProps> = ({ funFacts }) => {
  return (
    <section
      id="funfact"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={funFacts.title}
          icon={
            <FaChessKing className="text-indigo-600 dark:text-indigo-400 text-3xl" />
          }>
          {funFacts.subtitle}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:overflow-x-auto">
          {funFacts.items.map((fact, index) => {
            const Icon = iconMap[fact.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                tabIndex={0}
                aria-label={`${fact.value} ${fact.label}`}
                className="flex flex-col items-center bg-white dark:bg-gray-900 border-2 border-transparent hover:border-indigo-400 dark:hover:border-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-lg md:rounded-xl p-6 shadow hover:shadow-lg transition outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(255,255,255,0.9) 100%)",
                }}>
                {Icon ? (
                  <Icon
                    className="mb-2 text-3xl"
                    aria-label={fact.label}
                    title={fact.label}
                    style={{
                      color:
                        brandColors[fact.icon as keyof typeof brandColors] ||
                        "#6366F1",
                    }}
                  />
                ) : null}
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {fact.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                  {fact.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FunFact;
