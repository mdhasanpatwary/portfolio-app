import BlogCard, { DevToPost } from "@/components/blog/BlogCard";
import { FaPenNib } from "react-icons/fa";
import PaginationLinks from "@/components/global/PaginationLinks";

interface BlogListProps {
  posts: DevToPost[];
  page?: number;
}

export default function BlogList({ posts, page = 1 }: BlogListProps) {
  const postsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const currentPosts = posts.slice(startIdx, endIdx);

  return (
    <div className="max-w-7xl mx-auto px-4 my-16 md:my-24">
      {!posts.length ? (
        <div className="bg-white dark:bg-gray-900 w-full py-24 px-6 text-center rounded-lg shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-6xl text-primary-400">
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
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} loading={false} />
            ))}
          </div>
          {/* Pagination with links */}
          <PaginationLinks
            currentPage={currentPage}
            totalPages={totalPages}
            makeHref={(p) => `/blog?page=${p}`}
          />
        </>
      )}
    </div>
  );
}