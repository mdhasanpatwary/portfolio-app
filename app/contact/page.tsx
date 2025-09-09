import PageTitle from "@/components/global/PageTitle";
import { FaPaperPlane } from "react-icons/fa";
import { contact } from "@/data";
import Contact from "@/components/contact/Contact";
import type { Metadata } from "next";
import FAQ from "@/components/faq/FAQ";
import { faqs } from "@/data";
import type { FAQsData } from "@/types/data";
import { generateMetadata as createMetadata, getPageMetadata, getGlobalMetadata } from "@/utils/metadata";

export const metadata: Metadata = createMetadata(getPageMetadata("contact"));

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
  const globalConfig = getGlobalMetadata();
  
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
            "@id": `${globalConfig.domain}/#person`,
            name: globalConfig.author,
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
