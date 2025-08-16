import React from "react";
import Link from "next/link";
import Skeleton from "../global/Skeleton";
import { CustomImage } from "@/components/global";

export interface DevToPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  cover_image: string | null;
  url: string;
  slug: string; // Added slug to the interface
  tag_list?: string[] | string;
  reading_time_minutes?: number;
  user: {
    name: string;
    username: string;
  };
}

interface BlogCardProps {
  post?: DevToPost;
  loading?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, loading = false }) => {
  // Normalize tags
  const tags = post && post.tag_list
    ? Array.isArray(post.tag_list)
      ? post.tag_list
      : typeof post.tag_list === "string"
        ? post.tag_list.split(",").map((t) => t.trim())
        : []
    : [];
  const date = post ? new Date(post.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "";
  const readingTime = post && post.reading_time_minutes ? `• ${post.reading_time_minutes} min read` : "";
  const excerpt = post && post.description ? post.description.slice(0, 120) + (post.description.length > 120 ? "..." : "") : "";

  return (
    loading ? (
      <div
        className="group flex flex-col min-h-[22rem] bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden focus:outline-none focus:ring-1 focus:ring-primary-400"
        tabIndex={0}
      >
        {/* Image at top with overlay */}
        <div className="relative w-full aspect-[5/2.3] overflow-hidden">
          <Skeleton className="w-full h-full rounded-t-xl" height="h-full" />
        </div>
        {/* Card Content */}
        <div className="flex-1 flex flex-col px-4 md:px-7 py-4 md:py-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 min-h-[28px]">
            <Skeleton className="w-14 rounded-full" height="h-6" />
            <Skeleton className="w-10 rounded-full" height="h-6" />
          </div>
          {/* Title */}
          <Skeleton className="w-3/4 mb-2" height="h-7" />
          {/* Meta info */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex flex-wrap items-center gap-2 min-h-[20px]">
            <Skeleton className="w-24" height="h-4" />
          </div>
          {/* Excerpt with fade-out */}
          <div className="relative mb-6 min-h-[38px]">
            <Skeleton className="w-full" height="h-4" />
          </div>
          {/* Read more link */}
          <div>
            <Skeleton className="w-20" height="h-5" />
          </div>
        </div>
      </div>
    ) : (
      <Link
        href={post ? `/blog/${post.id}` : "#"}
        className="group flex flex-col min-h-[22rem] bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden focus:outline-none focus:ring-1 focus:ring-primary-400"
        tabIndex={0}
      >
        {/* Image at top with overlay */}
        <div className="relative w-full aspect-[5/2.3] overflow-hidden">
          {post?.cover_image ? (
            <>
              <CustomImage
                src={post.cover_image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-t-xl transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                blurType="default"
                priority
              />
              {/* Soft overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </>
          ) : null}
        </div>
        {/* Card Content */}
        <div className="flex-1 flex flex-col px-4 md:px-7 py-4 md:py-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 min-h-[28px]">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* Title */}
          <h3
            className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-all line-clamp-2"
            title={post?.title}
            role="heading"
            aria-level={3}
          >
            {post?.title}
          </h3>
          {/* Meta info */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex flex-wrap items-center gap-2 min-h-[20px]">
            <span>by {post?.user?.name || post?.user?.username}</span>
            <span>• {date}</span>
            {readingTime && <span>{readingTime}</span>}
          </div>
          {/* Excerpt with fade-out */}
          <div className="relative mb-6 min-h-[38px]">
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 pr-8">
              {excerpt}
            </p>
            <div className="absolute right-0 bottom-0 w-16 h-6 bg-gradient-to-l from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none" />
          </div>
          {/* Read more link */}
          <div>
            <span
              className="text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline underline-offset-4 cursor-pointer"
            >
              Read more →
            </span>
          </div>
        </div>
      </Link>
    )
  );
};

export default BlogCard;