"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { projects as projectsData } from "@/data";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
  demo?: string;
};

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<Element | null>(null);
  const router = useRouter();

  const projects: Project[] = useMemo(
    () => (projectsData.items as unknown as Project[]) || [],
    []
  );


  const q = query.toLowerCase();

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.length);
    const after = text.slice(idx + query.length);
    return (
      <>
        {before}
        <mark className="bg-yellow-200 text-gray-900 dark:bg-yellow-700 dark:text-white rounded px-0.5">{match}</mark>
        {after}
      </>
    );
  };

  const projectHits = useMemo(
    () =>
      q
        ? projects.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q)
          )
        : [],
    [projects, q]
  );


  // Derive active option id for ARIA combobox after results are computed
  const resultsCount = projectHits.length;
  const activeOptionId = resultsCount > 0 ? `search-opt-${activeIndex}` : undefined;

  useEffect(() => {
    lastActiveRef.current = document.activeElement;
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, projectHits.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const items: Array<{ type: "project"; href?: string | undefined; title: string }> = [
          ...projectHits.map((p) => ({ type: "project" as const, href: p.link || p.demo, title: p.title })),
        ];
        const item = items[activeIndex];
        if (!item) return;
        if (item.type === "project" && item.href) {
          window.open(item.href, "_blank", "noopener,noreferrer");
          return;
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    // Basic focus trap within the container
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = containerRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const rootNode = containerRef.current;
    rootNode?.addEventListener("keydown", trap);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      rootNode?.removeEventListener("keydown", trap);
      document.body.style.overflow = "unset";
      const last = lastActiveRef.current as HTMLElement | null;
      last?.focus?.();
    };
  }, [onClose, projectHits, activeIndex, router]);

  // Reset selection when query or results change
  useEffect(() => {
    setActiveIndex(0);
  }, [q, projectHits.length]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      onClick={onClose}
    >
      <div
        className="max-w-5xl mx-auto px-4 py-6 md:py-12 h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-title" className="sr-only">Search</h2>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects... (Press Esc to close)"
              className="w-full px-10 py-4 sm:py-5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
              aria-label="Search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={Boolean(query)}
              aria-controls="search-results"
              aria-activedescendant={activeOptionId}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex gap-1 text-xs text-gray-600 dark:text-gray-300">
              <kbd className="px-2 py-0.5 rounded border">⌘</kbd>
              <kbd className="px-2 py-0.5 rounded border">K</kbd>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          >
            <FaTimes />
          </button>
        </div>

        {query ? (
          <div
            id="search-results"
            role="listbox"
            aria-label="Search results"
            className="mt-8 overflow-auto"
          >
            <div>
              <h2 className="text-lg font-semibold mb-3">Projects</h2>
              {projectHits.length ? (
                <ul className="space-y-1">
                  {projectHits.map((p, idx) => {
                    const globalIndex = idx; // projects first
                    const isActive = activeIndex === globalIndex;
                    return (
                      <li key={p.id} id={`search-opt-${globalIndex}`} role="option" aria-selected={isActive}>
                        <a
                          className={`block rounded px-2 py-2 transition ${isActive ? "bg-primary-50 dark:bg-primary-900/40" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                          href={p.link || p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={-1}
                        >
                          <div className="text-primary-600 dark:text-primary-400 font-medium">{highlightMatch(p.title)}</div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{p.description}</p>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No matching projects.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10 text-gray-600 dark:text-gray-300">
            Type to search projects. Try shortcuts
            <span className="ml-2 hidden sm:inline-flex gap-1 align-middle text-xs">
              <kbd className="px-2 py-0.5 rounded border">⌘</kbd>
              <kbd className="px-2 py-0.5 rounded border">K</kbd>
            </span>
            <span className="ml-2 text-xs">or press <kbd className="px-2 py-0.5 rounded border">/</kbd></span>
          </div>
        )}
      </div>
    </div>
  );
}


