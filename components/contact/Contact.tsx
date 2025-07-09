"use client";

import React from "react";
import SectionTitle from "../global/SectionTitle";
import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactForm";

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
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={contact.title}
          icon={<i className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        >
          {contact.subtitle}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
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
