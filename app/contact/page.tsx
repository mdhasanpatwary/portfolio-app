import PageTitle from "@/components/global/PageTitle";
import { FaPaperPlane } from "react-icons/fa";
import { contact } from "@/data";
import Contact from "@/components/contact/Contact";
import type { Metadata } from "next";
import FAQ from "@/components/faq/FAQ";

export const metadata: Metadata = {
  title: "Contact MD Hasan Patwary | Front-End Developer",
  description:
    "Get in touch with MD Hasan Patwary for web development projects, collaboration opportunities, or professional inquiries. Available for remote work and relocation.",
  keywords: [
    "Contact MD Hasan Patwary",
    "Front-End Developer Contact",
    "Web Development Services",
    "Hire Developer",
    "Remote Work",
  ],
  openGraph: {
    title: "Contact MD Hasan Patwary | Front-End Developer",
    description:
      "Get in touch with MD Hasan Patwary for web development projects, collaboration opportunities, or professional inquiries.",
    url: "https://patwary.vercel.app/contact",
  },
  alternates: { canonical: "https://patwary.vercel.app/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageTitle
        title={contact.title}
        subtitle={contact.subtitle}
        icon={
          <FaPaperPlane className="text-indigo-600 dark:text-indigo-400 text-3xl" />
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "contact" }]}
      />
      <Contact contact={contact} />
      <FAQ
        items={[
          {
            question: "How can I contact you?",
            answer: contact.summary,
          },
          {
            question: "Are you available for freelance work?",
            answer: contact.availability,
          },
        ]}
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
