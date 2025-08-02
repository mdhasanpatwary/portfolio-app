import PageTitle from "@/components/global/PageTitle";
import { FaPaperPlane } from "react-icons/fa";
import { contact } from "@/data";
import Contact from "@/components/contact/Contact";
import type { Metadata } from "next";

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
    </>
  );
}
