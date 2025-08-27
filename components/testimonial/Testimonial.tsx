import { FC } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import SectionTitle from "@/components/global/SectionTitle";
import type { Testimonial, TestimonialsData } from "@/types/data";
import TestimonialCard from "./TestimonialCard";
import Carousel from "@/components/global/Carousel";

type TestimonialProps = {
  testimonials: TestimonialsData;
};

const Testimonials: FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <section
      id="testimonials"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 content-visibility-auto"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={testimonials.title}
          icon={
            <FaQuoteLeft
              className="text-primary-600 dark:text-primary-400 text-3xl"
              aria-hidden="true"
              focusable="false"
            />
          }
        >
          {testimonials.subtitle}
        </SectionTitle>
        {/* Aggregate review count without fabricating ratings */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://patwary.vercel.app/#person",
              name: "MD Hasan Patwary",
              aggregateRating: {
                "@type": "AggregateRating",
                reviewCount: testimonials.items.length,
                ratingCount: testimonials.items.length,
                worstRating: 1,
                bestRating: 5,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: testimonials.items.map((t, i) => ({
                "@type": "Review",
                position: i + 1,
                reviewBody: t.message,
                author: { "@type": "Person", name: t.name },
                itemReviewed: {
                  "@type": "Person",
                  "@id": "https://patwary.vercel.app/#person",
                  name: "MD Hasan Patwary",
                },
              })),
            }),
          }}
        />
        <Carousel
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          navigation
        >
          {testimonials.items.map((testimonial: Testimonial, index: number) => (
            <div key={index}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
