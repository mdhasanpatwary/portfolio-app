"use client";

// components/Projects.tsx

import { FC, useState } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import Link from "next/link";
import { FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface ProjectsProps {
  projectsData: ProjectsType;
  showAll?: boolean;
}

const Projects: FC<ProjectsProps> = ({ projectsData, showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState<
    ProjectsType["items"][number] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: ProjectsType["items"][number]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section
        id="projects"
        className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <SectionTitle
            title={projectsData.title}
            icon={
              <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />
            }>
            Projects I contributed to as a Front End Developer at ThemeLooks and
            6amTech, published on Themeforest or Codecanyon.
          </SectionTitle>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAll
              ? projectsData.items
              : projectsData.items.slice(0, 6)
            ).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={openModal}
              />
            ))}
          </div>

          {/* View All Projects Button */}
          {!showAll && (
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 dark:hover:bg-indigo-500 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500">
                <span>View All Projects</span>
                <FaExternalLinkAlt size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;
