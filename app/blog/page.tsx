import PageTitle from "@/components/global/PageTitle";
import { FaPenNib } from "react-icons/fa";
import BlogList from "./BlogList";
import type { Metadata } from "next";
import type { DevToPost } from "@/components/blog/BlogCard";

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

async function fetchDevToPosts(): Promise<DevToPost[]> {
  try {
    const res = await fetch("https://dev.to/api/articles?username=mdhassanpatwary", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const posts = await fetchDevToPosts();
  const sp = await searchParams;
  const page = Number(sp?.page || 1) || 1;
  return (
    <>
      <PageTitle
        title="Latest Blog Posts"
        subtitle="Explore all my articles, tutorials, and insights."
        icon={
          <FaPenNib className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogList posts={posts} page={page} />
    </>
  );
}
