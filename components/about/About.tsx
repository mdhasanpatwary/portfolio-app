'use client';

import Image from 'next/image';
import React from 'react';

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
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl md:col-span-5">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            style={{ objectFit: 'cover' }}
            className="rounded-2xl grayscale hover:grayscale-0 transition duration-500"
          />
        </div>
        {/* Text */}
        <div className="md:col-span-7">
          <h2 className="text-4xl font-extrabold mb-4">{about.title}</h2>
          <h3 className="text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">
            {about.subtitle}
          </h3>
          <div className="text-md md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {about.highlights.slice(0, 3).join(' • ')}
          </div>
          <div className="text-md md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            {about.highlights.slice(3).join(' • ')}
          </div>
          {about.description.map((desc, idx) => (
            <p
              key={idx}
              className={`text-base md:text-lg ${idx === 0 ? 'text-gray-700 dark:text-gray-300 mb-4' : 'text-gray-600 dark:text-gray-400 mb-6'}`}
            >
              {desc}
            </p>
          ))}
          <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            {about.traits.map((trait, idx) => (
              <li key={idx}>{trait}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;