"use client";

import { FC } from "react";
import {
  FaChessKnight,
  FaCamera,
  FaBookOpen,
  FaGlobe,
  FaLightbulb,
} from "react-icons/fa";
import { iconMap } from "@/components/global/IconMap";

type HobbyType = { title: string; description: string; icon: string };
type HobbyProps = { hobbies: HobbyType[] };

const Hobby: FC<HobbyProps> = ({ hobbies }) => {
  return (
    <section
      id="hobby"
      className="w-full py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Hobbies & Interests
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Outside of development, these activities help me stay creative and
          balanced.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => {
            const Icon = iconMap[hobby.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="group rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl transition duration-300 text-left">
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hobby;
