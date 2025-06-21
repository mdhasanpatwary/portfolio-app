"use client";

import { FC } from "react";
import Image from "next/image";
import type { Projects as ProjectsType } from "@/types/data";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  project: ProjectsType["items"][number];
  onClick: (project: ProjectsType["items"][number]) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 hover:border-indigo-400"
      onClick={() => onClick(project)}>
      {/* Project Image */}
      <div className="relative w-full aspect-[59/30] overflow-hidden">
        {/* Category Badge Only */}
        <div className="absolute top-3 left-3 flex gap-2 z-20">
          <span className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow">
            {project.category}
          </span>
        </div>
        <Image
          src={project.image || "/profile.png"}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3
            className="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate"
            title={project.title}>
            {project.title}
          </h3>
          {/* Tech stack removed for cleaner card */}
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
            {project.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{project.marketplace}</span>
          <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs font-medium group-hover:underline">
            View <FaExternalLinkAlt className="ml-1" size={12} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
