"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBriefcase,
  FaChevronDown,
} from "react-icons/fa";
import { ExperienceItem } from "@/types/data";
import { getIcon, getBrandColor } from "@/utils/icons";
import { Card } from "@/components/global";

/** How many bullets to show before "Show more" */
const MAX_VISIBLE = 3;

interface Props {
  experience: ExperienceItem;
  index: number;
  isLast: boolean;
}

const ExperienceTimelineItem: React.FC<Props> = ({
  experience,
  index,
  isLast,
}) => {
  const [expanded, setExpanded] = useState(false);

  const visibleHighlights = expanded
    ? experience.highlights
    : experience.highlights.slice(0, MAX_VISIBLE);

  const hasMore = experience.highlights.length > MAX_VISIBLE;

  return (
    <div className="relative flex gap-6 sm:gap-8">
      {/* ── Left column: dot + line ─────────────────── */}
      <div className="flex flex-col items-center">
        {/* Animated dot with briefcase icon */}
        <div
          className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full
            bg-white dark:bg-gray-800
            border-2 border-primary-500 dark:border-primary-400
            shadow-md shadow-primary-200 dark:shadow-primary-900/40
            text-primary-600 dark:text-primary-400
            group-hover:scale-110 transition-transform duration-300
            shrink-0"
          aria-hidden="true"
        >
          <FaBriefcase className="text-sm" />
          {/* Pulse ring — only on first (current) item */}
          {index === 0 && (
            <span className="absolute inset-0 rounded-full border-2 border-primary-400 animate-ping opacity-30" />
          )}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary-400/60 via-primary-300/30 to-transparent dark:from-primary-500/50 dark:via-primary-600/20 dark:to-transparent" />
        )}
      </div>

      {/* ── Right column: card ──────────────────────── */}
      <Card
        padding="none"
        className="group flex-1 mb-10 pb-2"
      >
        {/* ── Header ──────────────────────────────── */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Role + Company */}
            <div className="flex flex-wrap items-baseline gap-1.5 mb-1.5">
              <h3 className="text-base sm:text-lg font-semibold text-primary-700 dark:text-primary-400 group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors">
                {experience.role}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">@</span>
              <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100">
                {experience.company}
              </span>
            </div>

            {/* Meta: duration + location */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
                {experience.duration}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* External link */}
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400
              hover:text-primary-800 dark:hover:text-primary-300 transition-colors shrink-0 mt-0.5"
            aria-label={`Visit ${experience.company} website`}
          >
            <span className="hidden sm:inline font-medium">Visit</span>
            <FaExternalLinkAlt aria-hidden="true" />
          </a>
        </div>

        {/* ── Tech Stack ──────────────────────────── */}
        <div className="px-4 sm:px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-2.5">
          {experience.techStack.map((tech, idx) => {
            const Icon = getIcon(tech.icon);
            return (
              <span
                key={idx}
                className="group/tech relative text-lg hover:scale-125 transform transition-transform duration-200 cursor-default"
                style={{
                  color: getBrandColor(tech.icon),
                }}
                role="img"
                aria-label={tech.name}
              >
                {Icon && <Icon aria-hidden="true" focusable="false" />}
                {/* Tooltip */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg z-10">
                  {tech.name}
                </span>
              </span>
            );
          })}
        </div>

        {/* ── Highlights ──────────────────────────── */}
        <div className="p-4 sm:p-5">
          <ul className="space-y-2">
            {visibleHighlights.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          {/* Show more / less toggle */}
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400
                hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
              aria-expanded={expanded}
            >
              <FaChevronDown
                className={`transform transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
              {expanded
                ? "Show less"
                : `Show ${experience.highlights.length - MAX_VISIBLE} more`}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ExperienceTimelineItem;
