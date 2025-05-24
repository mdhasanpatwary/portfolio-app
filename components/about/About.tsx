'use client';

import Image from 'next/image';
import React from 'react';

const About: React.FC = () => {
    return (
        <section
            id="about"
            className="w-full py-24 px-6 bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
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
                <div>
                    <h2 className="text-4xl font-extrabold mb-4">About Me</h2>
                    <p className="text-lg mb-4 leading-relaxed">
                        I&#39;m a passionate Front-End Developer with over 6 years of experience turning designs into interactive, accessible, and performant web applications. I believe in clean code, scalable architecture, and creating delightful user experiences.
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
                        Beyond pixels and code, I enjoy learning new technologies, mentoring juniors, and staying current with UI/UX trends. I thrive in collaborative teams and love solving real-world problems with smart solutions.
                    </p>

                    <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>🎯 Problem Solver</li>
                        <li>💡 Fast Learner</li>
                        <li>🧩 Team Player</li>
                        <li>📚 Curious Mind</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;