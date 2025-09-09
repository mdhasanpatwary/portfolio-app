import PageTitle from "@/components/global/PageTitle";
import { FaPenNib } from "react-icons/fa";
import BlogList from "./BlogList";
import type { Metadata } from "next";
import type { DevToPost } from "@/components/blog/BlogCard";
import blogData from "@/data/blog.json";
import { generateMetadata as createMetadata, getPageMetadata } from "@/utils/metadata";
import React from "react";

export const metadata: Metadata = createMetadata(getPageMetadata("blog"));

function getBlogPosts(): DevToPost[] {
  try {
    // Use local blog data directly without Promise wrapper
    return blogData.posts;
  } catch {
    return [];
  }
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const posts = getBlogPosts();
  const sp = React.use(searchParams);
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
