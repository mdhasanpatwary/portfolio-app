"use client";

import { FC } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaPenNib, FaExternalLinkAlt } from "react-icons/fa";
import BlogCard from "./BlogCard";
import SectionTitle from "../global/SectionTitle";
import Link from "next/link";
import { useAppContext } from "@/context/BlogContext";

const MAX_POSTS = 9; // limit posts to 9 for slider

const Blog: FC = () => {
  const { posts, loading } = useAppContext();

  if (!loading && !posts.length) return null;

  return (
    <section
      id="blog"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Latest Blog Posts"
          icon={<FaPenNib className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        >
          Insights, tutorials, and tips from my frontend development journey.
        </SectionTitle>

        {/* Blog Carousel */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <BlogCard key={i} loading={true} />
            ))}
          </div>
        ) : (
          <div className="relative group">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={30}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
                disabledClass: "opacity-50 cursor-not-allowed",
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {posts.slice(0, MAX_POSTS).map((post) => (
                <SwiperSlide key={post.id}>
                  <BlogCard post={post} loading={false} />
                </SwiperSlide>
              ))}
              {/* Navigation Buttons */}
              <button
                aria-label="Previous"
                className="prev-btn absolute top-1/2 left-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-20 opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                aria-label="Next"
                className="next-btn absolute top-1/2 right-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-20 opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <FaChevronRight size={20} />
              </button>
            </Swiper>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 dark:hover:bg-indigo-500 transition flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>View All Posts</span>
            <FaExternalLinkAlt size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
