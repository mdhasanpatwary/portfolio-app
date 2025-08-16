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
    <div className="flex justify-center items-center gap-2 mt-10 select-none">
      <button
        className={`flex items-center px-2 py-1 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 transition hover:bg-indigo-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 ${
          currentPage === 1 ? "cursor-default" : "cursor-pointer"
        }`}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page">
        <FaChevronLeft />
      </button>
      {getPages().map((item, idx) =>
        item === "ellipsis" ? (
          <span
            key={"ellipsis-" + idx}
            className="px-2 text-gray-400 dark:text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`relative text-xs px-2 py-1 rounded-full transition font-semibold overflow-hidden ${
              currentPage === item
                ? "bg-indigo-600 text-white shadow-lg cursor-default"
                : "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-gray-700 cursor-pointer"
            }`}
            type="button"
            style={{ minWidth: 24 }}
            onClick={() => onPageChange(item as number)}
            aria-current={currentPage === item ? "page" : undefined}
            disabled={currentPage === item}>
            <span className="relative z-10">{item}</span>
            {currentPage === item && (
              <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-white dark:bg-indigo-400 rounded-full transform -translate-x-1/2 animate-pulse" />
            )}
          </button>
        )
      )}
      <button
        className={`flex items-center px-2 py-1 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 transition hover:bg-indigo-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 ${
          currentPage === totalPages ? "cursor-default" : "cursor-pointer"
        }`}
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
