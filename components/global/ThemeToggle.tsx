// components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Initialize theme from localStorage
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-indigo-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
        >
            {isDark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
    );
};

export default ThemeToggle;