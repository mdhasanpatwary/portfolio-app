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
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";

const typedMetadata = metadataConfig as MetadataConfig;
const homeMetadata = typedMetadata.pages.home;

export const metadata: Metadata = {
  title: homeMetadata.title,
  description: homeMetadata.description,
  keywords: homeMetadata.keywords,
  openGraph: {
    title: homeMetadata.openGraph.title,
    description: homeMetadata.openGraph.description,
    url: homeMetadata.alternates?.canonical || "https://patwary.vercel.app",
  },
  alternates: homeMetadata.alternates ? { canonical: homeMetadata.alternates.canonical } : undefined,
};

async function fetchDevToPosts(): Promise<DevToPost[]> {
  try {
    const res = await fetch("https://dev.to/api/articles?username=mdhassanpatwary", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
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
  const posts = await fetchDevToPosts();
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
