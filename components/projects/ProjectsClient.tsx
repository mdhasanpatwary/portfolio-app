"use client";

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useProjectModal from "@/hooks/useProjectModal";
import { StaggerContainer, StaggerItem } from "@/components/global/AnimateIn";

interface ProjectsClientProps {
  items: ProjectsType["items"];
}

const ProjectsClient: FC<ProjectsClientProps> = ({ items }) => {
  const { selectedProject, isOpen, openModal, closeModal } = useProjectModal();

  return (
    <>
      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        stagger={0.08}
        delayChildren={0.05}
      >
        {items.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} openModal={openModal} />
          </StaggerItem>
        ))}
      </StaggerContainer>
      <ProjectModal project={selectedProject} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default ProjectsClient;
