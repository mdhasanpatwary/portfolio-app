import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
}

export default function Pagination({ currentPage, totalPages, makeHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    // Always include first page
    pages.push(1);

    if (totalPages <= 6) {
      // Show all pages if totalPages <= 6
      for (let i = 2; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Determine when to show ellipses
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    // Add left ellipsis if needed
    if (left > 2) pages.push("ellipsis");

    // Add middle pages
    for (let i = left; i <= right; i++) pages.push(i);

    // Add right ellipsis if needed
    if (right < totalPages - 1) pages.push("ellipsis");

    // Always include last page
    pages.push(totalPages);

    return pages;
  };

  const pageItems = generatePageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-10 select-none">
      {/* Previous Button */}
      <Link
        aria-label="Previous page"
        href={makeHref(Math.max(1, currentPage - 1))}
        className={`flex items-center justify-center text-2xl w-11 h-11 rounded-full bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-300 transition hover:bg-primary-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
          currentPage === 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        ‹
      </Link>

      {/* Page Numbers */}
      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex items-center justify-center w-5 sm:w-7 h-11 text-gray-600 dark:text-gray-300"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={makeHref(item)}
            aria-current={currentPage === item ? "page" : undefined}
            className={`flex items-center justify-center text-sm w-11 h-11 rounded-full transition font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 ${
              currentPage === item
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-gray-700"
            }`}
          >
            {item}
          </Link>
        )
      )}

      {/* Next Button */}
      <Link
        aria-label="Next page"
        href={makeHref(Math.min(totalPages, currentPage + 1))}
        className={`flex items-center justify-center text-2xl w-11 h-11 rounded-full bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-300 transition hover:bg-primary-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        ›
      </Link>
    </div>
  );
}
