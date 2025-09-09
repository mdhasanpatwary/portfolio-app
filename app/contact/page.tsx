import PageTitle from "@/components/global/PageTitle";
import { FaPaperPlane } from "react-icons/fa";
import { contact } from "@/data";
import Contact from "@/components/contact/Contact";
import type { Metadata } from "next";
import FAQ from "@/components/faq/FAQ";
import { faqs } from "@/data";
import type { FAQsData } from "@/types/data";
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";

const typedMetadata = metadataConfig as MetadataConfig;
const contactMetadata = typedMetadata.pages.contact;

export const metadata: Metadata = {
  title: contactMetadata.title,
  description: contactMetadata.description,
  keywords: contactMetadata.keywords,
  openGraph: {
    title: contactMetadata.openGraph.title,
    description: contactMetadata.openGraph.description,
    url: contactMetadata.alternates?.canonical || "https://patwary.vercel.app/contact",
  },
  alternates: contactMetadata.alternates ? { canonical: contactMetadata.alternates.canonical } : undefined,
};

export default function ContactPage() {
  const contactFaqs: FAQsData = {
    title: faqs.title,
    subtitle: faqs.subtitle,
    items: faqs.items.filter((i) =>
      ["contact", "email", "phone", "freelance", "available"].some((k) =>
        (i.question + i.answer).toLowerCase().includes(k)
      )
    ),
  };
  return (
    <>
      <PageTitle
        title={contact.title}
        subtitle={contact.subtitle}
        icon={
          <FaPaperPlane className="text-primary-600 dark:text-primary-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "contact" }]}
      />
      <Contact contact={contact} />
      <FAQ faqData={contactFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: contactFaqs.items.map((i) => ({
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
            "@type": "Person",
            "@id": "https://patwary.vercel.app/#person",
            name: "MD Hasan Patwary",
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: contact.email,
                telephone: contact.phone,
                contactType: "sales",
                areaServed: "Worldwide",
                availableLanguage: ["en"],
              },
            ],
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
                name: "How can I contact you?",
                acceptedAnswer: { "@type": "Answer", text: contact.summary },
              },
              {
                "@type": "Question",
                name: "Are you available for freelance work?",
                acceptedAnswer: { "@type": "Answer", text: contact.availability },
              },
            ],
          }),
        }}
      />
    </>
  );
}
