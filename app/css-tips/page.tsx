import { cssTips } from "@/data";
import { CssTips } from "@/components";
import PageTitle from "@/components/global/PageTitle";
import { FaCode } from "react-icons/fa";
import type { Metadata } from "next";

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
};

export default function CssTipsPage() {
  return (
    <>
      <PageTitle
        title="CSS Tips & Tricks"
        subtitle="Discover modern CSS techniques and best practices to enhance your web development skills."
        icon={
          <FaCode className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "CSS Tips" }]}
      />
      <CssTips tips={cssTips} />
    </>
  );
}
