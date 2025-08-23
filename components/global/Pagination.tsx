import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Helper to generate page numbers with ellipsis
  const getPages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((page) => {
        if (totalPages <= 5) return true;
        if (page === 1 || page === totalPages) return true;
        if (currentPage <= 3 && page <= 4) return true;
        if (currentPage >= totalPages - 2 && page >= totalPages - 3)
          return true;
        if (Math.abs(page - currentPage) <= 1) return true;
        return false;
      })
      .reduce<(number | string)[]>((acc, page, idx, arr) => {
        if (idx > 0 && page !== (arr[idx - 1] as number) + 1) {
          acc.push("ellipsis");
        }
        acc.push(page);
        return acc;
      }, []);
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-10 select-none">
      <ul className="flex items-center gap-3">
        <button
          className={`flex items-center justify-center rounded-full bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-300 transition hover:bg-primary-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 ${
            currentPage === 1 ? "cursor-default" : "cursor-pointer"
          }`}
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page">
          <span className="w-11 h-11 flex items-center justify-center">
            <FaChevronLeft aria-hidden="true" focusable="false" />
          </span>
        </button>
        {getPages().map((item, idx) =>
          item === "ellipsis" ? (
            <li key={"ellipsis-" + idx}>
              <span className="px-2 text-gray-600 dark:text-gray-300" aria-hidden="true" role="presentation">…</span>
            </li>
          ) : (
            <li key={String(item)}>
              <button
                className={`relative text-xs rounded-full transition font-semibold overflow-hidden ${
                  currentPage === item
                    ? "bg-primary-600 text-white shadow-lg cursor-default"
                    : "bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-gray-700 cursor-pointer"
                }`}
                type="button"
                style={{ minWidth: 44, minHeight: 44, paddingInline: 12 }}
                onClick={() => onPageChange(item as number)}
                aria-current={currentPage === item ? "page" : undefined}
                disabled={currentPage === item}>
                <span className="relative z-10">{item}</span>
                {currentPage === item && (
                  <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-white dark:bg-primary-400 rounded-full transform -translate-x-1/2 animate-pulse" />
                )}
              </button>
            </li>
          )
        )}
        <button
          className={`flex items-center justify-center rounded-full bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-300 transition hover:bg-primary-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 ${
            currentPage === totalPages ? "cursor-default" : "cursor-pointer"
          }`}
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page">
          <span className="w-11 h-11 flex items-center justify-center">
            <FaChevronRight aria-hidden="true" focusable="false" />
          </span>
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
