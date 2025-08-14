import PageTitle from "@/components/global/PageTitle";
import { FaSearch } from "react-icons/fa";
import { projects, cssTips } from "@/data";
import SearchClient from "./search-client";

export const metadata = {
  title: "Search | MD Hasan Patwary Portfolio",
  description: "Search content across projects, tips, and more on MD Hasan Patwary's portfolio.",
  alternates: { canonical: "https://patwary.vercel.app/search" },
};

export default function SearchPage() {
  return (
    <main>
      <PageTitle
        title="Search"
        subtitle="Quickly find projects and tips."
        icon={<FaSearch className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <SearchClient
        projects={projects.items}
        tips={((cssTips as unknown) as { items?: Array<{ title?: string; description?: string }> }).items || []}
      />
    </main>
  );
}


