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
} from 'react-icons/si';

const skills = [
    {
        title: 'Languages & Frameworks',
        technologies: [
            { name: 'HTML5', icon: <FaHtml5 className="text-orange-600" /> },
            { name: 'CSS3', icon: <FaCss3Alt className="text-blue-600" /> },
            { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
            { name: 'TypeScript', icon: <SiNextdotjs className="text-gray-800" /> },
            { name: 'React.js', icon: <FaReact className="text-blue-400" /> },
            { name: 'Vue.js', icon: <FaVuejs className="text-green-500" /> },
            { name: 'Next.js', icon: <SiNextdotjs className="text-gray-800" /> },
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
            { name: 'Material UI', icon: <FaReact className="text-blue-500" /> },
            { name: 'Figma', icon: <FaFigma className="text-pink-400" /> },
            { name: 'Adobe XD', icon: <SiAdobexd className="text-pink-500" /> },
            { name: 'Photoshop', icon: <SiAdobephotoshop className="text-indigo-700" /> },
        ],
    },
    {
        title: 'Tools & DevOps',
        technologies: [
            { name: 'Git', icon: <FaGitAlt className="text-red-500" /> },
            { name: 'GitHub', icon: <FaGitAlt className="text-black" /> },
            { name: 'Gulp', icon: <FaGulp className="text-pink-600" /> },
            { name: 'Webpack', icon: <SiWebpack className="text-slate-500" /> },
            { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
            { name: 'AWS', icon: <FaAws className="text-orange-400" /> },
            { name: 'Linux', icon: <FaLinux className="text-black" /> },
            { name: 'Automation', icon: <FaReact className="text-green-400" /> },
            { name: 'Animation', icon: <FaReact className="text-pink-300" /> },
        ],
    },
];

const Skills: React.FC = () => (
    <section id="skills" className="w-full py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {skills.map((group, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8"
                    >
                        <h3 className="text-xl font-semibold text-blue-600 mb-6">{group.title}</h3>
                        <div className="grid grid-cols-3 gap-6 justify-items-center">
                            {group.technologies.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300"
                                >
                                    <div className="text-4xl mb-2">{tech.icon}</div>
                                    <span className="text-sm text-gray-700">{tech.name}</span>
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