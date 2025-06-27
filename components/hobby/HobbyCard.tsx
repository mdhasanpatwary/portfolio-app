import { FC } from "react";
import { Hobby } from "../../types/data";

interface HobbyCardProps {
  hobby: Hobby;
  iconMap: Record<string, FC>;
}

const HobbyCard: FC<HobbyCardProps> = ({ hobby, iconMap }) => {
  const Icon = iconMap[hobby.icon as keyof typeof iconMap];
  return (
    <div className="relative group flex flex-col justify-between h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 text-left hover:border-indigo-500 dark:hover:border-indigo-400 overflow-hidden min-h-[220px]">
      {/* Subtle gradient overlay for premium feel */}
      <div
        className="absolute inset-0 pointer-events-none select-none rounded-xl"
        style={{
          background:
            "linear-gradient(135deg,rgba(99,102,241,0.07) 0%,rgba(255,255,255,0.03) 100%)",
        }}
      />
      <div className="relative z-10">
        <div className="text-3xl text-indigo-600 dark:text-indigo-400 mb-4">
          {Icon ? <Icon /> : null}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
          {hobby.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {hobby.description}
        </p>
      </div>
    </div>
  );
};

export default HobbyCard;
