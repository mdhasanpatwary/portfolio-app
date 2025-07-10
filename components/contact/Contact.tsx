"use client";

import React from "react";
import SectionTitle from "../global/SectionTitle";
import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactForm";
import { FaEnvelopeOpenText } from "react-icons/fa";

interface ContactProps {
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

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section
      id="contact"
      className="w-full py-20 md:py-32 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title={contact.title}
          icon={<FaEnvelopeOpenText className="text-indigo-600 dark:text-indigo-400 text-4xl md:text-5xl" />}
        >
          {contact.subtitle}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <ContactInfoCard contact={contact} />
          </div>
          <div className="md:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
