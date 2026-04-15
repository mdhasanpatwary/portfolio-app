import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { CustomImage, Card } from "@/components/global";
import type { Testimonial } from "@/types/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card
    className="relative flex flex-col justify-between h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl p-10 ease-in-out group min-h-[300px] before:absolute before:inset-0 before:pointer-events-none before:select-none before:rounded-2xl before:bg-gradient-to-br before:from-primary-500/7 before:to-white/3"
    padding="none"
  >
    <FaQuoteLeft className="absolute top-8 left-8 text-primary-500 text-4xl opacity-30 pointer-events-none select-none drop-shadow-lg" aria-hidden="true" focusable="false" />

    <div className="relative z-10 flex flex-col flex-grow">
      <div className="flex gap-1 mb-4 text-yellow-400/90 drop-shadow-sm">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4" />
        ))}
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-4 italic text-xl font-serif font-medium leading-relaxed">
        &ldquo;{testimonial.message}&rdquo;
      </p>
    </div>

    <div className="border-t border-gray-100 dark:border-gray-700 my-4" />

    <div className="flex items-center gap-5 mt-2">
      <CustomImage
        src={testimonial.avatar}
        alt={testimonial.name}
        width={64}
        height={64}
        sizes="64px"
        blurType="avatar"
        className="w-16 h-16 rounded-full border-4 border-primary-500 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
      />
      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">
          {testimonial.name}
        </p>
        <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold tracking-wide">
          {testimonial.title}
        </p>
      </div>
    </div>
  </Card>
);

export default TestimonialCard;
