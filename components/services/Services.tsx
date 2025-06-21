import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import SectionTitle from "../global/SectionTitle";
import ServiceCard from "./ServiceCard";

type Service = {
  title: string;
  description: string;
  tools: string[];
  icon: string;
};

type ServicesProps = {
  services: {
    title: string;
    subtitle: string;
    items: Service[];
  };
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section
      id="services"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle
          title={services.title}
          icon={
            <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />
          }>
          {services.subtitle}
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((service, idx) => (
            <ServiceCard key={idx} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
