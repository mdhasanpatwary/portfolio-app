import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import SocialLinks from "../global/SocialLinks";

interface ContactInfoCardProps {
  contact: {
    name: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    availability: string;
    socialLinks: unknown[];
  };
}

const ContactInfoCard = ({ contact }: ContactInfoCardProps) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 h-full flex flex-col shadow-sm border border-gray-200 dark:border-gray-700">
    {/* Main content */}
    <div className="flex-1">
      {/* Introduction */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Let&apos;s Connect
        </h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {contact.summary}
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-6 mb-10">
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          Contact Info
        </h5>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600 dark:text-blue-400 text-lg" />
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="text-green-600 dark:text-green-400 text-lg" />
            <div className="flex items-center gap-3">
              <a
                href={`tel:${contact.phone}`}
                className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {contact.phone}
              </a>
              <a
                href={`https://wa.me/${contact.phone.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-600 dark:text-gray-400 text-lg" />
            <span className="text-gray-800 dark:text-gray-200">
              {contact.location}
            </span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
          Availability
        </h5>
        <p className="text-gray-800 dark:text-gray-200 text-sm">
          {contact.availability}
        </p>
      </div>
    </div>

    {/* Social Links - Fixed at bottom */}
    <div className="mt-auto pt-6">
      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
        Connect
      </h5>
      <SocialLinks />
    </div>
  </div>
);

export default ContactInfoCard;