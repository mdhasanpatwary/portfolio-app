import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumb: BreadcrumbItem[];
  className?: string;
  titleClassName?: string;
  icon?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  breadcrumb,
  className = "",
  titleClassName = "",
}) => (
  <div className="bg-primary-50 dark:bg-gray-800 w-full">
    <div
      className={`max-w-7xl mx-auto py-8 md:py-12 px-4 text-center ${className}`}>
      {/* Centered Breadcrumb */}
      <nav className="mb-2 flex justify-center" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
          {breadcrumb.map((item, idx) => (
            <li key={idx} className="flex items-center">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:underline text-gray-500 dark:text-gray-400">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700 dark:text-gray-200 font-semibold">
                  {item.label}
                </span>
              )}
              {idx < breadcrumb.length - 1 && (
                <FaChevronRight className="mx-1 text-xs" />
              )}
            </li>
          ))}
        </ol>
      </nav>
      {/* Centered Title */}
      <h1
        className={`${
          titleClassName || "text-3xl md:text-4xl"
        } font-bold text-gray-900 dark:text-white mb-1`}>
        {title}
      </h1>
      {subtitle && (
        <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mt-0 mx-auto">
          {subtitle}
        </div>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumb.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.label,
              item: b.href ? `https://patwary.vercel.app${b.href}` : undefined,
            })),
          }),
        }}
      />
    </div>
  </div>
);

export default PageTitle;
