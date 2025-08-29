"use client";

import { FC } from "react";
import type { Projects as ProjectsType } from "@/types/data";
import { FaExternalLinkAlt, FaPlay, FaTimes } from "react-icons/fa";
import Modal from "@/components/global/Modal";
import { CustomImage } from "@/components/global";

interface ProjectModalProps {
  project: ProjectsType["items"][number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      showCloseButton={false}
      className="max-w-3xl rounded-lg">
      {/* Floating Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 bg-white dark:bg-gray-900 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 rounded-full shadow transition-colors transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-label="Close"
      >
        <FaTimes size={18} aria-hidden="true" focusable="false" />
      </button>

      {/* Hero Image */}
      <div className="relative mb-6 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
        <CustomImage
          src={project.image}
          alt={project.title}
          width={900}
          height={450}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
          blurType="project"
          className="w-full object-contain"
        />
        {/* Category badge matches card */}
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary-700 text-white text-xs font-semibold rounded-full shadow">
          {project.category}
        </span>
      </div>

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
          {project.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 bg-primary-700 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-primary-800 dark:hover:bg-primary-600 transition-colors gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
            <span>View Project</span>
            <FaExternalLinkAlt size={15} aria-hidden="true" focusable="false" />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 border border-primary-700 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-800 transition-colors gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
            <FaPlay size={15} aria-hidden="true" focusable="false" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6" />

      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        {project.longDescription || project.description}
      </p>

      {/* Details Sections */}
      <div className="space-y-6">
        {/* Features & Tech Stack */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
              Key Features
            </h3>
            <ul className="space-y-3">
              {project.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Tech Stack */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
