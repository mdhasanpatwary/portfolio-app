"use client";

import { FC } from "react";
import Image from "next/image";
import type { Projects as ProjectsType } from "@/types/data";
import { getStatusIcon, getStatusColor } from "@/utils";

interface ProjectCardProps {
  project: ProjectsType["items"][number];
  onClick: (project: ProjectsType["items"][number]) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer transform transition-all duration-500 ease-in-out hover:shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden"
      onClick={() => onClick(project)}>
      {/* Project Image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        {/* Marketplace Badge */}
        <span className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
          {project.marketplace}
        </span>

        <Image
          src={project.image || "/profile.png"}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end">
          <div className="p-4 sm:p-6 text-white">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium bg-white/95 backdrop-blur-md shadow-lg ${getStatusColor(
                  project.status
                )}`}>
                {getStatusIcon(project.status)}
                <span className="ml-1.5 capitalize hidden sm:inline font-semibold">
                  {project.status}
                </span>
              </div>
              <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">
                <span className="hidden sm:inline">{project.category}</span>
                <span className="sm:hidden">
                  {project.category.split(" ")[0]}
                </span>
              </span>
            </div>

            {/* Project Info */}
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white drop-shadow-lg leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-100 text-xs sm:text-sm mb-4 leading-relaxed drop-shadow-md line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies
                .slice(0, 2)
                .map((tech: string, techIndex: number) => (
                  <span
                    key={techIndex}
                    className="px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-md border border-white/20">
                    {tech}
                  </span>
                ))}
              {project.technologies.length > 2 && (
                <span className="px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-md border border-white/20">
                  +{project.technologies.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
