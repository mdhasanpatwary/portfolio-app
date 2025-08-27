import React from "react";
import { Banner as BannerType } from "@/types/data";
import SocialLinks from "../global/SocialLinks";
import BannerButtons from "./BannerButtons";
import { CustomImage } from "@/components/global";

type BannerProps = {
  readonly banner: BannerType;
};

const Banner: React.FC<BannerProps> = ({ banner }) => {
  const { name, title, summary, image } = banner;
  return (
    <section
      id="banner"
      className="relative w-full bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-40 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            Hi, I&#39;m{" "}
            <span className="text-primary-600 dark:text-primary-400">{name}</span>
          </h1>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            {title}
          </h2>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-6">
            {summary}
          </p>
          {/* Buttons */}
          <BannerButtons />
          {/* Social Links */}
          <SocialLinks />
        </div>
        {/* Profile Image */}
        <div
          className="relative w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full overflow-hidden border-4 border-primary-100 dark:border-gray-700 shadow-lg">
          <CustomImage
            src={image}
            alt={`Profile picture of ${name}`}
            sizes="(max-width: 768px) 320px, (max-width: 1200px) 400px, 480px"
            fill
            priority
            fetchPriority="high"
            blurType="profile"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
