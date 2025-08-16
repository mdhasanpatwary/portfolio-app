import React from "react";
import { FiMail, FiDownload } from "react-icons/fi";
import Link from "next/link";

const BannerButtons: React.FC = () => (
  <div className="flex flex-wrap items-center gap-4 mb-6">
    <Link
      href="/contact"
      className="bg-primary-600 text-white px-6 py-2 rounded font-medium hover:bg-primary-700 dark:hover:bg-primary-500 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
      <FiMail className="inline" />
      Contact Me
    </Link>
    <a
      href="/resume.pdf"
      className="border border-primary-600 text-primary-600 px-6 py-2 rounded font-medium hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-800 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
      <FiDownload className="inline" />
      View Resume
    </a>
  </div>
);

export default BannerButtons;
