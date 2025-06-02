"use client";

import { FC } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";


interface Testimonial {
    name: string;
    title: string;
    message: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Rahim Uddin",
        title: "Project Manager at 6amTech",
        message: "Hasan delivers clean, responsive, high-performing code. Highly reliable developer!",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sadia Ahmed",
        title: "Team Lead at Themelooks",
        message: "Hasan's attention to detail and creative solutions made him a valuable team member.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Tanvir Hossain",
        title: "Co-founder at Demandium",
        message: "His frontend skills and design sense are excellent. He elevated our UI drastically.",
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
        name: "Fariha Nabila",
        title: "Designer at Anefty",
        message: "Creative and deadline-driven. Hasan is a dream to work with!",
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    },
    {
        name: "Mahmudul Hasan",
        title: "Founder at Repserv",
        message: "He understands user-centric design like no one else. A joy to work with!",
        avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
        name: "Ayesha Noor",
        title: "Product Owner at Unihost",
        message: "Very professional, communicative, and great at frontend architecture.",
        avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    },
];

const Testimonials: FC = () => {
    return (
        <section
            id="testimonials"
            className="w-full py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FaQuoteLeft className="text-indigo-600 dark:text-indigo-400 text-3xl" />
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Testimonials
                    </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    What others say about working with me.
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
                            },
                        }}
                        className="!pb-12"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition text-left min-h-[240px]">
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic text-base flex-grow">
                                        “{testimonial.message}”
                                    </p>
                                    <div className="flex items-center gap-4 mt-6">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
                                        />
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {testimonial.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
