import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaFacebook,
} from "react-icons/fa";
import { SiDevdotto, SiDailydotdev, SiCodepen } from "react-icons/si";
import data from "@/data/data.json";

export type SocialLink = { name: string; url: string; icon: string };
type ContactData = { socialLinks: SocialLink[] };

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaFacebook,
  SiDevdotto,
  SiDailydotdev,
  SiCodepen,
};

const contact = (data as { contact: ContactData }).contact;
const links = contact?.socialLinks || [];

const SocialLinks: React.FC = () => (
  <div className="flex space-x-5 text-gray-600 dark:text-gray-300 text-xl">
    {links.map((link) => {
      const Icon = iconMap[link.icon as keyof typeof iconMap];
      return (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-indigo-500"
          title={link.name}
          aria-label={link.name}>
          {Icon ? <Icon /> : <span>{link.name[0]}</span>}
        </a>
      );
    })}
  </div>
);

export default SocialLinks;