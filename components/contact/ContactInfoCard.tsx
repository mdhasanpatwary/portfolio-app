import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";
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
    socialLinks: unknown[];
  };
}

const ContactInfoCard = ({ contact }: ContactInfoCardProps) => (
  <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-10 shadow-xl flex flex-col h-full min-h-[500px] justify-between">
    {/* Contact Info */}
    <div className="flex flex-col gap-5 pb-7">
      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wide">Contact Info</div>

      <div className="flex items-center gap-3 group">
        <FaEnvelope className="text-gray-600 dark:text-gray-300" />
        <a href={`mailto:${contact.email}`} className="text-gray-700 dark:text-gray-300 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded transition-colors">{contact.email}</a>
      </div>
      <div className="flex items-center gap-3 group">
        <FaPhone className="text-gray-600 dark:text-gray-300" />
        <div className="flex items-center gap-2">
          <a href={`tel:${contact.phone}`} className="text-gray-700 dark:text-gray-300 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded transition-colors" title="Call">
            {contact.phone}
          </a>
          <a href={`https://wa.me/${contact.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded transition-colors" title="WhatsApp">
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3 group">
        <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300" />
        <span className="text-gray-700 dark:text-gray-300">{contact.location}</span>
      </div>
      {/* Summary/Description */}
      {contact.summary && (
        <div className="mt-4">
          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wide">Let’s Connect</div>
          <div className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {contact.summary}
          </div>
        </div>
      )}
    </div>
    {/* Social Links */}
    <div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold uppercase tracking-wider">Connect with me</div>
      <div className="flex items-center gap-5">
        <SocialLinks />
      </div>
    </div>
  </div>
);

export default ContactInfoCard;