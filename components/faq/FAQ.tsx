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
    <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title={faqData.title}
          className="text-center"
          icon={<FaQuestionCircle className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        >
          {faqData.subtitle}
        </SectionTitle>
        <div className="grid grid-cols-1 gap-4">
          {faqData.items.map((item, idx) => (
            <details
              key={idx}
              className="group border border-indigo-100 dark:border-indigo-900 rounded-lg p-5 bg-white/80 dark:bg-gray-900/60 shadow-sm">
              <summary className="list-none cursor-pointer flex items-start justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.question}
                </span>
                <span className="ml-3 text-indigo-600 dark:text-indigo-400 group-open:rotate-180 transition-transform">▾</span>
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


