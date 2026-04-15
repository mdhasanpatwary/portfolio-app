import React from "react";
import type { FAQsData, Services, SkillsData } from "@/types/data";

interface FAQSchemaProps {
  homeFaqs: FAQsData;
  services: Services;
  skills: SkillsData;
}

export default function FAQSchema({ homeFaqs, services, skills }: FAQSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...homeFaqs.items.map((i) => ({
        "@type": "Question",
        name: i.question,
        acceptedAnswer: { "@type": "Answer", text: i.answer },
      })),
      {
        "@type": "Question",
        name: "What services do you offer?",
        acceptedAnswer: { "@type": "Answer", text: services.subtitle },
      },
      {
        "@type": "Question",
        name: "What technologies do you specialize in?",
        acceptedAnswer: { "@type": "Answer", text: skills.subtitle },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
