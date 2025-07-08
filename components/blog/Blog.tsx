"use client";

import { FC, useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaPenNib } from "react-icons/fa";
import BlogCard, { DevToPost } from "./BlogCard";
import SectionTitle from "../global/SectionTitle";

const MAX_POSTS = 9; // limit posts to 9 for slider

const Blog: FC = () => {
  const [posts, setPosts] = useState<DevToPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=mdhassanpatwary")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, MAX_POSTS)); // limit number of posts shown
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-24 px-6 text-center">
        <div className="flex justify-center items-center h-40">
          {/* Skeleton loader for 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm h-72 flex flex-col p-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 mb-4 w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4 mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="w-full py-24 px-6 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-6xl text-indigo-400">
            <FaPenNib />
          </span>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No blog posts found.</p>
          <p className="text-gray-500 dark:text-gray-400">Check back soon for new articles and insights!</p>
        </div>
      </section>
    );
  }

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
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard post={post} />
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

        {/* View All Button */}
        <div className="mt-8 text-center">
          <a
            href="https://dev.to/mdhassanpatwary"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-indigo-300 font-semibold py-3 px-6 rounded-lg shadow transition"
          >
            View All Posts on Dev.to
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
