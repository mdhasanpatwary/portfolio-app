"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Breakpoints = Record<number, { slidesPerView: number }>;

type CarouselProps = {
  children: React.ReactNode[] | React.ReactNode;
  breakpoints?: Breakpoints; // e.g. { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  spaceBetween?: number; // px gap between slides
  className?: string;
  navigation?: boolean;
};

function useSlidesPerView(breakpoints?: Breakpoints, defaultSpv = 1) {
  const getSpv = useCallback(() => {
    if (!breakpoints || typeof window === "undefined") return defaultSpv;
    const widths = Object.keys(breakpoints)
      .map((n) => Number(n))
      .sort((a, b) => a - b);
    let spv = defaultSpv;
    const w = window.innerWidth;
    for (const bp of widths) {
      if (w >= bp) spv = breakpoints[bp]?.slidesPerView ?? defaultSpv;
    }
    return Math.max(1, spv || defaultSpv);
  }, [breakpoints, defaultSpv]);

  const [spv, setSpv] = useState<number>(getSpv);

  useEffect(() => {
    setSpv(getSpv());
    // Throttle resize events for better mobile performance
    let timeoutId: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setSpv(getSpv()), 100);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [getSpv]);

  return spv;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  breakpoints,
  spaceBetween = 30,
  className = "",
  navigation = true,
}) => {
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const spv = useSlidesPerView(breakpoints, 1);

  const [containerWidth, setContainerWidth] = useState(0);
  // Observe container width for accurate pixel-based translations
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Use ResizeObserver entries to avoid forced reflow
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use contentRect.width instead of clientWidth to avoid forced reflow
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    ro.observe(el);
    
    return () => {
      ro.disconnect();
    };
  }, []);

  // Index of the first visible slide (we step by 1 slide)
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - spv);

  // Adjust page when spv changes to keep within bounds
  useEffect(() => {
    // Clamp index when spv changes so we don't overshoot
    setIndex((i) => Math.min(i, Math.max(0, items.length - spv)));
  }, [spv, items.length]);

  const slideToIndex = useCallback(
    (next: number) => {
      const i = Math.max(0, Math.min(maxIndex, next));
      setIndex(i);
    },
    [maxIndex],
  );

  const prev = useCallback(
    () => slideToIndex(index - 1),
    [index, slideToIndex],
  );
  const next = useCallback(
    () => slideToIndex(index + 1),
    [index, slideToIndex],
  );

  // Apply translate based on index (1 slide per step) and include gap in pixels
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Slide width must subtract the gaps that exist within the viewport
    const slideWidthPx =
      containerWidth > 0
        ? (containerWidth - spaceBetween * (spv - 1)) / spv
        : 0;
    const delta = slideWidthPx + spaceBetween; // step by one slide + one gap
    const translate = -(index * delta);
    track.style.transform = `translateX(${translate}px)`;
  }, [index, spv, containerWidth, spaceBetween]);

  const slideStyle: React.CSSProperties = useMemo(() => {
    // Each page shows spv slides; width per slide as % of the page
    // We use CSS calc with gap simulated by padding within track using column-gap
    const calcWidth = `calc((100% - ${spaceBetween}px * ${spv - 1}) / ${spv})`;
    return {
      flex: `0 0 ${calcWidth}`,
      maxWidth: `${calcWidth}`,
    } as React.CSSProperties;
  }, [spv, spaceBetween]);



  return (
    <div className={`relative group ${className}`} ref={containerRef}>
      <div className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ columnGap: `${spaceBetween}px` }}
        >
          {items.map((node, idx) => (
            <div key={idx} style={slideStyle}>
              {node}
            </div>
          ))}
        </div>
      </div>

      {navigation && maxIndex > 0 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            disabled={index === 0}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 hover:bg-primary-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            disabled={index >= maxIndex}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 hover:bg-primary-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}


    </div>
  );
};

export default Carousel;
