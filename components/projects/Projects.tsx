"use client";

// components/Projects.tsx

import { FC, useState } from "react";
import { FaExternalLinkAlt, FaPlay, FaCode, FaRocket, FaLightbulb, FaTimes, FaFolderOpen } from "react-icons/fa";
import Image from "next/image";
import type { Projects as ProjectsType } from "@/types/data";
import Link from "next/link";

interface ProjectsProps {
  projectsData: ProjectsType;
  showAll?: boolean;
}

const Projects: FC<ProjectsProps> = ({ projectsData, showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectsType['items'][number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <FaRocket className="text-green-600 dark:text-green-400" />;
      case "development":
        return <FaCode className="text-blue-600 dark:text-blue-400" />;
      case "concept":
        return <FaLightbulb className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return <FaCode className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400";
      case "development":
        return "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-400";
      case "concept":
        return "bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-400";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-600/50 dark:text-gray-300";
    }
  };

  const openModal = (project: ProjectsType['items'][number]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section
        id="projects"
        className="relative w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                {projectsData.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">
              {`Projects I contributed to as a Front End Developer at ThemeLooks and 6amTech, published on Themeforest or Codecanyon.`}
            </p>
          </div>

          {/* Projects Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
            {(showAll ? projectsData.items : projectsData.items.slice(0, 6)).map((project) => (
              <div
                key={project.id}
                className="group relative cursor-pointer break-inside-avoid transform transition-all duration-500 ease-in-out hover:shadow-xl rounded-2xl w-full"
                onClick={() => openModal(project)}
              >
                {/* Project Image Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-in-out bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 w-full aspect-[3/2]">
                  {/* Marketplace Badge */}
                  <span className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md">
                    {project.marketplace}
                  </span>
                  {/* Gradient Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none transition-opacity duration-500 ease-in-out group-hover:opacity-80 rounded-2xl" />

                  <Image
                    src={project.image || "/profile.png"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    style={{ aspectRatio: "3/2" }}
                  />

                  {/* Hover Overlay with Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-20 flex flex-col justify-end rounded-2xl">
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium bg-white/95 backdrop-blur-md shadow-lg ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {getStatusIcon(project.status)}
                          <span className="ml-1.5 capitalize hidden sm:inline font-semibold">
                            {project.status}
                          </span>
                        </div>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                          <span className="hidden sm:inline">
                            {project.category}
                          </span>
                          <span className="sm:hidden">
                            {project.category.split(" ")[0]}
                          </span>
                        </span>
                      </div>

                      {/* Project Info */}
                      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white drop-shadow-lg leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-100 text-xs sm:text-sm mb-4 leading-relaxed drop-shadow-md line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-md border border-white/20">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-md border border-white/20">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          {!showAll && (
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow hover:shadow-md">
                <span>View All Projects</span>
                <FaExternalLinkAlt className="ml-2" size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-t-3xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110">
                <FaTimes size={18} />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                  <div
                    className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium shadow-sm ${getStatusColor(
                      selectedProject.status
                    )}`}
                  >
                    {getStatusIcon(selectedProject.status)}
                    <span className="ml-1.5 capitalize font-semibold">
                      {selectedProject.status}
                    </span>
                  </div>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-sm">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-3">
                {selectedProject.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {/* Project Image */}
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-48 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                {/* Features */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges & Solutions */}
              {(selectedProject.challenges || selectedProject.solutions) && (
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                  {selectedProject.challenges && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 sm:p-6 border border-red-200 dark:border-red-800/50">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        Challenges
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.challenges.map((challenge: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                              {challenge}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.solutions && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-800/50">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Solutions
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.solutions.map((solution: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                              {solution}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow hover:shadow-md">
                  <span>View Project</span>
                  <FaExternalLinkAlt className="ml-2" size={14} />
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <FaPlay className="mr-2" size={14} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
