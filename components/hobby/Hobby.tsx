import { FC } from "react";
import {
  FaChessKnight,
  FaCamera,
  FaBookOpen,
  FaGlobe,
  FaLightbulb,
  FaVideo,
} from "react-icons/fa";
import HobbyCard from "./HobbyCard";
import SectionTitle from "../global/SectionTitle";
import type { HobbiesSection, Hobby } from "../../types/data";

const iconMap = {
  FaChessKnight,
  FaCamera,
  FaBookOpen,
  FaGlobe,
  FaLightbulb,
  FaVideo,
};

type HobbyProps = { hobbiesData: HobbiesSection };

const Hobby: FC<HobbyProps> = ({ hobbiesData }) => {
  const { title, subtitle, items } = hobbiesData;
  return (
    <section
      id="hobby"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle
          title={title}
          icon={
            <span className="text-3xl text-primary-600 dark:text-primary-400">
              <FaLightbulb />
            </span>
          }>
          {subtitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((hobby: Hobby, index: number) => (
            <HobbyCard key={index} hobby={hobby} iconMap={iconMap} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobby;
