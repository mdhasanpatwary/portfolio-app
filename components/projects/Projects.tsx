// components/Projects.tsx (Server wrapper)

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import Link from "next/link";
import { FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ProjectsClient from "./ProjectsClient";

interface ProjectsProps {
  projectsData: ProjectsType;
}

const Projects: FC<ProjectsProps> = ({ projectsData }) => {
  return (
    <>
      <section
        id="projects"
        className="w-full py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={projectsData.title}
            icon={
              <FaFolderOpen className="text-primary-600 dark:text-primary-400 text-3xl" aria-hidden="true" focusable="false" />
            }>
            {projectsData.subtitle}
          </SectionTitle>

          {/* Projects Grid */}
          <ProjectsClient items={projectsData.items} />

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-2 bg-primary-700 text-white text-sm font-medium rounded hover:bg-primary-800 dark:hover:bg-primary-600 transition-colors gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
              <span>View All Projects</span>
              <FaExternalLinkAlt size={14} aria-hidden="true" focusable="false" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
