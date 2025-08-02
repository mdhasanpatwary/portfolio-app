import About from "@/components/about/About";
import Education from "@/components/education/Education";
import { education, about } from "@/data";
import PageTitle from "@/components/global/PageTitle";
import { FaUser } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MD Hasan Patwary | Front-End Developer Portfolio",
  description:
    "Learn about MD Hasan Patwary, a 6+ years experienced Front-End Developer specializing in React, Next.js, TypeScript, and modern web technologies. View education, skills, and professional background.",
  keywords: [
    "MD Hasan Patwary",
    "Front-End Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "About",
  ],
  openGraph: {
    title: "About MD Hasan Patwary | Front-End Developer",
    description:
      "Learn about MD Hasan Patwary, a 6+ years experienced Front-End Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    url: "https://patwary.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageTitle
        title="About Me"
        subtitle="Learn more about my background, skills, and education."
        icon={
          <FaUser className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <About about={about} />
      <Education educationData={education} />
    </>
  );
}
