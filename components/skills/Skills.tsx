'use client';

import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaVuejs,
    FaNodeJs,
    FaGitAlt,
    FaDocker,
    FaAws,
    FaSass,
    FaGulp,
    FaLinux,
    FaBootstrap,
    FaFigma,
} from 'react-icons/fa';
import {
    SiJquery,
    SiNextdotjs,
    SiTailwindcss,
    SiWebpack,
    SiAdobephotoshop,
    SiAdobexd,
    SiTypescript
} from 'react-icons/si';
import React from "react";

const skills = [
    {
        title: 'Languages & Frameworks',
        technologies: [
            { name: 'HTML5', icon: <FaHtml5 className="text-orange-600" /> },
            { name: 'CSS3', icon: <FaCss3Alt className="text-indigo-600" /> },
            { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
            { name: 'TypeScript', icon: <SiTypescript className="text-gray-800 dark:text-gray-100" /> },
            { name: 'React.js', icon: <FaReact className="text-indigo-400 dark:text-indigo-300" /> },
            { name: 'Vue.js', icon: <FaVuejs className="text-green-500" /> },
            { name: 'Next.js', icon: <SiNextdotjs className="text-gray-800 dark:text-gray-100" /> },
            { name: 'jQuery', icon: <SiJquery className="text-purple-500" /> },
            { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
        ],
    },
    {
        title: 'Styling & UI',
        technologies: [
            { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
            { name: 'SASS', icon: <FaSass className="text-pink-500" /> },
            { name: 'Bootstrap', icon: <FaBootstrap className="text-indigo-600" /> },
            { name: 'Material UI', icon: <FaReact className="text-indigo-500" /> },
            { name: 'Figma', icon: <FaFigma className="text-pink-400 dark:text-pink-300" /> },
            { name: 'Adobe XD', icon: <SiAdobexd className="text-pink-500" /> },
            { name: 'Photoshop', icon: <SiAdobephotoshop className="text-indigo-700 dark:text-indigo-400" /> },
        ],
    },
    {
        title: 'Tools & DevOps',
        technologies: [
            { name: 'Git', icon: <FaGitAlt className="text-red-500" /> },
            { name: 'GitHub', icon: <FaGitAlt className="text-black dark:text-white" /> },
            { name: 'Gulp', icon: <FaGulp className="text-pink-600" /> },
            { name: 'Webpack', icon: <SiWebpack className="text-slate-500 dark:text-slate-300" /> },
            { name: 'Docker', icon: <FaDocker className="text-indigo-400" /> },
            { name: 'AWS', icon: <FaAws className="text-orange-400" /> },
            { name: 'Linux', icon: <FaLinux className="text-black dark:text-white" /> },
            { name: 'Automation', icon: <FaReact className="text-green-400" /> },
            { name: 'Animation', icon: <FaReact className="text-pink-300" /> },
        ],
    },
];

const Skills: React.FC = () => (
    <section
        id="skills"
        className="w-full py-24 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6"
    >
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Skills</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                Technologies I use to build seamless, performant, and responsive web experiences.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {skills.map((group, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 p-8"
                    >
                        <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
                            {group.title}
                        </h3>
                        <div className="grid grid-cols-3 gap-6 justify-items-center">
                            {group.technologies.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300"
                                >
                                    <div className="text-4xl mb-2">{tech.icon}</div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Skills;