"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/global/ThemeToggle";
import { Transition } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  navItems: NavItem[];
};

const Header = ({ navItems }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect screen size < 992px (mobile breakpoint at 991px and below)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsOpen(false); // close mobile menu
    }
  };

  return (
    <header className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 dark:text-white">
          &lt;MHP/&gt;
        </Link>

        {/* Desktop */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer ${
                    pathname === item.href ? "text-indigo-600 dark:text-indigo-400 font-semibold underline" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer"
                >
                  {item.label}
                </button>
              )
            ))}
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition border border-indigo-500 rounded px-3 py-1 ml-2 text-sm font-medium"
            >
              Hire Me!
            </Link>
            <ThemeToggle />
          </nav>
        )}

        {/* Mobile */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition border border-indigo-500 rounded px-3 py-1 text-sm font-medium"
            >
              Hire Me!
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
              aria-label="Toggle menu">
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
        leaveTo="transform -translate-y-4 opacity-0">
        <nav className="xl:hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 pb-4">
          <ul className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href.startsWith("/") ? (
                  <Link
                    href={item.href}
                    className={`block w-full text-left py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-800 transition cursor-pointer ${
                      pathname === item.href ? "text-indigo-600 dark:text-indigo-400 font-semibold underline" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-800 transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Transition>
    </header>
  );
};

export default Header;
