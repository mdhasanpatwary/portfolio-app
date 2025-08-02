import PageTitle from "@/components/global/PageTitle";
import { FaFolderOpen } from "react-icons/fa";
import { projects } from "@/data";
import ProjectsList from "./ProjectsList";
import type { Metadata } from "next";

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
};

export default function ProjectsPage() {
  return (
    <>
      <PageTitle
        title={projects.title}
        subtitle={projects.subtitle}
        icon={
          <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: projects.title }]}
      />
      <ProjectsList />
    </>
  );
}
