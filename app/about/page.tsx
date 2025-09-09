import About from "@/components/about/About";
import Hobby from "@/components/hobby/Hobby";
import Education from "@/components/education/Education";
import { education, about, hobbies } from "@/data";
import PageTitle from "@/components/global/PageTitle";
import { FaUser } from "react-icons/fa";
import type { Metadata } from "next";
import FAQ from "@/components/faq/FAQ";
import { faqs } from "@/data";
import type { FAQsData } from "@/types/data";
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";

const typedMetadata = metadataConfig as MetadataConfig;
const aboutMetadata = typedMetadata.pages.about;

export const metadata: Metadata = {
  title: aboutMetadata.title,
  description: aboutMetadata.description,
  keywords: aboutMetadata.keywords,
  openGraph: {
    title: aboutMetadata.openGraph.title,
    description: aboutMetadata.openGraph.description,
    url: aboutMetadata.alternates?.canonical || "https://patwary.vercel.app/about",
  },
  alternates: aboutMetadata.alternates ? { canonical: aboutMetadata.alternates.canonical } : undefined,
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
          <FaUser className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <About about={about} />
      <Education educationData={education} />
      <Hobby hobbiesData={hobbies} />
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
