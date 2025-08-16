"use client";

// components/Projects.tsx

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import Link from "next/link";
import { FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useProjectModal from "@/hooks/useProjectModal";

interface ProjectsProps {
  projectsData: ProjectsType;
}

const Projects: FC<ProjectsProps> = ({ projectsData }) => {
  const { selectedProject, isOpen, openModal, closeModal } = useProjectModal();

  return (
    <>
      <section
        id="projects"
        className="w-full py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={projectsData.title}
            icon={
              <FaFolderOpen className="text-primary-600 dark:text-primary-400 text-3xl" />
            }>
            {projectsData.subtitle}
          </SectionTitle>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectsData.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                openModal={openModal}
              />
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-2 bg-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700 dark:hover:bg-primary-500 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
              <span>View All Projects</span>
              <FaExternalLinkAlt size={14} />
            </Link>
          </div>
        </div>
      </section>
      <ProjectModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;
