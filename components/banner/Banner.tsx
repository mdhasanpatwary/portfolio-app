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
            className="relative w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-40 px-6"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Text Content */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                        Hi, I&#39;m <span className="text-indigo-600 dark:text-indigo-400">{name}</span>
                    </h1>
                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                        {title}
                    </h2>
                    <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {summary}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <a
                            href="#contact"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
                        >
                            Contact Me
                        </a>
                        <a
                            href="/resume.pdf"
                            className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-800 transition"
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
                            className="hover:text-indigo-600 dark:hover:text-indigo-400"
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
                <div className="relative w-80 h-80 md:w-100 md:h-100 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-gray-700 shadow-lg">
                    <Image
                        src="/profile.png"
                        alt="MD Hasan Patwary"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        fill
                        priority={true}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;