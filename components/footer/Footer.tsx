"use client";

import { FC } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaChevronUp,
} from "react-icons/fa";
import { iconMap } from "@/components/global/IconMap";

type SocialLink = { name: string; url: string; icon: string };
type FooterProps = {
  name: string;
  description: string;
  socialLinks: SocialLink[];
};

const Footer: FC<FooterProps> = ({ name, description, socialLinks }) => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-white via-indigo-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 pt-10 pb-6 px-6 text-center">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Logo / Name */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {description}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 text-xl text-gray-600 dark:text-gray-400">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                className="hover:text-indigo-500 transition">
                {Icon ? <Icon /> : null}
              </a>
            );
          })}
        </div>

        <div>
          <a
            href="#top"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline">
            <FaChevronUp className="animate-bounce" /> Back to top
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-600">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
