"use client";

import { FC, useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

interface DevToPost {
    id: number;
    title: string;
    description: string;
    published_at: string;
    cover_image: string | null;
    url: string;
}

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
                <p>Loading blog posts...</p>
            </section>
        );
    }

    if (!posts.length) {
        return (
            <section className="w-full py-24 px-6 text-center">
                <p>No blog posts found.</p>
            </section>
        );
    }

    return (
        <section
            id="blog"
            className="w-full py-24 px-6 bg-gradient-to-b from-white via-slate-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                    Latest Blog Posts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    Insights, tutorials, and tips from my frontend development journey.
                </p>

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
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            }
                        }}
                        className="!pb-12"
                    >
                        {posts.map((post) => (
                            <SwiperSlide key={post.id}>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition text-left min-h-[360px]"
                                >
                                    {post.cover_image && (
                                        <div className="overflow-hidden rounded-t-xl">
                                            <Image
                                                src={post.cover_image}
                                                alt={post.title}
                                                width={404}
                                                height={192}
                                                layout="responsive"
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 flex-grow mb-4 text-sm line-clamp-3">
                                            {post.description}
                                        </p>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                                            <time dateTime={post.published_at}>
                                                {new Date(post.published_at).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}

                        {/* Navigation Buttons */}
                        <button
                            aria-label="Previous"
                            className="prev-btn absolute top-1/2 left-0 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            aria-label="Next"
                            className="next-btn absolute top-1/2 right-0 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                        >
                            <FaChevronRight />
                        </button>
                    </Swiper>

                    {/* View All Button */}
                    <div className="mt-8">
                        <a
                            href="https://dev.to/mdhassanpatwary"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
                        >
                            View All Posts on Dev.to
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
