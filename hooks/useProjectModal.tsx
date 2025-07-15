import { useState } from "react";
import type { Projects as ProjectsType } from "@/types/data";

export default function useProjectModal() {
  const [selectedProject, setSelectedProject] = useState<ProjectsType["items"][number] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (project: ProjectsType["items"][number]) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  return { selectedProject, isOpen, openModal, closeModal };
}