import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import PageTitle from "@/components/global/PageTitle";
import SectionTitle from "@/components/global/SectionTitle";
import { FaPenNib } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { CustomImage } from "@/components/global";
import type { Metadata } from "next";

interface DevToPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  cover_image: string | null;
  url: string;
  slug: string;
  tag_list?: string[] | string;
  reading_time_minutes?: number;
  body_markdown?: string;
  edited_at?: string;
  user: {
    name: string;
    username: string;
    profile_image?: string;
  };
}

async function getPostById(id: string): Promise<DevToPost | null> {
  // Fetch full post details by ID (includes body_markdown)
  const res = await fetch(`https://dev.to/api/articles/${id}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await fetch(`https://dev.to/api/articles/${id}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return {};
    const post: DevToPost = await res.json();
    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `https://patwary.vercel.app/blog/${id}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://patwary.vercel.app/blog/${id}`,
        images: post.cover_image ? [{ url: post.cover_image }] : undefined,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: post.cover_image ? [post.cover_image] : undefined,
      },
    };
  } catch {
    return {};
  }
}

// MarkdownRenderer component for proper headings and code highlighting
function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
      <ReactMarkdown
        components={{
          code({
            className,
            children,
            ...props
          }: {
            className?: string;
            children?: React.ReactNode;
          }) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Enable Incremental Static Generation with 1 day revalidation
export const revalidate = 86400; // 24 hours in seconds

// Pre-generate some popular blog posts at build time
export async function generateStaticParams() {
  try {
    // Fetch recent articles to pre-generate
    const res = await fetch(
      "https://dev.to/api/articles?username=mdhassanpatwary&per_page=10"
    );
    if (!res.ok) return [];

    const articles = await res.json();
    return articles.map((article: DevToPost) => ({
      id: article.id.toString(),
    }));
  } catch {

    return [];
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return notFound();

  const date = new Date(post.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const tags = post.tag_list
    ? Array.isArray(post.tag_list)
      ? post.tag_list
      : typeof post.tag_list === "string"
      ? post.tag_list.split(",").map((t) => t.trim())
      : []
    : [];

  return (
    <>
      <PageTitle
        title={post.title}
        subtitle={post.description}
        icon={
          <FaPenNib className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        className="mb-0"
        titleClassName="text-2xl md:text-3xl"
      />

      <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                image: post.cover_image ? [post.cover_image] : undefined,
                datePublished: post.published_at,
                dateModified: post.edited_at || post.published_at,
                author: {
                  "@type": "Person",
                  name: post.user?.name || "MD Hasan Patwary",
                  url: "https://patwary.vercel.app",
                },
                publisher: { "@type": "Person", name: "MD Hasan Patwary" },
                mainEntityOfPage: `https://patwary.vercel.app/blog/${post.id}`,
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: ["h1", "p"],
                },
              }),
            }}
          />
          {post.cover_image && (
            <div className="mb-6 mt-0">
              <CustomImage
                src={post.cover_image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-t-lg object-cover shadow-md"
                blurType="default"
                priority
              />
            </div>
          )}
          <div className="sm:px-6 md:px-8 pb-8">
            <div className="flex items-center gap-4 mb-6 mt-2">
              {post.user.profile_image && (
                <a
                  href={`https://dev.to/${post.user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"
                  aria-label={`View ${post.user.name}'s profile on Dev.to`}>
                  <CustomImage
                    src={post.user.profile_image}
                    alt={post.user.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-indigo-200 dark:border-indigo-700 shadow-sm"
                    blurType="avatar"
                  />
                </a>
              )}
              <div className="flex flex-col">
                <a
                  href={`https://dev.to/${post.user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 font-medium hover:underline text-sm">
                  {post.user.name}{" "}
                  <span className="text-xs text-gray-400">
                    @{post.user.username}
                  </span>
                </a>
                <span className="text-gray-400 text-xs">
                  {date}
                  {post.reading_time_minutes && (
                    <span> • {post.reading_time_minutes} min read</span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, i) => (
                <a
                  key={i}
                  href={`https://dev.to/t/${encodeURIComponent(tag)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label={`View tag ${tag} on Dev.to`}>
                  #{tag}
                </a>
              ))}
            </div>
            <hr className="my-6 border-indigo-100 dark:border-indigo-800" />
            <SectionTitle
              title="Article"
              icon={
                <FaPenNib className="text-indigo-600 dark:text-indigo-400 text-xl" />
              }
              className="mb-4 text-left text-2xl md:text-3xl">
              <span className="sr-only">Article content</span>
            </SectionTitle>
            <MarkdownRenderer content={post.body_markdown || ""} />
            <hr className="my-8 border-indigo-100 dark:border-indigo-800" />
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                href="/blog"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2 py-1 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                aria-label="Back to Blog">
                ← Back to Blog
              </Link>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2 py-1 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                aria-label="View this post on Dev.to">
                View on Dev.to →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
