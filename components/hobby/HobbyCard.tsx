import { FC } from "react";
import { Hobby } from "../../types/data";

interface HobbyCardProps {
  hobby: Hobby;
  iconMap: Record<string, FC>;
}

const HobbyCard: FC<HobbyCardProps> = ({ hobby, iconMap }) => {
  const Icon = iconMap[hobby.icon as keyof typeof iconMap];
  return (
    <div className="relative group flex flex-col justify-between h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 text-left hover:border-primary-500 dark:hover:border-primary-400 overflow-hidden min-h-[180px] before:absolute before:inset-0 before:pointer-events-none before:select-none before:rounded-xl before:bg-gradient-to-br before:from-primary-500/7 before:to-white/3">
      <div className="text-3xl text-primary-600 dark:text-primary-400 mb-4 relative z-10">
        {Icon ? <Icon /> : null}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-primary-500 transition-colors relative z-10">
        {hobby.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm relative z-10">
        {hobby.description}
      </p>
    </div>
  );
};

export default HobbyCard;
