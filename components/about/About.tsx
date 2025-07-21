'use client';

import Image from 'next/image';
import React from 'react';

const About: React.FC = () => {
    return (
        <section
            id="about"
            className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
                {/* Image */}
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl md:col-span-5">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/1200px-TrumpPortrait.jpg"
                        alt="MD Hasan Patwary"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                        style={{ objectFit: 'cover' }}
                        className="rounded-2xl grayscale hover:grayscale-0 transition duration-500"
                    />
                </div>

                {/* Text */}
                <div className="md:col-span-7">
                    <h2 className="text-4xl font-extrabold mb-4">About Me</h2>
                    <h3 className="text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">
                        Front-End Developer (React, Next.js, TypeScript) | UI/UX Engineer
                    </h3>
                    <div className="text-md md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Leader in Scalable Web Apps &bull; Docker & AWS &bull; 6+ Years Exp.
                    </div>
                    <div className="text-md md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Delivered for 30K+ Global Clients &bull; Open to Remote/Relocation
                    </div>
                    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4">
                        I specialize in building robust, scalable, and beautiful web applications using React, Next.js, and TypeScript. My focus is on clean code, performance, and delightful user experiences. Experienced with Docker, AWS, and modern development workflows.
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                        I thrive in collaborative teams, mentor juniors, and stay ahead of UI/UX trends. Let’s build something amazing together.
                    </p>
                    <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>🎯 Problem Solver</li>
                        <li>💡 Fast Learner</li>
                        <li>🧩 Team Player</li>
                        <li>🌍 Global Impact</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;