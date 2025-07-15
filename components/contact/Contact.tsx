import React from "react";
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
    <div className="max-w-6xl mx-auto px-0 sm:px-4 mb-16 md:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        <div className="lg:col-span-7 lg:order-2">
          <ContactForm contact={contact} />
        </div>
        <div className="lg:col-span-5 lg:order-1">
          <ContactInfoCard contact={contact} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
