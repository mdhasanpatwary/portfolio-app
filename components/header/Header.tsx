"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/global/ThemeToggle";
import { FaBars, FaTimes, FaSearch, FaEnvelope } from "react-icons/fa";
import { usePathname } from "next/navigation";
import SearchOverlay from "@/components/global/SearchOverlay";
import { cn } from "@/utils/cn";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  navItems: NavItem[];
};

const Header = ({ navItems }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for glass shadow upgrade
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global shortcut: Cmd/Ctrl+K or '/'
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K');
      const isSlash = !e.ctrlKey && !e.metaKey && e.key === '/';
      if (isCmdK || isSlash) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
    <header
      className={cn(
        // Base glassmorphism
        "sticky top-0 z-50 w-full",
        "backdrop-blur-md",
        "bg-white/80 dark:bg-gray-900/80",
        "border-b border-white/20 dark:border-gray-700/50",
        "transition-all duration-300",
        // Stronger effect on scroll
        scrolled
          ? "shadow-lg backdrop-blur-xl bg-white/90 dark:bg-gray-900/90"
          : "shadow-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="font-extrabold text-xl tracking-tight select-none"
        >
          <span className="text-gray-800 dark:text-white">&lt;</span>
          <span className="text-primary-600 dark:text-primary-400">MHP</span>
          <span className="text-gray-800 dark:text-white">/&gt;</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile (< 992px) */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary">
          {navItems.map((item) => (
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer ${
                  pathname === item.href ? "text-primary-600 dark:text-primary-400 font-semibold underline" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
              >
                {item.label}
              </button>
            )
          ))}
          <Link
            href="/contact"
            className="
              ml-2 inline-flex items-center
              px-6 py-2 rounded-full
              bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-bold
              shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105
              transition-all duration-300
              focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
            "
          >
            Hire Me <span className="ml-1">🚀</span>
          </Link>
          {/* Search button styled like ThemeToggle and placed left of it */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-primary-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
            aria-label="Open search"
          >
            <FaSearch className="text-base" />
          </button>
          <ThemeToggle />
        </nav>

        {/* Mobile Controls - Visible on mobile (< 992px) */}
        <div className="flex lg:hidden items-center gap-3">
          <Link
            href="/contact"
            aria-label="Contact"
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-primary-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          >
            <FaEnvelope className="text-base" />
          </Link>
          {/* Search button styled like ThemeToggle and placed left of it */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-primary-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
            aria-label="Open search"
          >
            <FaSearch className="text-base" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-primary-900 text-black dark:text-white transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="primary-mobile-menu">
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only visible on mobile */}
      <div
        className={`lg:hidden absolute left-0 right-0 top-full w-full transform transition-[opacity,transform] duration-200 ease-out ${
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
        hidden={!isOpen}
        id="primary-mobile-menu"
      >
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 pb-4" aria-label="Primary">
          <ul className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href.startsWith("/") ? (
                  <Link
                    href={item.href}
                    className={`block w-full text-left py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                      pathname === item.href ? "text-primary-600 dark:text-primary-400 font-semibold underline" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
};

export default Header;
