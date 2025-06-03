import React from 'react';
import type { JSX } from 'react';
import {
    FaRocket,
    FaCogs,
    FaCode,
    FaPaintBrush,
    FaChartLine,
    FaMobileAlt,
    FaMagic,
    FaFigma,
    FaAws,
    FaDocker,
    FaTools,
    FaSearch,
} from 'react-icons/fa';

interface Service {
    title: string;
    description: string;
    tools: string[];
    icon: JSX.Element;
}

const services: Service[] = [
    {
        title: 'Project Modernization',
        description: 'Upgrade legacy systems using React, Next.js, and modern styling libraries.',
        tools: ['React', 'Next.js', 'Tailwind CSS'],
        icon: <FaRocket />,
    },
    {
        title: 'Version Migration',
        description: 'Safely migrate from older React/Next.js versions to latest stable releases.',
        tools: ['React 16 → 18', 'Next.js 12 → 15'],
        icon: <FaCogs />,
    },
    {
        title: 'jQuery to React Conversion',
        description: 'Rebuild jQuery-based UIs into scalable, component-driven React apps.',
        tools: ['JSX', 'Hooks', 'SPA Architecture'],
        icon: <FaCode />,
    },
    {
        title: 'Bootstrap Upgrade',
        description: 'Transform Bootstrap 3/4 layouts into responsive modern Bootstrap 5+ designs.',
        tools: ['Bootstrap 3/4 → 5+', 'Grid System', 'Flexbox'],
        icon: <FaPaintBrush />,
    },
    {
        title: 'Codebase Refactoring',
        description: 'Enhance readability, maintainability, and scalability of your frontend code.',
        tools: ['Clean Code', 'ESLint', 'Prettier'],
        icon: <FaChartLine />,
    },
    {
        title: 'UI/UX Redesign & Handoff',
        description: 'Revamp user interfaces with modern, accessible, brand-aligned designs.',
        tools: ['Figma', 'Responsive Design', 'Accessibility'],
        icon: <FaMobileAlt />,
    },
    {
        title: 'Animation & Interaction',
        description: 'Create engaging animations with CSS, GSAP, and Lottie for better user experience.',
        tools: ['CSS Animations', 'GSAP', 'Lottie'],
        icon: <FaMagic />,
    },
    {
        title: 'Figma to HTML/CSS',
        description: 'Convert pixel-perfect Figma designs into clean, responsive HTML and CSS.',
        tools: ['Figma', 'HTML5', 'CSS3', 'Responsive Design'],
        icon: <FaFigma />,
    },
    {
        title: 'SEO Best Practices',
        description: 'Implement on-page SEO strategies to improve search engine visibility and ranking.',
        tools: ['Meta Tags', 'Semantic HTML', 'Performance Optimization'],
        icon: <FaSearch />,
    },
    {
        title: 'AWS Deployment & Management',
        description: 'Deploy and manage web apps using AWS services like S3, CloudFront, and Lambda.',
        tools: ['AWS S3', 'CloudFront', 'Lambda'],
        icon: <FaAws />,
    },
    {
        title: 'Docker & Containerization',
        description: 'Set up containerized development and deployment environments with Docker.',
        tools: ['Dockerfiles', 'Docker Compose', 'Containers'],
        icon: <FaDocker />,
    },
    {
        title: 'Website Automation',
        description: 'Automate builds, deployments, and testing for efficient development workflows.',
        tools: ['CI/CD', 'GitHub Actions', 'Build Scripts'],
        icon: <FaTools />,
    },
];

const Services: React.FC = () => {
    return (
        <section
            id="services"
            className="w-full py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    What I Offer
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                    Scalable solutions, clean UI/UX, and modernization strategies that
                    elevate your product quality and speed.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="text-left group relative bg-white/70 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-2xl p-8 transition duration-300 ease-in-out hover:border-indigo-500"
                        >
                            <div className="absolute -top-6 left-6 bg-white dark:bg-gray-900 border border-indigo-500 p-3 rounded-full text-indigo-600 dark:text-indigo-400 text-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                                {service.icon}
                            </div>

                            <div className="pt-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {service.tools.map((tool, i) => (
                                        <span
                                            key={i}
                                            className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white text-xs font-medium px-3 py-1 rounded-full"
                                        >
                                          {tool}
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

export default Services;
