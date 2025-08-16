import { FC } from "react";
import SocialLinks from "../global/SocialLinks";
import ScrollToTopLink from "./ScrollToTopLink";

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
    <footer className="bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 pt-10 pb-6 px-6 text-center">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo / Name */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {description}
        </p>

        {/* Social Icons */}
        <nav aria-label="Social media links" className="flex justify-center">
          <SocialLinks />
        </nav>

        <div>
          <ScrollToTopLink />
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-600">
          {copyrightText
            ? copyrightText
            : `© ${new Date().getFullYear()} ${name}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
