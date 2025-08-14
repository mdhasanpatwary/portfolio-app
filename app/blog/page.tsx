import PageTitle from "@/components/global/PageTitle";
import { FaPenNib } from "react-icons/fa";
import BlogList from "./BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | MD Hasan Patwary - Web Development Articles",
  description:
    "Read MD Hasan Patwary's web development blog featuring articles on React, Next.js, TypeScript, CSS tips, and modern web development best practices.",
  keywords: [
    "Web Development Blog",
    "React Blog",
    "Next.js Blog",
    "TypeScript Blog",
    "CSS Tips",
    "Front-End Development",
    "MD Hasan Patwary Blog",
  ],
  openGraph: {
    title: "Blog | MD Hasan Patwary - Web Development Articles",
    description:
      "Read MD Hasan Patwary's web development blog featuring articles on React, Next.js, TypeScript, CSS tips, and modern web development best practices.",
    url: "https://patwary.vercel.app/blog",
  },
  alternates: { canonical: "https://patwary.vercel.app/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageTitle
        title="Latest Blog Posts"
        subtitle="Explore all my articles, tutorials, and insights."
        icon={
          <FaPenNib className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogList />
    </>
  );
}
