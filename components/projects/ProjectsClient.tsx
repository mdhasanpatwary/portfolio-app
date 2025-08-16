"use client";

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useProjectModal from "@/hooks/useProjectModal";

interface ProjectsClientProps {
  items: ProjectsType["items"];
}

const ProjectsClient: FC<ProjectsClientProps> = ({ items }) => {
  const { selectedProject, isOpen, openModal, closeModal } = useProjectModal();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} openModal={openModal} />
        ))}
      </div>
      <ProjectModal project={selectedProject} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default ProjectsClient;
