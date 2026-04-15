import { FC } from "react";
import { FaPenNib, FaExternalLinkAlt } from "react-icons/fa";
import BlogCard, { DevToPost } from "./BlogCard";
import SectionTitle from "../global/SectionTitle";
import Btn from "@/components/global/Btn";
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
      className="w-full py-16 md:py-24 px-6 bg-gray-50 dark:bg-gray-950 content-visibility-auto"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Latest Blog Posts"
          icon={
            <FaPenNib
              className="text-primary-600 dark:text-primary-400 text-2xl"
              aria-hidden="true"
              focusable="false"
            />
          }
        >
          Insights, tutorials, and tips from my frontend development journey.
        </SectionTitle>

        {/* Blog Carousel */}
        <Carousel
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          className="pb-6"
          navigation
        >
          {posts.slice(0, MAX_POSTS).map((post) => (
            <div key={post.id}>
              <BlogCard post={post} loading={false} />
            </div>
          ))}
        </Carousel>

        <div className="text-center mt-6">
          <Btn variant="primary-sm" as="link" href="/blog">
            <span>View All Posts</span>
            <FaExternalLinkAlt size={12} aria-hidden="true" focusable="false" />
          </Btn>
        </div>
      </div>
    </section>
  );
};

export default Blog;
