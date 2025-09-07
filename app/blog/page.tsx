import PageTitle from "@/components/global/PageTitle";
import { FaPenNib } from "react-icons/fa";
import BlogList from "./BlogList";
import type { Metadata } from "next";
import type { DevToPost } from "@/components/blog/BlogCard";
import blogData from "@/data/blog.json";

export const metadata: Metadata = {
  title: "Blog | Modern Portfolio Template - Web Development Articles",
  description:
    "Read our web development blog featuring articles on React, Next.js, TypeScript, and modern web development best practices.",
  keywords: [
    "Web Development Blog",
    "React Blog",
    "Next.js Blog",
    "TypeScript Blog",
    "Front-End Development",
    "Programming Blog",
  ],
  openGraph: {
    title: "Blog | Modern Portfolio Template - Web Development Articles",
    description:
      "Read our web development blog featuring articles on React, Next.js, TypeScript, and modern web development best practices.",
    url: "https://yourdomain.com/blog",
  },
  alternates: { canonical: "https://yourdomain.com/blog" },
};

async function getBlogPosts(): Promise<DevToPost[]> {
  try {
    // Use local blog data instead of external API
    return blogData.posts;
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const posts = await getBlogPosts();
  const sp = await searchParams;
  const page = Number(sp?.page || 1) || 1;
  return (
    <>
      <PageTitle
        title="Latest Blog Posts"
        subtitle="Explore all our articles, tutorials, and insights."
        icon={
          <FaPenNib className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogList posts={posts} page={page} />
    </>
  );
}
