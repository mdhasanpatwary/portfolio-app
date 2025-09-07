import Banner from "@/components/banner/Banner";
import Skills from "@/components/skills/Skills";
import ProfessionalExperience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Testimonials from "@/components/testimonial/Testimonial";
import Blog from "@/components/blog/Blog";
import type { DevToPost } from "@/components/blog/BlogCard";
import FAQ from "@/components/faq/FAQ";
import { faqs } from "@/data";
import type { FAQsData } from "@/types/data";
import FunFact from "@/components/funfact/Funfact";
import Services from "@/components/services/Services";
import blogData from "@/data/blog.json";
import {
  projects,
  banner,
  skills,
  experiences,
  services,
  funFacts,
  testimonials,
} from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "John Doe | Full-Stack Developer Portfolio - React, Next.js, TypeScript",
  description:
    "John Doe - Experienced Full-Stack Developer with 5+ years building scalable web applications using React, Next.js, TypeScript, and modern technologies. View projects, skills, and professional experience.",
  keywords: [
    "John Doe",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "UI/UX Engineer",
  ],
  openGraph: {
    title: "John Doe | Full-Stack Developer Portfolio",
    description:
      "Experienced Full-Stack Developer with 5+ years building scalable web applications using React, Next.js, TypeScript, and modern technologies.",
    url: "https://yourdomain.com",
  },
  alternates: { canonical: "https://yourdomain.com" },
};

async function getBlogPosts(): Promise<DevToPost[]> {
  try {
    // Use local blog data instead of external API
    return blogData.posts;
  } catch {
    return [];
  }
}

export default async function Home() {
  const homeFaqs: FAQsData = {
    title: faqs.title,
    subtitle: faqs.subtitle,
    items: faqs.items.filter((i) =>
      [
        "services",
        "technolog",
        "projects",
        "performance",
        "headless",
        "figma",
        "business",
        "animation",
      ].some((k) => (i.question + i.answer).toLowerCase().includes(k))
    ),
  };
  const posts = await getBlogPosts();
  return (
    <div className="flex flex-col row-start-2 items-center sm:items-start">
      <Banner banner={banner} />
      <Skills skills={skills} />
      <ProfessionalExperience experiences={experiences} />

      <Projects
        projectsData={{ ...projects, items: projects.items.slice(0, 8) }}
      />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />

      <FunFact funFacts={funFacts} />
      <Blog posts={posts} />
      <FAQ faqData={homeFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              ...homeFaqs.items.map((i) => ({
                "@type": "Question",
                name: i.question,
                acceptedAnswer: { "@type": "Answer", text: i.answer },
              })),
              {
                "@type": "Question",
                name: "What services do you offer?",
                acceptedAnswer: { "@type": "Answer", text: services.subtitle },
              },
              {
                "@type": "Question",
                name: "What technologies do you specialize in?",
                acceptedAnswer: { "@type": "Answer", text: skills.subtitle },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
