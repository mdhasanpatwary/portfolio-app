'use client';

import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
import Image from 'next/image';
import {FC} from "react";

type BannerProps = {
    name: string;
    title: string;
    summary: string;
}

const Banner : FC<BannerProps> = ({name, title, summary}) => {
    return (
        <section
            id="banner"
            className="relative w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-40 px-6 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Text Content */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                        Hi, I&#39;m <span className="text-blue-600 dark:text-blue-400">{name}</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-3">
                        {title}
                    </h2>
                    <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {summary}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <a
                            href="#contact"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                        >
                            Contact Me
                        </a>
                        <a
                            href="/resume.pdf"
                            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Resume
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-5 text-gray-600 dark:text-gray-300 text-xl">
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 dark:hover:text-white"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://stackoverflow.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange-500 dark:hover:text-orange-400"
                        >
                            <FaStackOverflow />
                        </a>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="relative w-100 h-100 rounded-full overflow-hidden border-4 border-blue-100 dark:border-gray-700 shadow-lg">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/1200px-TrumpPortrait.jpg"
                        alt="MD Hasan Patwary"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;