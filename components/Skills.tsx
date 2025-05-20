// components/Skills.tsx

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
} from "react-icons/fa";
import {
    SiJquery,
    SiNextdotjs,
    SiNuxtdotjs,
    SiTailwindcss,
    SiWebpack,
    SiAdobephotoshop,
} from "react-icons/si";

const PhotoshopIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#31A8FF" />
        <text x="12" y="16" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Ps</text>
    </svg>
)

const skills = [
    {
        title: "Languages & Frameworks",
        technologies: [
            { name: "HTML5", icon: <FaHtml5 className="text-orange-600" /> },
            { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" /> },
            { name: "JavaScript", icon: <FaJs className="text-yellow-500" /> },
            { name: "TypeScript", icon: <SiNextdotjs className="text-black" /> },
            { name: "React.js", icon: <FaReact className="text-blue-400" /> },
            { name: "Vue.js", icon: <FaVuejs className="text-green-500" /> },
            { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
            { name: "Nuxt.js", icon: <SiNuxtdotjs className="text-green-700" /> },
            { name: "jQuery", icon: <SiJquery className="text-purple-500" /> },
            { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
        ],
    },
    {
        title: "Styling & UI",
        technologies: [
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
            { name: "SASS", icon: <FaSass className="text-pink-500" /> },
            { name: "Bootstrap", icon: <FaBootstrap className="text-indigo-600" /> },
            { name: "Material UI", icon: <FaReact className="text-blue-600" /> },  // substitute React icon
            { name: "Figma", icon: <FaFigma className="text-pink-400" /> },
            { name: "Adobe XD", icon: <SiAdobephotoshop className="text-purple-600" /> },
            { name: "Photoshop", icon: <PhotoshopIcon className="text-blue-800" /> },
        ],
    },
    {
        title: "Tools & DevOps",
        technologies: [
            { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
            { name: "GitHub", icon: <FaGitAlt className="text-black" /> },
            { name: "Gulp", icon: <FaGulp className="text-pink-700" /> },
            { name: "Webpack", icon: <SiWebpack className="text-gray-600" /> },
            { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
            { name: "AWS", icon: <FaAws className="text-orange-400" /> },
            { name: "Linux", icon: <FaLinux className="text-black" /> },
            { name: "Automation", icon: <FaReact className="text-green-500" /> }, // generic substitute
            { name: "Animation", icon: <FaReact className="text-pink-300" /> },  // generic substitute
        ],
    },
];

const Skills: React.FC = () => (
    <section id="skills" className="py-20 bg-gray-50 px-6 text-center">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Skills</h2>
            <div className="grid md:grid-cols-3 gap-10">
                {skills.map((group, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">{group.title}</h3>
                        <div className="grid grid-cols-3 gap-6 justify-items-center">
                            {group.technologies.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
                                >
                                    <div className="text-4xl mb-1">{tech.icon}</div>
                                    <span className="text-sm text-gray-600">{tech.name}</span>
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
