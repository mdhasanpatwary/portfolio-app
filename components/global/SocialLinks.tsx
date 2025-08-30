import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaFacebook,
  FaYoutube,
  FaTwitter as FaXTwitter,
  FaInstagram,
} from "react-icons/fa";
import { SiDevdotto, SiDailydotdev, SiCodepen, SiUpwork, SiThreads } from "react-icons/si";
import { contact } from "@/data";

export type SocialLink = { name: string; url: string; icon: string };

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  SiDevdotto,
  SiDailydotdev,
  SiCodepen,
  SiUpwork,
  SiThreads,
};

// Brand colors for each social platform
const brandColors = {
  FaGithub: "hover:text-gray-900 dark:hover:text-gray-100",
  FaLinkedin: "hover:text-primary-700 dark:hover:text-primary-400",
  FaStackOverflow: "hover:text-orange-600 dark:hover:text-orange-400",
  FaFacebook: "hover:text-primary-700 dark:hover:text-primary-400",
  FaYoutube: "hover:text-red-600 dark:hover:text-red-500",
  FaXTwitter: "hover:text-blue-500 dark:hover:text-blue-400",
  FaInstagram: "hover:text-pink-600 dark:hover:text-pink-500",
  SiDevdotto: "hover:text-black dark:hover:text-white",
  SiDailydotdev: "hover:text-primary-700 dark:hover:text-primary-400",
  SiCodepen: "hover:text-black dark:hover:text-white",
  SiUpwork: "hover:text-green-600 dark:hover:text-green-400",
  SiThreads: "hover:text-black dark:hover:text-white",
};

const links = contact?.socialLinks || [];

const SocialLinks: React.FC = () => (
  <div className="flex space-x-5 text-gray-600 dark:text-gray-300 text-xl">
    {links.slice(0, 8).map((link) => {
      const Icon = iconMap[link.icon as keyof typeof iconMap];
      const brandColor = brandColors[link.icon as keyof typeof brandColors] || "hover:text-primary-600 dark:hover:text-primary-400";

      return (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-transform transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary-500 ${brandColor}`}
          title={link.name}
          aria-label={link.name}>
          {Icon ? <Icon aria-hidden="true" focusable="false" /> : <span>{link.name[0]}</span>}
        </a>
      );
    })}
  </div>
);

export default SocialLinks;