import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";
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
  <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg flex flex-col gap-6 justify-center">
    <div className="flex items-center gap-3 group">
      <FaUser className="text-gray-600 dark:text-gray-300 text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
      <span className="text-lg font-semibold text-gray-900 dark:text-white">{contact.name}</span>
    </div>
    <div className="flex items-center gap-3 group">
      <FaEnvelope className="text-gray-600 dark:text-gray-300 text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
      <a href={`mailto:${contact.email}`} className="text-gray-700 dark:text-gray-300 hover:underline transition-colors">{contact.email}</a>
    </div>
    <div className="flex items-center gap-3 group">
      <FaPhone className="text-gray-600 dark:text-gray-300 text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
      <a href={`tel:${contact.phone}`} className="text-gray-700 dark:text-gray-300 hover:underline transition-colors">{contact.phone}</a>
    </div>
    <div className="flex items-center gap-3 group">
      <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300 text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
      <span className="text-gray-700 dark:text-gray-300">{contact.location}</span>
    </div>
    <div className="flex items-center gap-4 mt-4">
      <SocialLinks />
    </div>
  </div>
);

export default ContactInfoCard;