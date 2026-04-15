import React from "react";
import { FaLightbulb } from "react-icons/fa";
import SectionTitle from "../global/SectionTitle";
import ServiceCard from "./ServiceCard";
import type { Services as ServicesType } from "../../types/data";
import { StaggerContainer, StaggerItem } from "../global/AnimateIn";

type ServicesProps = {
  services: ServicesType;
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section
      id="services"
      className="w-full py-16 md:py-24 px-6 bg-gray-50 dark:bg-gray-950 content-visibility-auto">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={services.title}
          icon={
            <FaLightbulb className="text-primary-600 dark:text-primary-400 text-2xl" />
          }>
          {services.subtitle}
        </SectionTitle>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.1}
          delayChildren={0.05}
        >
          {services.items.map((service, idx) => (
            <StaggerItem key={idx} className="h-full">
              <ServiceCard service={service} idx={idx} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
