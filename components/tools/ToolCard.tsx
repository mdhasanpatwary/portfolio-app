"use client";

import { FC } from "react";
import type { Tool } from "@/types/data";
import { FaExternalLinkAlt, FaGithub, FaTools } from "react-icons/fa";
import Card from "@/components/global/Card";
import { CustomImage } from "@/components/global";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: FC<ToolCardProps> = ({ tool }) => {
  return (
    <Card
      className="group relative flex flex-col h-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300"
      padding="none">
      {/* Tool Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
        <CustomImage
          src={tool.image || "/profile.png"} // Fallback image
          alt={tool.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Status Badge */}
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg z-20">
          {tool.status}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
            <FaTools size={18} />
          </div>
          <div className="flex gap-3">
            {tool.github && (
              <a
                href={tool.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                title="View Source on GitHub">
                <FaGithub size={18} />
              </a>
            )}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              title="Visit Tool">
              <FaExternalLinkAlt size={16} />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {tool.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
          {tool.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          {tool.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
