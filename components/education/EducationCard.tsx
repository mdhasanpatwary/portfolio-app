import { FC } from "react";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import type { Education } from "@/types/data";

interface EducationCardProps {
  item: Education["items"][number];
}

const EducationCard: FC<EducationCardProps> = ({ item }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 overflow-hidden">
      {/* Header with combined info */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors mb-1">
              {item.degree}
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-100 font-medium mb-2">
              {item.institution}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-indigo-500 dark:text-indigo-400" />
                <span>{item.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-indigo-500 dark:text-indigo-400" />
                <span>GPA: {item.gpa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined content section */}
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          {item.description}
        </p>

        {/* Skills and Achievements in a compact layout */}
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.keySkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Achievements
            </h4>
            <ul className="space-y-1">
              {item.achievements.map((achievement: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0"></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
