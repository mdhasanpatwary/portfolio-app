import React from "react";
import Card from "../global/Card";
import { FaArrowRight, FaCss3Alt } from "react-icons/fa";

interface CssTip {
  id: number;
  title: string;
  description: string;
}

interface CssTipCardProps {
  tip: CssTip;
  onClick?: () => void;
}

const CssTipCard: React.FC<CssTipCardProps> = ({ tip, onClick }) => (
  <Card
    className="relative h-full flex flex-col cursor-pointer rounded-2xl p-7 bg-white/70 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/80 shadow-xl dark:shadow-2xl hover:shadow-[0_8px_32px_0_rgba(60,80,180,0.18)] dark:hover:shadow-[0_8px_32px_0_rgba(80,120,255,0.22)] hover:bg-white/90 dark:hover:bg-slate-800/90 hover:border-primary-300 dark:hover:border-primary-400 transition-all duration-200 group overflow-hidden"
    variant="elevated"
    padding="none"
    onClick={onClick}
  >
    {/* Accent bar */}
    <span className="absolute top-0 left-0 h-1.5 w-12 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-300 dark:from-primary-400 dark:via-primary-500 dark:to-primary-400 rounded-tr-xl" />
    {/* Subtle CSS icon */}
    <FaCss3Alt className="absolute top-4 right-4 text-primary-400 dark:text-primary-300 text-2xl opacity-20 pointer-events-none" aria-hidden="true" focusable="false" />
    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight leading-snug">
      {tip.title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line flex-1 line-clamp-5 mb-6 text-base leading-relaxed">
      {tip.description}
    </p>
    <div className="flex items-center gap-2 mt-auto text-primary-700 dark:text-primary-300 group-hover:opacity-100 transition-opacity text-base font-semibold select-none">
      <FaArrowRight className="text-lg" aria-hidden="true" focusable="false" />
      View Details
    </div>
  </Card>
);

export default CssTipCard;