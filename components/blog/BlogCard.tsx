import React from "react";
import Image from "next/image";

export interface DevToPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  cover_image: string | null;
  url: string;
  tag_list?: string[] | string;
  reading_time_minutes?: number;
  user: {
    name: string;
    username: string;
  };
}

interface BlogCardProps {
  post: DevToPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Normalize tags
  const tags = Array.isArray(post.tag_list)
    ? post.tag_list
    : typeof post.tag_list === "string"
    ? post.tag_list.split(",").map((t) => t.trim())
    : [];
  const date = new Date(post.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readingTime = post.reading_time_minutes ? `• ${post.reading_time_minutes} min read` : "";
  const excerpt = post.description?.slice(0, 120) + (post.description?.length > 120 ? "..." : "");

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden focus:outline-none focus:ring-1 focus:ring-indigo-400"
      tabIndex={0}
    >
      {/* Image at top with overlay */}
      {post.cover_image && (
        <div className="relative w-full aspect-[5/2.3] overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-full object-cover rounded-t-xl transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
          {/* Soft overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      )}
      {/* Card Content */}
      <div className="flex-1 flex flex-col px-4 md:px-7 py-4 md:py-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* Title */}
        <h3
          className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-all line-clamp-2"
          title={post.title}
          role="heading"
          aria-level={3}
        >
          {post.title}
        </h3>
        {/* Meta info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex flex-wrap items-center gap-2">
          <span>by {post.user?.name || post.user?.username}</span>
          <span>• {date}</span>
          {readingTime && <span>{readingTime}</span>}
        </div>
        {/* Excerpt with fade-out */}
        <div className="relative mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 pr-8">
            {excerpt}
          </p>
          <div className="absolute right-0 bottom-0 w-16 h-6 bg-gradient-to-l from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none" />
        </div>
        {/* Read more link */}
        <div>
          <span
            className="text-indigo-600 capitalize dark:text-indigo-400 text-sm font-semibold transition-colors cursor-pointer bg-gradient-to-r from-indigo-400 to-indigo-400 bg-no-repeat transition-[background-size] duration-300"
            style={{
              backgroundSize: '0% 2px',
              backgroundPosition: 'left bottom',
              backgroundRepeat: 'no-repeat',
              transition: 'background-size 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundSize = '74% 2px')}
            onMouseLeave={e => (e.currentTarget.style.backgroundSize = '0% 2px')}
          >
            Read more →
          </span>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;