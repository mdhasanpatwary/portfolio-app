import PageTitle from "@/components/global/PageTitle";
import { FaPaperPlane } from "react-icons/fa";
import { contact } from "@/data";
import Contact from "@/components/contact/Contact";

export default function ContactPage() {
  return (
    <>
      <PageTitle
        title={contact.title}
        subtitle={contact.subtitle}
        icon={<FaPaperPlane className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "contact" }
        ]}
      />
      <Contact contact={contact} />
    </>
  );
}