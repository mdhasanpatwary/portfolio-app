"use client";

import BlogCard from "@/components/blog/BlogCard";
import { FaPenNib } from "react-icons/fa";
import { useAppContext } from "@/context/BlogContext";
import { useState } from "react";
import Pagination from "@/components/global/Pagination";

export default function BlogList() {
  const { posts, loading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const currentPosts = posts.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-16 md:my-24">
      {!loading && !posts.length ? (
        <div className="bg-white dark:bg-gray-900 w-full py-24 px-6 text-center rounded-lg shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-6xl text-indigo-400">
              <FaPenNib />
            </span>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              No blog posts found.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check back soon for new articles and insights!
            </p>
          </div>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <BlogCard key={i} loading={true} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} loading={loading} />
            ))}
          </div>
          {/* Creative Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}