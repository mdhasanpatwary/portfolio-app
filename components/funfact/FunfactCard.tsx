import { FC } from "react";
import {
  FaCode,
  FaFolderOpen,
  FaGlobe,
  FaGraduationCap,
  FaChessKing,
  FaLaptop,
} from "react-icons/fa";
import { FunFact } from "@/types/data";

const iconMap = {
  FaCode,
  FaFolderOpen,
  FaGlobe,
  FaGraduationCap,
  FaChessKing,
  FaLaptop,
};

const brandColors: Record<string, string> = {
  FaFolderOpen: "#10B981",
  FaGlobe: "#F59E42",
  FaGraduationCap: "#F43F5E",
  FaChessKing: "#FBBF24",
  FaLaptop: "var(--color-primary-500)",
};

interface FunfactCardProps {
  fact: FunFact;
}

const FunfactCard: FC<FunfactCardProps> = ({ fact }) => {
  const Icon = iconMap[fact.icon as keyof typeof iconMap];
  return (
    <div
      tabIndex={0}
      aria-label={`${fact.value} ${fact.title}`}
      className="relative flex flex-col items-center gap-2 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition duration-300 ease-in-out hover:border-primary-400 dark:hover:border-primary-500 outline-none focus:border-primary-400 dark:focus:border-primary-500 group overflow-hidden before:absolute before:inset-0 before:pointer-events-none before:select-none before:rounded-lg before:bg-gradient-to-br before:from-primary-500/7 before:to-white/3">
      {Icon ? (
        <Icon
          className="mb-2 text-3xl md:text-4xl relative z-10"
          aria-label={fact.title}
          title={fact.title}
          style={{
            color:
              brandColors[fact.icon as keyof typeof brandColors] ||
              "var(--color-primary-500)",
          }}
        />
      ) : null}
      <div className="text-2xl md:text-3xl font-extrabold text-primary-600 dark:text-primary-400 relative z-10">
        {fact.value}
      </div>
      <div
        className="text-base font-semibold text-gray-900 dark:text-white text-center relative z-10"
        title={fact.description}>
        {fact.title}
      </div>
    </div>
  );
};

export default FunfactCard;
