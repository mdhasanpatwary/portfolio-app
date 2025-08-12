import Banner from "@/components/banner/Banner";
import Skills from "@/components/skills/Skills";
import ProfessionalExperience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Testimonials from "@/components/testimonial/Testimonial";
import Hobby from "@/components/hobby/Hobby";
import Blog from "@/components/blog/Blog";
import { FAQ } from "@/components/global";
import FunFact from "@/components/funfact/Funfact";
import Services from "@/components/services/Services";
import {
  projects,
  banner,
  skills,
  experiences,
  services,
  funFacts,
  hobbies,
  testimonials,
} from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "MD Hasan Patwary | Front-End Developer Portfolio - React, Next.js, TypeScript",
  description:
    "MD Hasan Patwary - Experienced Front-End Developer with 6+ years building scalable web applications using React, Next.js, TypeScript, and modern technologies. View projects, skills, and professional experience.",
  keywords: [
    "MD Hasan Patwary",
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "UI/UX Engineer",
  ],
  openGraph: {
    title: "MD Hasan Patwary | Front-End Developer Portfolio",
    description:
      "Experienced Front-End Developer with 6+ years building scalable web applications using React, Next.js, TypeScript, and modern technologies.",
    url: "https://patwary.vercel.app",
  },
  alternates: { canonical: "https://patwary.vercel.app" },
};

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Banner banner={banner} />
      <Skills skills={skills} />
      <ProfessionalExperience experiences={experiences} />

      <Projects
        projectsData={{ ...projects, items: projects.items.slice(0, 8) }}
      />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />

      <FunFact funFacts={funFacts} />
      <Hobby hobbiesData={hobbies} />
      <Blog />
      <FAQ
        items={[
          {
            question: "What services do you offer?",
            answer:
              services.subtitle,
          },
          {
            question: "What technologies do you specialize in?",
            answer:
              skills.subtitle,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
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
    </main>
  );
}
