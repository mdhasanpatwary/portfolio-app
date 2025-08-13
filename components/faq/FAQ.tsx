import React from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ({ items, title = "Frequently Asked Questions" }: { items: FAQItem[]; title?: string }) {
  if (!items?.length) return null;

  return (
    <section className="w-full py-12 md:py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <summary className="list-none cursor-pointer flex items-start justify-between">
                <span className="text-left font-medium text-gray-900 dark:text-gray-100">
                  {item.question}
                </span>
                <span className="ml-3 text-indigo-600 dark:text-indigo-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700 dark:text-gray-300">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


