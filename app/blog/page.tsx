"use client";

import BlogCard from "@/components/blog/BlogCard";
import SectionTitle from "@/components/global/SectionTitle";
import { FaPenNib } from "react-icons/fa";
import { useAppContext } from "@/context/BlogContext";

export default function BlogPage() {
  const { posts, loading } = useAppContext();

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="All Blog Posts"
          icon={<FaPenNib className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        >
          Explore all my articles, tutorials, and insights.
        </SectionTitle>
        {!loading && !posts.length ? (
          <div className="bg-white dark:bg-gray-900 w-full py-24 px-6 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-6xl text-indigo-400">
                <FaPenNib />
              </span>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No blog posts found.</p>
              <p className="text-gray-500 dark:text-gray-400">Check back soon for new articles and insights!</p>
            </div>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <BlogCard key={i} loading={true} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} loading={loading} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}