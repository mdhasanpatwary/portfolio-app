'use client';

import React from 'react';
import type { JSX } from 'react';
import { FaBriefcase, FaHtml5, FaCss3Alt, FaDocker } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTailwindcss, SiJquery, SiBootstrap } from 'react-icons/si';

type ExperienceItem = {
    company: string;
    role: string;
    duration: string;
    location: string;
    highlights: string[];
    techStack: JSX.Element[]; // ✅ Fix: JSX.Element instead of string
};

const experiences: ExperienceItem[] = [
    {
        company: '6amtech',
        role: 'Front-End Developer',
        duration: 'Jul 2022 – Present',
        location: 'Dhaka, Bangladesh',
        highlights: [
            'Developed Demandium and Hexaride from scratch with modern best practices.',
            'Contributed to Codecanyon profile and led UI redesigns across flagship products.',
            'Ensured scalable codebase architecture for long-term maintainability.',
        ],
        techStack: [<SiReact key="react" />, <SiNextdotjs key="next" />, <SiTailwindcss key="tailwind" />, <FaDocker key="docker" />],
    },
    {
        company: 'Themelooks',
        role: 'Front-End Developer',
        duration: 'Aug 2019 – Jul 2022',
        location: 'Dhaka, Bangladesh',
        highlights: [
            'Built 10+ ThemeForest items and multiple Codecanyon plugins.',
            'Designed and delivered commercial templates like Docland, Dashmin, Hosttop, and Anefty.',
            'Improved development pipelines and ensured pixel-perfect frontend across browsers.',
        ],
        techStack: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />, <SiJquery key="jquery" />, <SiBootstrap key="bootstrap" />],
    },
];

const ProfessionalExperience: React.FC = () => {
    return (
        <section
            id="experience"
            className="w-full py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-16">
                    Professional Experience
                </h2>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{exp.role}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {exp.company} — {exp.location}
                                    </p>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.duration}</span>
                                </div>
                                <FaBriefcase className="text-gray-400 dark:text-gray-500 text-lg" />
                            </div>

                            <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                                {exp.highlights.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-3 text-lg text-blue-600 dark:text-blue-400">
                                {exp.techStack.map((icon, idx) => (
                                    <span key={idx} className="hover:text-blue-700 dark:hover:text-blue-300 transition">
                    {icon}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalExperience;
