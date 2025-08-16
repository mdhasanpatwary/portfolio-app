"use client";

import { FaChevronUp } from "react-icons/fa";

export default function ScrollToTopLink() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#top"
      onClick={handleScrollToTop}
      aria-label="Scroll back to top"
      className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline"
    >
      <FaChevronUp className="animate-bounce" /> Back to top
    </a>
  );
}
