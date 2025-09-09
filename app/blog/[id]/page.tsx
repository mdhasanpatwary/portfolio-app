import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import PageTitle from "@/components/global/PageTitle";
import SectionTitle from "@/components/global/SectionTitle";
import { FaPenNib } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { CustomImage } from "@/components/global";
import type { Metadata } from "next";
import blogData from "@/data/blog.json";
import { getGlobalMetadata } from "@/utils/metadata";

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
  content?: string;
  edited_at?: string;
  user: {
    name: string;
    username: string;
    profile_image?: string;
  };
}

function getPostById(id: string): DevToPost | null {
  try {
    // Use local blog data directly without Promise wrapper
    const post = blogData.posts.find(p => p.id.toString() === id);
    return post || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const post = blogData.posts.find(p => p.id.toString() === id);
    if (!post) return {};
    const globalConfig = getGlobalMetadata();
    
    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `${globalConfig.domain}/blog/${id}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `${globalConfig.domain}/blog/${id}`,
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
  const components: Components = {
    code: ({ className, children, ...props }) => {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
      <ReactMarkdown components={components}>
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
    // Use local blog data to pre-generate static pages
    return blogData.posts.slice(0, 10).map((article) => ({
      id: article.id.toString(),
    }));
  } catch {
    return [];
  }
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const post = getPostById(id);
  if (!post) return notFound();
  const globalConfig = getGlobalMetadata();

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
          <FaPenNib className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        className="mb-0"
        titleClassName="text-2xl md:text-3xl"
      />

      <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                  name: post.user?.name || globalConfig.author,
                  url: globalConfig.domain,
                },
                publisher: { "@type": "Person", name: globalConfig.author },
                mainEntityOfPage: `${globalConfig.domain}/blog/${post.id}`,
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
              <div className="flex flex-col">
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {post.user.name}
                </span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">
                  {date}
                  {post.reading_time_minutes && (
                    <span> • {post.reading_time_minutes} min read</span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                  aria-label={`Tag: ${tag}`}>
                  #{tag}
                </span>
              ))}
            </div>
            <hr className="my-6 border-primary-100 dark:border-primary-800" />
            <SectionTitle
              title="Article"
              icon={
                <FaPenNib className="text-primary-600 dark:text-primary-400 text-xl" />
              }
              className="mb-4 text-left text-2xl md:text-3xl">
              <span className="sr-only">Article content</span>
            </SectionTitle>
            <MarkdownRenderer content={post.content || post.description} />
            <hr className="my-8 border-primary-100 dark:border-primary-800" />
            <div className="mt-8 flex justify-center">
              <Link
                href="/blog"
                className="text-primary-600 dark:text-primary-400 hover:underline font-semibold text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded px-4 py-2 bg-primary-50 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-gray-700 transition"
                aria-label="Back to Blog">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
