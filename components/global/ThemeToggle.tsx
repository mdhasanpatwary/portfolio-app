// components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

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
            className="px-4 py-2 cursor-pointer rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};

export default ThemeToggle;