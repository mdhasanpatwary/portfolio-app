"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { projects as projectsData, cssTips as cssTipsData } from "@/data";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
  demo?: string;
};

type Tip = {
  id?: number | undefined;
  title?: string | undefined;
  description?: string | undefined;
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
  // cssTipsData is an array in data/css-tips.json, not an object with items

  const tips: Tip[] = useMemo(() => {
    if (!Array.isArray(cssTipsData)) return [];
    return (cssTipsData as Array<{ id?: number; title?: string; description?: string }>).map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
    }));
  }, []);

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

  const tipHits = useMemo(
    () =>
      q
        ? tips.filter(
            (t) =>
              (t.title || "").toLowerCase().includes(q) ||
              (t.description || "").toLowerCase().includes(q)
          )
        : [],
    [tips, q]
  );

  // Derive active option id for ARIA combobox after results are computed
  const resultsCount = projectHits.length + tipHits.length;
  const activeOptionId = resultsCount > 0 ? `search-opt-${activeIndex}` : undefined;

  useEffect(() => {
    lastActiveRef.current = document.activeElement;
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, projectHits.length + tipHits.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const items: Array<
          | { type: "project"; href?: string | undefined; title: string }
          | { type: "tip"; tip: Tip }
        > = [
          ...projectHits.map((p) => ({ type: "project" as const, href: p.link || p.demo, title: p.title })),
          ...tipHits.map((t) => ({ type: "tip" as const, tip: t })),
        ];
        const item = items[activeIndex];
        if (!item) return;
        if (item.type === "project" && item.href) {
          window.open(item.href, "_blank", "noopener,noreferrer");
          return;
        }
        if (item.type === "tip" && item.tip) {
          const all = tips;
          const idx = all.findIndex((x) => x.title === item.tip.title);
          const page = idx >= 0 ? Math.floor(idx / 6) + 1 : 1; // 6 per page
          const tipId = item.tip.id ?? undefined;
          onClose();
          router.push(`/css-tips?page=${page}${tipId ? `&tipId=${tipId}` : ""}`);
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
  }, [onClose, projectHits, tipHits, activeIndex, router, tips]);

  // Reset selection when query or results change
  useEffect(() => {
    setActiveIndex(0);
  }, [q, projectHits.length, tipHits.length]);

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
              placeholder="Search projects and CSS tips... (Press Esc to close)"
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
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 overflow-auto"
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
            <div>
              <h2 className="text-lg font-semibold mb-3">CSS Tips</h2>
              {tipHits.length ? (
                <ul className="space-y-1">
                  {tipHits.map((t, i) => {
                    const globalIndex = projectHits.length + i;
                    const isActive = activeIndex === globalIndex;
                    return (
                      <li key={i} id={`search-opt-${globalIndex}`} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          onClick={() => {
                            const all = tips;
                            const idx = all.findIndex((x) => x.title === t.title);
                            const page = idx >= 0 ? Math.floor(idx / 6) + 1 : 1; // 6 per page
                            const tipId = t.id ?? undefined;
                            onClose();
                            router.push(`/css-tips?page=${page}${tipId ? `&tipId=${tipId}` : ""}`);
                          }}
                          className={`w-full text-left block rounded px-2 py-2 ${isActive ? "bg-primary-50 dark:bg-primary-900/40" : "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"}`}
                          tabIndex={-1}
                        >
                          <div className="text-gray-800 dark:text-gray-200 font-medium">{highlightMatch(t.title || "")}</div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{highlightMatch(t.description || "")}</p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No matching CSS tips.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10 text-gray-600 dark:text-gray-300">
            Type to search projects and tips. Try shortcuts
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


