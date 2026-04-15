// components/Projects.tsx (Server wrapper)

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import { FaExternalLinkAlt, FaRocket } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import ProjectsClient from "./ProjectsClient";
import Btn from "@/components/global/Btn";
import AnimateIn from "@/components/global/AnimateIn";

interface ProjectsProps {
  projectsData: ProjectsType;
}

const Projects: FC<ProjectsProps> = ({ projectsData }) => {
  return (
    <>
      <section
        id="projects"
        className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 px-6 content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={projectsData.title}
            icon={
              <FaRocket className="text-primary-600 dark:text-primary-400 text-2xl" aria-hidden="true" focusable="false" />
            }>
            {projectsData.subtitle}
          </SectionTitle>

          {/* Projects Grid */}
          <ProjectsClient items={projectsData.items} />

          <AnimateIn delay={0.3} className="text-center mt-12">
            <Btn variant="primary-sm" as="link" href="/projects">
              <span>View All Projects</span>
              <FaExternalLinkAlt size={12} aria-hidden="true" focusable="false" />
            </Btn>
          </AnimateIn>
        </div>
      </section>
    </>
  );
};

export default Projects;
