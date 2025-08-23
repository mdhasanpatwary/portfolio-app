'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-primary-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <FiSun className="text-xl" aria-hidden="true" focusable="false" />
            ) : (
                <FiMoon className="text-xl" aria-hidden="true" focusable="false" />
            )}
        </button>
    );
};

export default ThemeToggle;