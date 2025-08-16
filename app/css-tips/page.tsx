import { cssTips } from "@/data";
import CssTipsClient from "@/components/cssTips/CssTipsClient";
import PageTitle from "@/components/global/PageTitle";
import { FaCode } from "react-icons/fa";
import type { Metadata } from "next";
import PaginationLinks from "@/components/global/PaginationLinks";

export const metadata: Metadata = {
  title: "CSS Tips & Tricks | MD Hasan Patwary - Front-End Developer",
  description:
    "Discover practical CSS tips, tricks, and best practices for modern web development. Learn advanced CSS techniques, responsive design, and performance optimization.",
  keywords: [
    "CSS Tips",
    "CSS Tricks",
    "CSS Best Practices",
    "Responsive Design",
    "CSS Performance",
    "Front-End Development",
    "Web Design",
  ],
  openGraph: {
    title: "CSS Tips & Tricks | MD Hasan Patwary",
    description:
      "Discover practical CSS tips, tricks, and best practices for modern web development.",
    url: "https://patwary.vercel.app/css-tips",
  },
  alternates: { canonical: "https://patwary.vercel.app/css-tips" },
};

export default async function CssTipsPage({ searchParams }: { searchParams: Promise<{ page?: string; tipId?: string }> }) {
  const sp = await searchParams;
  // cssTips is a JSON array (see data/css-tips.json), not an object with `items`
  const tips: Array<{ id: number; title: string; description: string }> = Array.isArray(cssTips)
    ? (cssTips as Array<{ id: number; title: string; description: string }>)
    : ((cssTips as unknown as { items?: Array<{ id: number; title: string; description: string }> }).items || []);
  const PAGE_SIZE = 6;
  const page = Math.max(1, Number(sp?.page || 1) || 1);
  const totalPages = Math.max(1, Math.ceil(tips.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageTips = tips.slice(startIdx, endIdx);
  const initialTipId = sp?.tipId ? Number(sp.tipId) : undefined;
  const initialTipData = typeof initialTipId === 'number' ? (tips.find(t => t.id === initialTipId) || null) : null;
  const howToCandidates = tips.filter((t) =>
    [
      "scroll-behavior",
      "clamp",
      "aspect-ratio",
      "content-visibility",
      "will-change",
      "accent-color",
      ":focus-visible",
      "grid-auto-flow",
      "auto-fit",
      "auto fill",
      "container queries",
      "text-wrap: balance",
      ":is()",
      ":where()",
      "box-sizing",
      "overflow-wrap",
      "min() & max()",
      "css variable",
    ].some((k) => t.title.toLowerCase().includes(k))
  );
  return (
    <>
      <PageTitle
        title="CSS Tips & Tricks"
        subtitle="Discover modern CSS techniques and best practices to enhance your web development skills."
        icon={
          <FaCode className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "CSS Tips" }]}
      />
      <CssTipsClient tips={pageTips} initialTipId={initialTipId} initialTipData={initialTipData} />
      {/* Wrapper adds consistent bottom spacing from footer */}
      <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-24">
        <PaginationLinks
          currentPage={page}
          totalPages={totalPages}
          makeHref={(p) => `/css-tips?page=${p}`}
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: pageTips.map((t, i: number) => ({
              "@type": "CreativeWork",
              position: startIdx + i + 1,
              name: t.title,
              description: t.description,
            })) || [],
          }),
        }}
      />
      {howToCandidates.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              howToCandidates.map((t) => {
                const title = t.title;
                const lower = title.toLowerCase();
                let steps: string[] = [];
                if (lower.includes("scroll-behavior")) {
                  steps = [
                    "Add CSS: html { scroll-behavior: smooth; }",
                    "Ensure in-page links use anchor IDs (e.g., href=#section).",
                    "Test keyboard and mouse navigation for smooth scrolling.",
                  ];
                } else if (lower.includes("clamp")) {
                  steps = [
                    "Choose minimum, preferred (e.g., 2vw + 1rem), and maximum values.",
                    "Apply clamp() to the CSS property (e.g., font-size).",
                    "Verify scaling across small and large viewports.",
                  ];
                } else if (lower.includes("aspect-ratio")) {
                  steps = [
                    "Pick the desired ratio (e.g., 1 / 1 or 16 / 9).",
                    "Apply aspect-ratio to the container or media wrapper.",
                    "Confirm no layout shift across breakpoints.",
                  ];
                } else if (lower.includes("content-visibility")) {
                  steps = [
                    "Add content-visibility: auto; to offscreen or heavy sections.",
                    "Provide contain-intrinsic-size to reserve space and avoid shifts.",
                    "Profile rendering to confirm deferred painting.",
                  ];
                } else if (lower.includes("will-change")) {
                  steps = [
                    "Identify performance-critical animations (e.g., transform, opacity).",
                    "Apply will-change: transform, opacity; to the animated element.",
                    "Avoid long-term use to prevent memory overhead.",
                  ];
                } else if (lower.includes("accent-color")) {
                  steps = [
                    "Pick a brand color (e.g., #0d9488).",
                    "Apply accent-color to form controls (checkbox, radio, range).",
                    "Verify contrast and accessibility across themes.",
                  ];
                } else if (lower.includes(":focus-visible")) {
                  steps = [
                    "Add focus-visible styles for keyboard users (outline, offset).",
                    "Remove generic outline resets that harm accessibility.",
                    "Test with keyboard-only navigation.",
                  ];
                } else if (lower.includes("grid-auto-flow")) {
                  steps = [
                    "Enable CSS Grid on container.",
                    "Set grid-auto-flow: column|row dense as needed.",
                    "Optionally define grid-auto-columns/rows for sizing.",
                  ];
                } else if (lower.includes("auto-fit") || lower.includes("auto fill")) {
                  steps = [
                    "Use repeat(auto-fit|auto-fill, minmax(min, 1fr)) in grid-template-columns.",
                    "Choose auto-fit to stretch items, auto-fill to preserve empty tracks.",
                    "Resize viewport to verify behavior.",
                  ];
                } else if (lower.includes("container queries")) {
                  steps = [
                    "Declare container-type: inline-size on the parent.",
                    "Write @container rules targeting min/max width thresholds.",
                    "Test nested components in varying container widths.",
                  ];
                } else if (lower.includes("text-wrap: balance")) {
                  steps = [
                    "Apply text-wrap: balance to headings.",
                    "Verify improved line breaks for long titles.",
                    "Fallback gracefully on unsupported browsers.",
                  ];
                } else if (lower.includes(":is()")) {
                  steps = [
                    "Group related selectors with :is() to reduce verbosity.",
                    "Prefer :is() when specificity should follow the most specific selector.",
                    "Refactor comma-separated lists into :is() blocks.",
                  ];
                } else if (lower.includes(":where()")) {
                  steps = [
                    "Use :where() for zero-specificity base styles.",
                    "Layer component overrides without !important.",
                    "Validate cascade with devtools.",
                  ];
                } else if (lower.includes("box-sizing")) {
                  steps = [
                    "Set *, *::before, *::after { box-sizing: border-box; } globally.",
                    "Remove layout bugs caused by padding/border.",
                    "Check components for expected final size.",
                  ];
                } else if (lower.includes("overflow-wrap")) {
                  steps = [
                    "Apply overflow-wrap: break-word; to text containers.",
                    "Test with long URLs and unbroken strings.",
                    "Avoid layout overflow in dynamic content sections.",
                  ];
                } else if (lower.includes("min() & max()")) {
                  steps = [
                    "Identify properties that need clamped responsive values.",
                    "Use min()/max() to bound values without media queries.",
                    "Verify behavior on extreme viewport sizes.",
                  ];
                } else if (lower.includes("css variable") || lower.includes("custom properties")) {
                  steps = [
                    "Declare variables in :root (e.g., --primary-color).",
                    "Reference via var(--primary-color) throughout components.",
                    "Optionally switch themes by changing variable values.",
                  ];
                }
                return {
                  "@context": "https://schema.org",
                  "@type": "HowTo",
                  name: title,
                  description: t.description,
                  step: steps.map((s) => ({ "@type": "HowToStep", text: s })),
                };
              })
            ),
          }}
        />
      )}
    </>
  );
}
