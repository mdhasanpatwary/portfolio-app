import { cssTips } from "@/data";
import { CssTips } from "@/components";
import PageTitle from "@/components/global/PageTitle";
import { FaCode } from "react-icons/fa";

export default function CssTipsPage() {
  return (
    <>
      <PageTitle
        title="CSS Tips & Tricks"
        subtitle="Discover modern CSS techniques and best practices to enhance your web development skills."
        icon={<FaCode className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "CSS Tips" }
        ]}
      />
      <CssTips tips={cssTips} />
    </>
  );
}