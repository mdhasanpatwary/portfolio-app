"use client";

import React from "react";
import SectionTitle from "../global/SectionTitle";
import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactForm";
import { FaPaperPlane } from "react-icons/fa";

interface ContactProps {
  contact: {
    name: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    availability: string;
    formLabels: {
      name: string;
      email: string;
      subject: string;
      message: string;
      required: string;
      sendMessage: string;
      reset: string;
      sending: string;
    };
    placeholders: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
    };
    messages: {
      success: string;
      error: string;
    };
    socialLinks: unknown[];
  };
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title={contact.title}
          icon={<FaPaperPlane className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        >
          {contact.subtitle}
        </SectionTitle>

        {/* Contact content grid - Form first for better CTA hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-7 lg:order-2">
            <ContactForm contact={contact} />
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <ContactInfoCard contact={contact} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
