// components/Projects.tsx

import { FC } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

const projects: Project[] = [
    {
        title: "6valley",
        description: "A full-featured eCommerce solution built with Flutter & Laravel.",
        image: "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
        link: "https://codecanyon.net/item/6valley-multivendor-ecommerce-complete-ecommerce-system/31448597",
    },
    {
        title: "Demandium",
        description: "Service provider app for booking professionals for home services.",
        image: "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
        link: "https://codecanyon.net/item/demandium-multi-provider-on-demand-handyman-home-service-app-with-admin-panel/36842847",
    },
    {
        title: "Dashmin",
        description: "A modern, responsive admin dashboard template with clean UI.",
        image: "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
        link: "#",
    },
];

const Projects: FC = () => {
    return (
        <section
            id="projects"
            className="w-full py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6"
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    My Projects
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                    Creative, functional, and scalable – here are some highlights of my work.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <a
                            href={project.link}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                        >
                            <div className="relative overflow-hidden rounded-xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={376}
                                    height={202}
                                    className="w-full h-48 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md text-indigo-600 dark:text-indigo-400">
                                    <FaExternalLinkAlt size={14} />
                                </div>
                            </div>

                            <div className="mt-5 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-500 transition duration-300">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
