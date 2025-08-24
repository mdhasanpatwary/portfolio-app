import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
}

export default function Pagination({ currentPage, totalPages, makeHref }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center items-center gap-2 mt-10 select-none">
      <Link
        aria-label="Previous page"
        href={makeHref(Math.max(1, currentPage - 1))}
        className={`flex items-center px-2 py-1 rounded-full bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-300 transition hover:bg-primary-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
      >
        ‹
      </Link>
      {pages.map((p, idx, arr) => {
        // compact with ellipsis like existing Pagination
        const shouldShow =
          totalPages <= 5 ||
          p === 1 ||
          p === totalPages ||
          (currentPage <= 3 && p <= 4) ||
          (currentPage >= totalPages - 2 && p >= totalPages - 3) ||
          Math.abs(p - currentPage) <= 1;
        if (!shouldShow) return idx > 0 && arr[idx - 1] !== -1 ? <span key={`e${idx}`} className="px-2 text-gray-600 dark:text-gray-300">...</span> : null;
        return (
          <Link
            key={p}
            href={makeHref(p)}
            aria-current={currentPage === p ? "page" : undefined}
            className={`relative text-xs px-2 py-1 rounded-full transition font-semibold overflow-hidden ${
              currentPage === p
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-gray-700"
            }`}
          >
            <span className="relative z-10">{p}</span>
          </Link>
        );
      })}
      <Link
        aria-label="Next page"
        href={makeHref(Math.min(totalPages, currentPage + 1))}
        className={`flex items-center px-2 py-1 rounded-full bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-300 transition hover:bg-primary-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
      >
        ›
      </Link>
    </div>
  );
}
