"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "@/components/global/ThemeToggle";
import { Transition } from "@headlessui/react";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: "Home", href: "#banner" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Service", href: "#services" },
    { label: "Contact", href: "#contact" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size < 1200px (equivalent to Tailwind's xl breakpoint)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1200);
        };
        handleResize(); // check on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Smooth scroll
    const handleNavClick = (href: string) => {
        const section = document.querySelector(href);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false); // close mobile menu
    };

    return (
        <header className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                    &lt;MHP/&gt;
                </Link>

                {/* Desktop */}
                {!isMobile && (
                    <nav className="flex items-center space-x-6">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => handleNavClick(item.href)}
                                className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                            >
                                {item.label}
                            </button>
                        ))}
                        <ThemeToggle />
                    </nav>
                )}

                {/* Mobile */}
                {isMobile && (
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-300"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Menu Dropdown */}
            <Transition
                show={isMobile && isOpen}
                enter="transition duration-200 ease-out"
                enterFrom="transform -translate-y-4 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-4 opacity-0"
            >
                <nav className="xl:hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 pb-4">
                    <ul className="flex flex-col space-y-3">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <button
                                    onClick={() => handleNavClick(item.href)}
                                    className="block w-full text-left py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-800 transition"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Transition>
        </header>
    );
};

export default Header;
