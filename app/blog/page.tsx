import PageTitle from "@/components/global/PageTitle";
import { FaPenNib } from "react-icons/fa";
import BlogList from "./BlogList";

export default function BlogPage() {
  return (
    <>
      <PageTitle
        title="Latest Blog Posts"
        subtitle="Explore all my articles, tutorials, and insights."
        icon={<FaPenNib className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog" }
        ]}
      />
      <BlogList />
    </>
  );
}
