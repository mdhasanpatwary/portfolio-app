import { FC } from "react";
import Link from "next/link";
import SocialLinks from "../global/SocialLinks";
import ScrollToTopLink from "./ScrollToTopLink";
import { header } from "@/data";

type FooterProps = {
  name: string;
  description: string;
};

const Footer: FC<FooterProps & { copyrightText?: string }> = ({
  name,
  description,
  copyrightText,
}) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand & Desc */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm">
            {description}
          </p>
          <nav aria-label="Social media links" className="pt-2 flex justify-start">
            <SocialLinks />
          </nav>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {header.navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Let&apos;s build something great</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to bring your ideas to life? Let&apos;s talk about your next project.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
          >
            Contact me <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
          {copyrightText
            ? copyrightText
            : `© ${new Date().getFullYear()} ${name}. All rights reserved.`}
        </p>
        <div className="flex justify-center md:justify-end">
          <ScrollToTopLink />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
