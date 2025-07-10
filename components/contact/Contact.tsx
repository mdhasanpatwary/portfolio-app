"use client";

import React from "react";
import Image from "next/image";
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
    socialLinks: unknown[];
  };
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Decorative SVG background */}
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] opacity-20 z-0 pointer-events-none select-none hidden md:block">
        <Image src="/globe.svg" alt="Decorative globe" fill style={{objectFit:'contain'}} />
      </div>
      <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] opacity-10 z-0 pointer-events-none select-none hidden md:block">
        <Image src="/window.svg" alt="Decorative window" fill style={{objectFit:'contain'}} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title={contact.title}
          icon={<FaPaperPlane className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        >
          {contact.subtitle}
        </SectionTitle>
        {/* Friendly intro message and profile image */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-gray-700 shadow-lg">
            <Image
              src="/profile.png"
              alt={`Profile picture of ${contact.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 160px"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Let’s Connect!</h3>
            <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I’m always open to meaningful conversations—whether you’re looking to collaborate, have a project in mind, or just want to say hi. Feel free to reach out anytime!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
          <div className="md:col-span-5 mb-8 md:mb-0 flex items-stretch">
            {/* Enhanced card with glassmorphism effect */}
            <div className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-indigo-100 dark:border-gray-800 rounded-3xl shadow-2xl p-0 flex flex-col justify-between">
              <ContactInfoCard contact={contact} />
            </div>
          </div>
          <div className="md:col-span-7 flex items-stretch">
            {/* Enhanced form card */}
            <div className="w-full bg-white/80 dark:bg-gray-900/80 border border-indigo-100 dark:border-gray-800 rounded-3xl shadow-2xl p-0 flex flex-col justify-between">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
