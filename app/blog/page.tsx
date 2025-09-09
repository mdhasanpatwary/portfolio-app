import PageTitle from "@/components/global/PageTitle";
import { FaPenNib } from "react-icons/fa";
import BlogList from "./BlogList";
import type { Metadata } from "next";
import type { DevToPost } from "@/components/blog/BlogCard";
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";

const typedMetadata = metadataConfig as MetadataConfig;
const blogMetadata = typedMetadata.pages.blog;

export const metadata: Metadata = {
  title: blogMetadata.title,
  description: blogMetadata.description,
  keywords: blogMetadata.keywords,
  openGraph: {
    title: blogMetadata.openGraph.title,
    description: blogMetadata.openGraph.description,
    url:
      blogMetadata.alternates?.canonical || "https://patwary.vercel.app/blog",
  },
  alternates: blogMetadata.alternates
    ? { canonical: blogMetadata.alternates.canonical }
    : undefined,
};

async function fetchDevToPosts(): Promise<DevToPost[]> {
  try {
    const res = await fetch(
      "https://dev.to/api/articles?username=mdhassanpatwary",
      {
        next: { revalidate: 3600 },
      }
    );
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
