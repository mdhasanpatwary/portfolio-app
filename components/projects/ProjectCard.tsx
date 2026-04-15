"use client";

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import { FaExternalLinkAlt } from "react-icons/fa";
import Card from "@/components/global/Card";
import { CustomImage } from "@/components/global";

interface ProjectCardProps {
  project: ProjectsType["items"][number];
  openModal: (project: ProjectsType["items"][number]) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, openModal }) => {
  return (
    <Card
      className="group relative flex flex-col"
      padding="none"
      onClick={() => openModal(project)}>
      {/* Project Image */}
      <div className="relative w-full aspect-[59/30] overflow-hidden">
        {/* Category Badge Only */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-700/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow z-20">
          {project.category}
        </span>
        <CustomImage
          src={project.image || "/profile.png"}
          alt={project.title}
          width={600}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          blurType="project"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
            <span className="bg-white text-primary-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                View Case Study
            </span>
        </div>
      </div>
      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <h3
            className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1"
            title={project.title}>
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{project.marketplace}</span>
          <span className="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
            View <FaExternalLinkAlt size={12} aria-hidden="true" focusable="false" />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
