import Link from "next/link";
import ThemeToggle from "@/components/global/ThemeToggle";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Hobby', href: '#hobby' },
    { label: 'Contact', href: '#contact' },
];


const Header = () => {
    return (
        <header className="bg-white dark:bg-black shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">MyPortfolio</h1>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;