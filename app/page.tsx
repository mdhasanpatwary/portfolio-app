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
import { generateMetadata as createMetadata, getPageMetadata, generateStructuredData } from "@/utils/metadata";

export const metadata: Metadata = createMetadata(getPageMetadata("home"));

function getBlogPosts(): DevToPost[] {
  try {
    // Use local blog data directly without Promise wrapper
    return blogData.posts;
  } catch {
    return [];
  }
}

export default function Home() {
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
  const posts = getBlogPosts();
  return (
    <div className="flex flex-col row-start-2 items-center sm:items-start">
      <Banner banner={banner} />
      <Skills skills={skills} />
      <ProfessionalExperience experiences={experiences} />

      <Projects
        projectsData={{ ...projects, items: projects.items.slice(0, 8) as Array<{
          id: string;
          title: string;
          description: string;
          image: string;
          technologies: string[];
          link: string;
          github: string;
          category: string;
          status: string;
          longDescription?: string;
          features?: string[];
          challenges?: string[];
          solutions?: string[];
          marketplace: "codecanyon" | "themeforest";
          demo?: string;
        }> }}
      />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />

      <FunFact funFacts={funFacts} />
      <Blog posts={posts} />
      <FAQ faqData={homeFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredData("faq", {
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
