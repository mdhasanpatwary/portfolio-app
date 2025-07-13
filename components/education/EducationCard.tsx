import { FC } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import type { Education } from "@/types/data";
import Card from "@/components/global/Card";

interface EducationCardProps {
  item: Education["items"][number];
}

const EducationCard: FC<EducationCardProps> = ({ item }) => {
  return (
    <div className="relative">
      {/* Timeline line - hidden on mobile */}
      <div className="hidden md:block absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent"></div>
      {/* Timeline dot - hidden on mobile */}
      <div className="hidden md:block absolute left-4 top-6 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"></div>
      <Card className="md:ml-12" variant="default" padding="md">
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            {item.degree}
          </h3>
          <p className="text-sm text-gray-800 dark:text-gray-100 font-medium mb-2">
            {item.institution}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-1.5 w-fit">
            <FaCalendarAlt className="text-indigo-500" />
            <span className="font-medium">{item.period}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EducationCard;
