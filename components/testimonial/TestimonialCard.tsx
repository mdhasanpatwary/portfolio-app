import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import type { Testimonial } from "@/types/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="relative flex flex-col justify-between h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-3xl p-10 transition duration-300 ease-in-out hover:border-indigo-500 group overflow-hidden min-h-[300px]">
    {/* Subtle gradient overlay for premium feel */}
    <div
      className="absolute inset-0 pointer-events-none select-none rounded-3xl"
      style={{
        background:
          "linear-gradient(135deg,rgba(99,102,241,0.07) 0%,rgba(255,255,255,0.03) 100%)",
      }}
    />
    <div className="absolute top-8 left-8 text-indigo-500 text-4xl opacity-30 pointer-events-none select-none drop-shadow-lg">
      <FaQuoteLeft />
    </div>
    <p className="text-gray-800 dark:text-gray-200 mb-4 italic text-xl font-serif font-medium leading-relaxed z-10">
      “{testimonial.message}”
    </p>
    <div className="border-t border-gray-100 dark:border-gray-700 my-4" />
    <div className="flex items-center gap-5 mt-2">
      <div className="transition-transform duration-300 group-hover:scale-105">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
        />
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">
          {testimonial.name}
        </h4>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide">
          {testimonial.title}
        </p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
