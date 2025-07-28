"use client";

import { useState } from "react";
import { projects } from "@/data";
import ProjectCard from "@/components/projects/ProjectCard";
import Pagination from "@/components/global/Pagination";
import ProjectModal from "@/components/projects/ProjectModal";
import useProjectModal from "@/hooks/useProjectModal";

const PAGE_SIZE = 8;

export default function ProjectsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedProject, isOpen, openModal, closeModal } = useProjectModal();

  const totalProjects = projects.items.length;
  const totalPages = Math.ceil(totalProjects / PAGE_SIZE);

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginatedProjects = projects.items.slice(startIdx, endIdx);

  return (
    <div className="max-w-7xl mx-auto px-4 my-16 md:my-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} openModal={openModal} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <ProjectModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
}