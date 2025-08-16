'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-primary-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
        >
            {isDark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
    );
};

export default ThemeToggle;