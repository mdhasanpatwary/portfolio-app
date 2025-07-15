"use client";

import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  showCloseButton = true,
  className = "",
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full mx-4",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}>
      <div
        className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50 transform animate-in zoom-in-95 duration-300 ${sizeClasses[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="relative px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 via-white/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm rounded-t-3xl">
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <FaTimes size={18} />
              </button>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent pr-12 leading-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-8 text-gray-900 dark:text-gray-100 bg-white/95 dark:bg-gray-900/95 overflow-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
