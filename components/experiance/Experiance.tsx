import React from 'react';
import { FaBriefcase, FaHtml5, FaCss3Alt, FaDocker, FaGitAlt } from 'react-icons/fa';
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiJquery, SiBootstrap, SiJavascript, SiTypescript,
    SiSass, SiGithub, SiVuedotjs, SiMaterialdesignicons, SiAmazon, SiGulp, SiWebpack, SiFigma
} from 'react-icons/si';

type ExperienceItem = {
    company: string;
    role: string;
    duration: string;
    location: string;
    highlights: string[];
    techStack: React.ReactNode[];
};

const experiences: ExperienceItem[] = [
    {
        company: '6amtech',
        role: 'Front-End Developer',
        duration: 'Jul 2022 – Present',
        location: 'Dhaka, Bangladesh',
        highlights: [
            'Developed scalable and performant frontend solutions for Demandium and Hexaride from scratch.',
            'Redesigned core UI/UX for flagship products like 6valley and 6amMart based on customer feedback and user testing.',
            'Built responsive layouts using Tailwind CSS and React components, ensuring accessibility and mobile-first designs.',
            'Collaborated with backend team to optimize API performance and UI data handling using Axios and React hooks.',
            'Integrated CI/CD pipelines and GitHub workflows for automatic linting and build checks.',
            'Contributed to Docker-based local development environment setup for faster onboarding.',
            'Worked with AWS services to deploy frontend builds and manage assets efficiently.',
            'Participated in code reviews and introduced reusable component patterns to improve maintainability.',
            'Wrote documentation and developer onboarding guides for internal use.'
        ],
        techStack: [
            <SiReact key="react" />, <SiNextdotjs key="next" />, <SiMaterialdesignicons key="Materialui" />, <SiTailwindcss key="tailwind" />, <FaDocker key="docker" />,
            <SiTypescript key="ts" />, <SiGithub key="github" />, <SiAmazon key="aws" />, <FaGitAlt key="git" />, <SiWebpack key="webpack" />,
        ],
    },
    {
        company: 'Themelooks',
        role: 'Front-End Developer',
        duration: 'Aug 2019 – Jul 2022',
        location: 'Dhaka, Bangladesh',
        highlights: [
            'Developed over 10+ ThemeForest templates and Codecanyon web applications.',
            'Created responsive multipurpose admin dashboards such as Dashmin and commercial landing pages.',
            'Rewrote legacy jQuery projects using modern JavaScript and Bootstrap 5.',
            'Implemented modern design systems and reusable UI kits using SASS and Gulp.',
            'Collaborated with designers using Figma to translate design into pixel-perfect UI.',
            'Worked on Vue and React-based single-page applications (SPAs).',
            'Optimized assets and improved Lighthouse performance score by up to 40%.',
            'Ensured full cross-browser support and maintained W3C-compliant markup.',
            'Provided after-sale support and customization help to clients.'
        ],
        techStack: [
            <FaHtml5 key="html" />, <FaCss3Alt key="css" />, <SiJavascript key="js" />, <SiJquery key="jquery" />,
            <SiBootstrap key="bootstrap" />, <SiSass key="sass" />, <SiVuedotjs key="vue" />, <SiGulp key="gulp" />,
            <SiFigma key="figma" />
        ],
    },
];

const ProfessionalExperience = () => {
    return (
        <section
            id="experience"
            className="w-full py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Professional Experience
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                    Creative, functional, and scalable – here are some highlights of my work.
                </p>

                <div className="relative lg:border-l border-gray-300 dark:border-gray-600 text-left">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative lg:pl-10 mb-16 group">
                            {/* Timeline Dot */}
                            <div className="hidden lg:block absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-gray-900 z-10 shadow-lg transition group-hover:scale-110" />

                            {/* Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{exp.role}</h3>
                                    <FaBriefcase className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    {exp.company} — {exp.location}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-4">
                                  {exp.duration}
                                </span>

                                <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                                    {exp.highlights.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-3 text-lg text-indigo-600 dark:text-indigo-400">
                                    {exp.techStack.map((icon, idx) => (
                                        <span key={idx} className="hover:text-indigo-700 dark:hover:text-indigo-300 transition">
                                          {icon}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalExperience;
