import React from "react";
import { SectionTitle } from "@/components/global";
import { FaQuestionCircle } from "react-icons/fa";
import type { FAQsData } from "@/types/data";

export type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ({ faqData }: { faqData: FAQsData }) {
  if (!faqData?.items?.length) return null;

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-white dark:bg-gray-900 content-visibility-auto">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title={faqData.title}
          className="text-center"
          icon={<FaQuestionCircle className="text-primary-600 dark:text-primary-400 text-2xl" />}
        >
          {faqData.subtitle}
        </SectionTitle>
        <div className="grid grid-cols-1 gap-4">
          {faqData.items.map((item, idx) => (
            <details
              key={idx}
              className="group border border-primary-100 dark:border-primary-900 rounded-lg p-5 bg-white/80 dark:bg-gray-900/60 shadow-sm">
              <summary className="list-none cursor-pointer flex items-start justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.question}
                </span>
                <span className="ml-3 text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


