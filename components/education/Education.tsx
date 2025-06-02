"use client";

import { FC } from "react";
import { FaGraduationCap } from "react-icons/fa";

interface EducationItem {
    institution: string;
    degree: string;
    duration: string;
    details?: string;
}

const educationData: EducationItem[] = [
    {
        institution: "Alhaj Abdul Hoque Chowdury Degree College",
        degree: "Bachelor of Honours in Accounting",
        duration: "2013 – 2017",
        details: "Focused on financial reporting, auditing, and taxation with consistent academic results.",
    },
    {
        institution: "Alhaj Abdul Hoque Chowdury Degree College",
        degree: "Higher Secondary Certificate (HSC)",
        duration: "2011 – 2013",
        details: "Completed HSC from Commerce group with emphasis on business studies and accounting.",
    },
    {
        institution: "Dharmapur Educational Estate",
        degree: "Secondary School Certificate (SSC)",
        duration: "2006 – 2011",
        details: "Graduated from Science group with strong results and co-curricular involvement.",
    },
];

const Education: FC = () => {
    return (
        <section
            id="education"
            className="w-full py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-3xl" />
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Education
                    </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    My academic background in Accounting and Commerce.
                </p>

                <div className="space-y-10">
                    {educationData.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-white dark:bg-gray-900 border-l-4 border-indigo-600 dark:border-indigo-400 rounded-xl p-6 text-left shadow-md hover:shadow-lg transition duration-300"
                        >
              <span className="absolute -top-3 left-4 bg-indigo-600 dark:bg-indigo-500 text-white text-xs px-2 py-0.5 rounded shadow-md uppercase tracking-wide">
                {item.duration}
              </span>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {item.degree}
                            </h3>
                            <p className="text-indigo-700 dark:text-indigo-400 font-medium mb-1">
                                {item.institution}
                            </p>
                            {item.details && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {item.details}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
