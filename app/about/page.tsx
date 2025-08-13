import About from "@/components/about/About";
import Education from "@/components/education/Education";
import { education, about } from "@/data";
import PageTitle from "@/components/global/PageTitle";
import { FaUser } from "react-icons/fa";
import type { Metadata } from "next";
import FAQ from "@/components/faq/FAQ";
import { faqs } from "@/data";
import type { FAQsData } from "@/types/data";

export const metadata: Metadata = {
  title: "About MD Hasan Patwary | Front-End Developer Portfolio",
  description:
    "Learn about MD Hasan Patwary, a 6+ years experienced Front-End Developer specializing in React, Next.js, TypeScript, and modern web technologies. View education, skills, and professional background.",
  keywords: [
    "MD Hasan Patwary",
    "Front-End Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "About",
  ],
  openGraph: {
    title: "About MD Hasan Patwary | Front-End Developer",
    description:
      "Learn about MD Hasan Patwary, a 6+ years experienced Front-End Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    url: "https://patwary.vercel.app/about",
  },
  alternates: { canonical: "https://patwary.vercel.app/about" },
};

export default function AboutPage() {
  const aboutDescription = Array.isArray(about.description)
    ? about.description.join(" ")
    : about.description;
  const aboutFaqs: FAQsData = {
    title: faqs.title,
    subtitle: faqs.subtitle,
    items: faqs.items.filter((i) =>
      ["who is", "background", "relocation", "remote", "location"].some((k) =>
        (i.question + i.answer).toLowerCase().includes(k)
      )
    ),
  };
  return (
    <>
      <PageTitle
        title="About Me"
        subtitle="Learn more about my background, skills, and education."
        icon={
          <FaUser className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <About about={about} />
      <Education educationData={education} />
      <FAQ faqData={aboutFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: aboutFaqs.items.map((i) => ({
              "@type": "Question",
              name: i.question,
              acceptedAnswer: { "@type": "Answer", text: i.answer },
            })),
          }),
        }}
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
                name: "Who is MD Hasan Patwary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: aboutDescription,
                },
              },
              {
                "@type": "Question",
                name: "What is your background?",
                acceptedAnswer: { "@type": "Answer", text: education.subtitle },
              },
            ],
          }),
        }}
      />
    </>
  );
}
