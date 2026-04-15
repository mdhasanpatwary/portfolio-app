"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  FaCode,
  FaFolderOpen,
  FaGlobe,
  FaGraduationCap,
  FaChessKing,
  FaLaptop,
} from "react-icons/fa";
import { FunFact } from "@/types/data";
import { useInView, animate } from "framer-motion";

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
  FaLaptop: "#38bdf8", // lighter primary/blue
};

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([0-9]+)(.*)$/);
    if (match) {
      const num = parseInt(match[1] || "0", 10);
      const suffix = match[2] || "";
      const controls = animate(0, num, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v) + suffix)
      });
      return () => controls.stop();
    } else {
      setDisplay(value);
    }
    return undefined;
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

interface FunfactCardProps {
  fact: FunFact;
}

const FunfactCard: FC<FunfactCardProps> = ({ fact }) => {
  const Icon = iconMap[fact.icon as keyof typeof iconMap];
  const color = brandColors[fact.icon] || "#ffffff";
  
  return (
    <div
      tabIndex={0}
      aria-label={`${fact.value} ${fact.title}`}
      className="relative flex flex-col items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-white/10 outline-none group overflow-hidden">
      {Icon ? (
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Icon
            className="text-3xl relative z-10"
            aria-label={fact.title}
            title={fact.title}
            style={{ color }}
          />
        </div>
      ) : null}
      <div className="text-5xl font-black text-white relative z-10 drop-shadow-sm tracking-tight">
        <AnimatedNumber value={fact.value} />
      </div>
      <div
        className="text-lg font-bold text-white text-center relative z-10"
        title={fact.description}>
        {fact.title}
      </div>
      <p className="text-sm text-primary-100 text-center mt-1">
        {fact.description}
      </p>
    </div>
  );
};

export default FunfactCard;
