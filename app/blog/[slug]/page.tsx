import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";

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
  user: {
    name: string;
    username: string;
    profile_image?: string;
  };
}

async function getPostBySlug(slug: string): Promise<DevToPost | null> {
  // Fetch all posts for the user, then find by slug
  const res = await fetch(
    "https://dev.to/api/articles?username=mdhassanpatwary",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const posts: DevToPost[] = await res.json();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  // Fetch full post details (for body_markdown)
  const detailRes = await fetch(`https://dev.to/api/articles/${post.id}`);
  if (!detailRes.ok) return null;
  const detail = await detailRes.json();
  return { ...post, body_markdown: detail.body_markdown };
}

import { marked } from "marked";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
    <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        {post.cover_image && (
          <div className="mb-6">
            <Image
              src={post.cover_image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg object-cover"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mb-6">
          {post.user.profile_image && (
            <Image
              src={post.user.profile_image}
              alt={post.user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {post.user.name}
          </span>
          <span className="text-gray-400">• {date}</span>
          {post.reading_time_minutes && (
            <span className="text-gray-400">
              • {post.reading_time_minutes} min read
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: marked.parse(post.body_markdown || ""),
          }}
        />
        <div className="mt-8 text-right">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
            View on Dev.to →
          </a>
        </div>
      </div>
    </section>
  );
}
