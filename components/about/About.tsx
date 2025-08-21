import React from 'react';
import { CustomImage } from '@/components/global';

export interface AboutData {
  name: string;
  title: string;
  subtitle: string;
  highlights: string[];
  description: string[];
  traits: string[];
  image: {
    src: string;
    alt: string;
  };
}

interface AboutProps {
  about: AboutData;
}

const About: React.FC<AboutProps> = ({ about }) => {
  return (
    <section
      id="about"
      className="w-full py-20 md:py-32 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center md:justify-end md:col-span-5">
          <div className="relative w-[260px] h-[480px] md:w-[320px] md:h-[600px] overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/40 dark:bg-gray-900/40">
            <CustomImage
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 320px, 320px"
              style={{ objectFit: 'cover', objectPosition: 'top center', transform: 'scaleX(-1)' }}
              className="select-none"
              priority
              blurType="profile"
            />
          </div>
        </div>
        {/* Divider for desktop */}
        <div className="hidden md:block md:col-span-1 h-[480px] md:h-[600px] border-l border-gray-200 dark:border-gray-700 mx-2" aria-hidden="true"></div>
        {/* Text */}
        <div className="md:col-span-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            {about.title}
          </h2>
          <h3 className="text-lg md:text-2xl font-semibold text-primary-700 dark:text-primary-400 mb-3">
            {about.subtitle}
          </h3>
          <div className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {about.highlights.slice(0, 3).join(' • ')}
          </div>
          {about.highlights.length > 3 && (
            <div className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
              {about.highlights.slice(3).join(' • ')}
            </div>
          )}
          {about.description.map((desc, idx) => (
            <p
              key={idx}
              className={`text-base md:text-lg ${idx === 0 ? 'text-gray-700 dark:text-gray-300 mb-4' : 'text-gray-600 dark:text-gray-300 mb-6'}`}
            >
              {desc}
            </p>
          ))}
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 mt-4">
            {about.traits.map((trait, idx) => (
              <li key={idx} className="before:content-['–'] before:mr-2">{trait}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;