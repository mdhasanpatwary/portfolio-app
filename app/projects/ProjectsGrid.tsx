"use client";

import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import useProjectModal from "@/hooks/useProjectModal";
import type { Projects as ProjectsType } from "@/types/data";

interface ProjectsGridProps {
  items: ProjectsType["items"];
}

export default function ProjectsGrid({ items }: ProjectsGridProps) {
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
}
