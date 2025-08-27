"use client";

import React, { useEffect, useMemo, useState } from "react";
import CssTipCard from "./CssTipCard";
import Modal from "../global/Modal";
import { CodeBlock } from "../global";
import Pagination from "../global/Pagination";
import { useSearchParams } from "next/navigation";

interface CssTip {
  id: number;
  title: string;
  description: string;
}

interface CssTipsProps {
  tips: CssTip[];
}

// List of common CSS property names for highlighting
const cssProperties = [
  "color", "background", "background-color", "margin", "padding", "border", "width", "height", "display", "position", "top", "left", "right", "bottom", "z-index", "overflow", "font-size", "font-weight", "line-height", "text-align", "justify-content", "align-items", "flex", "grid", "gap", "box-shadow", "border-radius", "transition", "transform", "opacity", "visibility", "content", "cursor", "outline", "object-fit", "object-position", "float", "clear", "min-width", "max-width", "min-height", "max-height", "order", "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis", "align-content", "align-self", "justify-items", "justify-self", "grid-template-columns", "grid-template-rows", "grid-column", "grid-row", "grid-area", "grid-gap", "grid-auto-flow", "grid-auto-rows", "grid-auto-columns", "column-gap", "row-gap", "clip-path", "filter", "backdrop-filter", "animation", "animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction", "animation-fill-mode", "animation-play-state", "transition-property", "transition-duration", "transition-timing-function", "transition-delay", "user-select", "pointer-events", "resize", "scroll-behavior", "scroll-snap-type", "scroll-snap-align", "scroll-margin", "scroll-padding", "will-change", "contain"
];

// Helper to extract code blocks (```lang\ncode\n```) and text
function parseDescription(description: string) {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: Array<{ type: "code" | "text"; content: string; language?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(description)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: description.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", content: match[2] || "", language: match[1] || "css" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < description.length) {
    parts.push({ type: "text", content: description.slice(lastIndex) });
  }
  return parts;
}

// Helper to wrap CSS property names in <code> tags
function highlightCssProperties(text: string) {
  // Build a regex that matches any property as a whole word
  const propRegex = new RegExp(`\\b(${cssProperties.join("|")})\\b`, "gi");
  return text.split(/(\n)/g).map((line, i) =>
    line.match(/\n/)
      ? <br key={"br-" + i} />
      : <React.Fragment key={i}>{line.replace(propRegex, (match) => `<code class=\"bg-yellow-100 text-yellow-900 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700 rounded px-1 text-sm font-mono\">${match}</code>`)}</React.Fragment>
  );
}

const TIPS_PER_PAGE = 6;

const CssTips: React.FC<CssTipsProps> = ({ tips }) => {
  const [selectedTip, setSelectedTip] = useState<CssTip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  // Keep a stable full list reference
  const allTips = useMemo(() => tips, [tips]);

  const totalPages = Math.ceil(tips.length / TIPS_PER_PAGE);
  const currentPage = parseInt(searchParams?.get("page") || "1", 10) || 1;
  const paginatedTips = tips.slice((currentPage - 1) * TIPS_PER_PAGE, currentPage * TIPS_PER_PAGE);

  const handleCardClick = (tip: CssTip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTip(null);
  };



  // Initialize from URL params: tipId
  useEffect(() => {
    if (!searchParams) return;
    const tipIdParam = parseInt(searchParams.get("tipId") || "", 10);
    if (!Number.isNaN(tipIdParam)) {
      const found = allTips.find((t) => t.id === tipIdParam);
      if (found) {
        setSelectedTip(found);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, allTips]);

  return (
    <div className="max-w-7xl mx-auto px-4 my-16 md:my-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {paginatedTips.map((tip) => (
          <CssTipCard key={tip.id} tip={tip} onClick={() => handleCardClick(tip)} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        makeHref={(page) => `/css-tips?page=${page}`}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedTip?.title}>
        {selectedTip && (
          <div className="prose dark:prose-invert max-w-none max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-200 dark:scrollbar-thumb-primary-800">
            {parseDescription(selectedTip.description).map((part, idx) =>
              part.type === "code" ? (
                <div key={idx} className="my-6">
                  <CodeBlock code={part.content} language={part.language} className="rounded-lg" />
                </div>
              ) : (
                <span key={idx} dangerouslySetInnerHTML={{ __html: highlightCssProperties(part.content).map((el) => {
                  if (typeof el === 'string') return el;
                  if (React.isValidElement(el)) {
                    const element = el as React.ReactElement<{ children: string }>;
                    if (typeof element.props.children === 'string') return element.props.children;
                  }
                  return '';
                }).join('') }} />
              )
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CssTips;