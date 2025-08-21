import { FC } from "react";
import { FaPenNib, FaExternalLinkAlt } from "react-icons/fa";
import BlogCard, { DevToPost } from "./BlogCard";
import SectionTitle from "../global/SectionTitle";
import Link from "next/link";
import Carousel from "@/components/global/Carousel";

const MAX_POSTS = 9; // limit posts to 9 for slider

interface BlogProps {
  posts: DevToPost[];
}

const Blog: FC<BlogProps> = ({ posts }) => {
  if (!posts.length) return null;

  return (
    <section
      id="blog"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Latest Blog Posts"
          icon={
            <FaPenNib className="text-primary-600 dark:text-primary-400 text-3xl" aria-hidden="true" focusable="false" />
          }>
          Insights, tutorials, and tips from my frontend development journey.
        </SectionTitle>

        {/* Blog Carousel */}
        <Carousel
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            spaceBetween={30}
            className="pb-12"
            navigation
            pagination>
          {posts.slice(0, MAX_POSTS).map((post) => (
            <div key={post.id}>
              <BlogCard post={post} loading={false} />
            </div>
          ))}
        </Carousel>

        {/* View All Button */}
        <div className="text-center mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-2 bg-primary-700 text-white text-sm font-medium rounded hover:bg-primary-800 dark:hover:bg-primary-600 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary-500">
            <span>View All Posts</span>
            <FaExternalLinkAlt size={14} aria-hidden="true" focusable="false" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
