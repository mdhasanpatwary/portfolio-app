import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaReact,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiSass,
  SiGithub,
  SiVuedotjs,
  SiMaterialdesignicons,
  SiAmazon,
  SiGulp,
  SiWebpack,
  SiFigma,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";
import ExperienceAchievements from "./ExperienceAchievements";

const iconMap = {
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaReact,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiSass,
  SiGithub,
  SiVuedotjs,
  SiMaterialdesignicons,
  SiAmazon,
  SiGulp,
  SiWebpack,
  SiFigma,
  SiAdobexd,
  SiAdobephotoshop,
};

const brandColors = {
  FaHtml5: "#E44D26",
  FaCss3Alt: "#1572B6",
  FaDocker: "#2496ED",
  FaGitAlt: "#F05032",
  FaReact: "#61DAFB",
  SiReact: "#61DAFB",
  SiNextdotjs: "#000000",
  SiTailwindcss: "#06B6D4",
  SiJquery: "#0769AD",
  SiBootstrap: "#7952B3",
  SiJavascript: "#F7DF1E",
  SiTypescript: "#3178C6",
  SiSass: "#CC6699",
  SiGithub: "#181717",
  SiVuedotjs: "#42B883",
  SiMaterialdesignicons: "#1976D2",
  SiAmazon: "#FF9900",
  SiGulp: "#CF4647",
  SiWebpack: "#8DD6F9",
  SiFigma: "#F24E1E",
  SiAdobexd: "#FF61F6",
  SiAdobephotoshop: "#31A8FF",
};

type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  location: string;
  website: string;
  highlights: string[];
  techStack: { icon: string; name: string }[];
};

const ExperienceCard: React.FC<{ experience: ExperienceItem }> = ({
  experience,
}) => {
  const AchievementItem = ({ point }: { point: string }) => (
    <li className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex">
      <span className="text-xs leading-relaxed">{point}</span>
    </li>
  );

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500 overflow-hidden">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <h3 className="text-base sm:text-lg font-semibold text-primary-700 dark:text-primary-400 truncate group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors">
                {experience.role}
              </h3>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                at
              </span>
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {experience.company}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-primary-500 dark:text-primary-400 text-xs" aria-hidden="true" focusable="false" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-primary-500 dark:text-primary-400 text-xs" aria-hidden="true" focusable="false" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors">
            <span className="hidden sm:inline">Visit</span>
            <FaExternalLinkAlt className="text-xs" aria-hidden="true" focusable="false" />
          </a>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-3 sm:px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {experience.techStack.map((tech, idx) => {
            const Icon = iconMap[tech.icon as keyof typeof iconMap];
            return (
              <span
                key={idx}
                className="group/tech relative text-lg sm:text-xl hover:scale-110 transform transition-all duration-200"
                style={{
                  color:
                    brandColors[tech.icon as keyof typeof brandColors] ||
                    "var(--color-primary-500)",
                }}
                role="img"
                aria-label={tech.name}>
                {Icon && <Icon aria-hidden="true" focusable="false" />}
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-xs rounded-md opacity-0 group-hover/tech:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                  {tech.name}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800">
        {/* Mobile - Expandable */}
        <ExperienceAchievements highlights={experience.highlights} />

        {/* Desktop - Always Visible */}
        <div className="hidden sm:block">
          <ul className="grid grid-cols-2 gap-2">
            {experience.highlights.map((point, idx) => (
              <AchievementItem key={idx} point={point} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
