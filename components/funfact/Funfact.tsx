"use client";

import { FC, JSX } from "react";
import {
    FaCode,
    FaFolderOpen,
    FaGlobe,
    FaGraduationCap,
    FaChessKing,
} from "react-icons/fa";

interface Fact {
    icon: JSX.Element;
    label: string;
    value: string;
}

const funFacts: Fact[] = [
    {
        icon: <FaCode className="text-indigo-600 dark:text-indigo-400 text-3xl mb-2" />,
        label: "Lines of Code",
        value: "500K+",
    },
    {
        icon: <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl mb-2" />,
        label: "Projects Completed",
        value: "30+",
    },
    {
        icon: <FaGlobe className="text-indigo-600 dark:text-indigo-400 text-3xl mb-2" />,
        label: "Countries Reached",
        value: "15+",
    },
    {
        icon: <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-3xl mb-2" />,
        label: "Years of Experience",
        value: "6+",
    },
    {
        icon: <FaChessKing className="text-indigo-600 dark:text-indigo-400 text-3xl mb-2" />,
        label: "Chess Games Played",
        value: "1000+",
    },
];

const FunFact: FC = () => {
    return (
        <section
            id="funfact"
            className="w-full py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                    Fun Facts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    Some cool stats and facts about my journey so far.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {funFacts.map((fact, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition"
                        >
                            {fact.icon}
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {fact.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                                {fact.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FunFact;
