"use client";
import React, { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";

interface CodeBlockProps {
  code: string;
  language?: string | undefined;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "css",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={`relative group my-4 ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 rounded bg-gray-800/80 hover:bg-gray-700 text-white transition flex items-center gap-1 opacity-80 group-hover:opacity-100"
        aria-label="Copy code"
        tabIndex={0}>
        {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
        <span className="sr-only">Copy</span>
      </button>
      <pre
        className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed font-mono"
        data-language={language}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
