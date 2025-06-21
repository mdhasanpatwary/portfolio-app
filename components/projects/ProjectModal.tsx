"use client";

import { FC } from "react";
import Image from "next/image";
import type { Projects as ProjectsType } from "@/types/data";
import { FaExternalLinkAlt, FaPlay } from "react-icons/fa";
import Modal from "@/components/global/Modal";
import { getStatusIcon, getStatusColor } from "@/utils";

interface ProjectModalProps {
  project: ProjectsType["items"][number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" showCloseButton={false}>
      {/* Modal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
          <div
            className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium shadow-sm ${getStatusColor(
              project.status
            )}`}>
            {getStatusIcon(project.status)}
            <span className="ml-1.5 capitalize font-semibold">
              {project.status}
            </span>
          </div>
          <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-3">
        {project.title}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        {project.longDescription || project.description}
      </p>

      {/* Project Image */}
      <div className="mb-6">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
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
            {project.features?.map((feature: string, index: number) => (
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
            {project.technologies.map((tech: string, index: number) => (
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
      {(project.challenges || project.solutions) && (
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {project.challenges && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 sm:p-6 border border-red-200 dark:border-red-800/50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                Challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge: string, index: number) => (
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

          {project.solutions && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-800/50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Solutions
              </h3>
              <ul className="space-y-3">
                {project.solutions.map((solution: string, index: number) => (
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
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 dark:hover:bg-indigo-500 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500">
          <span>View Project</span>
          <FaExternalLinkAlt size={14} />
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-2 border border-indigo-600 text-indigo-600 text-sm font-medium rounded hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-800 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500">
          <FaPlay size={14} />
          <span>Live Demo</span>
        </a>
      </div>
    </Modal>
  );
};

export default ProjectModal;
