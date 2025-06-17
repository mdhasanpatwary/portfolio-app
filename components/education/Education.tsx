"use client";

import { FC, useState } from "react";
import { FaMapMarkerAlt, FaAward, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    duration: string;
    details?: string;
    location?: string;
    gpa?: string;
    achievements?: string[];
    skills?: string[];
}

const educationData: EducationItem[] = [
    {
        id: "1",
        institution: "Alhaj Abdul Hoque Chowdury Degree College",
        degree: "Bachelor of Honours in Accounting",
        duration: "2013 – 2017",
        details: "Focused on financial reporting, auditing, and taxation with consistent academic results.",
        location: "Bangladesh",
        gpa: "3.8/4.0",
        achievements: [
            "Dean's List for Academic Excellence",
            "Senior Year Project Award",
            "Accounting Society Member"
        ],
        skills: ["Financial Reporting", "Auditing", "Taxation", "Business Analysis"]
    },
    {
        id: "2",
        institution: "Alhaj Abdul Hoque Chowdury Degree College",
        degree: "Higher Secondary Certificate (HSC)",
        duration: "2011 – 2013",
        details: "Completed HSC from Commerce group with emphasis on business studies and accounting.",
        location: "Bangladesh",
        gpa: "4.5/5.0",
        achievements: [
            "Top 5% in Class",
            "Business Club President",
            "Academic Excellence Award"
        ],
        skills: ["Business Studies", "Accounting", "Economics", "Mathematics"]
    },
    {
        id: "3",
        institution: "Dharmapur Educational Estate",
        degree: "Secondary School Certificate (SSC)",
        duration: "2006 – 2011",
        details: "Graduated from Science group with strong results and co-curricular involvement.",
        location: "Bangladesh",
        gpa: "4.8/5.0",
        achievements: [
            "Science Olympiad Winner",
            "Student Council Member",
            "Sports Achievement Award"
        ],
        skills: ["Science", "Mathematics", "English", "Bengali"]
    },
];

const Education: FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleCardClick = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section
            id="education"
            className="w-full py-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
            aria-labelledby="education-heading"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        Education
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-12">
                        My academic journey and qualifications.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {educationData.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <motion.div
                                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 ${
                                    expandedId === item.id
                                        ? 'shadow-lg ring-1 ring-indigo-100 dark:ring-indigo-900'
                                        : 'hover:shadow-md'
                                }`}
                                whileHover={{ y: -2 }}
                                onHoverStart={() => setHoveredId(item.id)}
                                onHoverEnd={() => setHoveredId(null)}
                            >
                                {/* Main Info - Always Visible */}
                                <div
                                    className="p-6 cursor-pointer select-none"
                                    onClick={() => handleCardClick(item.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleCardClick(item.id);
                                        }
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <motion.span
                                                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {item.duration}
                                                </motion.span>
                                                {item.gpa && (
                                                    <motion.div
                                                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        <FaAward className="text-yellow-500 text-xs" />
                                                        <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                                                            {item.gpa}
                                                        </span>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group">
                                                <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                                                    {item.degree}
                                                </span>
                                            </h3>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <FaMapMarkerAlt className="text-indigo-500" />
                                                <span>{item.institution}</span>
                                            </div>
                                        </div>

                                        <motion.div
                                            animate={{
                                                rotate: expandedId === item.id ? 180 : 0,
                                                scale: hoveredId === item.id ? 1.1 : 1
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="text-indigo-500 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
                                        >
                                            <FaChevronDown />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                <AnimatePresence>
                                    {expandedId === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 space-y-4">
                                                {item.details && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                        className="text-sm text-gray-600 dark:text-gray-400"
                                                    >
                                                        {item.details}
                                                    </motion.p>
                                                )}

                                                {item.skills && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                            Key Skills
                                                        </h4>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {item.skills.map((skill, idx) => (
                                                                <motion.span
                                                                    key={idx}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: 0.1 * idx }}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 select-none"
                                                                >
                                                                    {skill}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {item.achievements && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                            Achievements
                                                        </h4>
                                                        <ul className="space-y-1.5">
                                                            {item.achievements.map((achievement, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 * idx }}
                                                                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                                                >
                                                                    <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                                                                    {achievement}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
