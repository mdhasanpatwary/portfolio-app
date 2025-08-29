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
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-700 text-white text-xs font-semibold rounded-full shadow z-20">
          {project.category}
        </span>
        <CustomImage
          src={project.image || "/profile.png"}
          alt={project.title}
          width={600}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          blurType="project"
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <h2
          className="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate"
          title={project.title}>
          {project.title}
        </h2>
        {/* Tech stack removed for cleaner card */}
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-600 dark:text-gray-300">{project.marketplace}</span>
          <span className="inline-flex items-center gap-1 text-primary-700 dark:text-primary-400 text-xs font-medium group-hover:underline">
            View <FaExternalLinkAlt className="ml-1" size={12} aria-hidden="true" focusable="false" />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
