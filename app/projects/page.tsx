import PageTitle from "@/components/global/PageTitle";
import { FaFolderOpen } from "react-icons/fa";
import { projects } from "@/data";
import type { Metadata } from "next";
import ProjectsGrid from "./ProjectsGrid";
import Pagination from "@/components/global/Pagination";

export const metadata: Metadata = {
  title: "Projects | MD Hasan Patwary - Front-End Developer Portfolio",
  description:
    "Explore MD Hasan Patwary's web development projects built with React, Next.js, TypeScript, and modern technologies. View live demos, source code, and technical implementations.",
  keywords: [
    "Web Development Projects",
    "React Projects",
    "Next.js Projects",
    "Front-End Developer",
    "Portfolio Projects",
    "MD Hasan Patwary",
  ],
  openGraph: {
    title: "Projects | MD Hasan Patwary - Front-End Developer",
    description:
      "Explore MD Hasan Patwary's web development projects built with React, Next.js, TypeScript, and modern technologies.",
    url: "https://patwary.vercel.app/projects",
  },
  alternates: { canonical: "https://patwary.vercel.app/projects" },
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const PAGE_SIZE = 8;
  const page = Math.max(1, Number(sp?.page || 1) || 1);
  const totalProjects = projects.items.length;
  const totalPages = Math.max(1, Math.ceil(totalProjects / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageItems = projects.items.slice(startIdx, endIdx);

  return (
    <>
      <PageTitle
        title={projects.title}
        subtitle={projects.subtitle}
        icon={
          <FaFolderOpen className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: projects.title }]}
      />
      <div className="max-w-7xl mx-auto px-4 my-16 md:my-24">
        <ProjectsGrid items={pageItems} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          makeHref={(p) => `/projects?page=${p}`}
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: pageItems.map((p, i) => ({
              "@type": p.github ? "SoftwareSourceCode" : "CreativeWork",
              position: startIdx + i + 1,
              name: p.title,
              description: p.description,
              url: p.link || p.demo,
              codeRepository: p.github || undefined,
              programmingLanguage: Array.isArray(p.technologies)
                ? p.technologies.join(", ")
                : undefined,
              image: p.image ? `https://patwary.vercel.app${p.image}` : undefined,
              author: { "@type": "Person", name: "MD Hasan Patwary" },
            })),
          }),
        }}
      />
    </>
  );
}
