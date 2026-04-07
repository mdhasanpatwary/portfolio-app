"use client";

import { FC } from "react";
import type { ToolsData } from "@/types/data";
import { FaTools } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ToolCard from "./ToolCard";

interface ToolsProps {
  toolsData: ToolsData;
}

const Tools: FC<ToolsProps> = ({ toolsData }) => {
  return (
    <section
      id="tools"
      className="w-full py-16 md:py-24 bg-white dark:bg-gray-950 px-6 content-visibility-auto">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={toolsData.title}
          icon={
            <FaTools className="text-primary-600 dark:text-primary-400 text-3xl" aria-hidden="true" focusable="false" />
          }>
          {toolsData.subtitle}
        </SectionTitle>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {toolsData.items.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          
          {/* Future Tool Placeholder */}
          <div className="hidden lg:flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20 opacity-60">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-4">
              <FaTools className="text-gray-400 dark:text-gray-600 text-3xl" />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-500 mb-1">
              Coming Soon
            </h4>
            <p className="text-sm text-gray-400 dark:text-gray-600 text-center">
              New tools and personal projects are currently in development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
