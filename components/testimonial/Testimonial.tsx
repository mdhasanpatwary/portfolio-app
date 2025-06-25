"use client";

import { FC } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import type { Testimonial, TestimonialsData } from "@/types/data";
import TestimonialCard from "./TestimonialCard";

type TestimonialProps = {
  testimonials: TestimonialsData;
};

const Testimonials: FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <section
      id="testimonials"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={testimonials.title}
          icon={<FaQuoteLeft className="text-indigo-600 dark:text-indigo-400 text-3xl" />}>
          {testimonials.subtitle}
        </SectionTitle>
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
              1200: {
                slidesPerView: 3,
              },
            }}
            className="!pb-6 md:!pb-12"
          >
            {testimonials.items.map((testimonial: Testimonial, index: number) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
            {/* Navigation Buttons */}
            <button
              aria-label="Previous"
              className="prev-btn absolute top-1/2 left-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-20 opacity-0 group-hover:opacity-100 cursor-pointer">
              <FaChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              className="next-btn absolute top-1/2 right-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-20 opacity-0 group-hover:opacity-100 cursor-pointer">
              <FaChevronRight size={20} />
            </button>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
