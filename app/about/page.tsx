import About from "@/components/about/About";
import Education from "@/components/education/Education";
import { education } from "@/data";
import PageTitle from "@/components/global/PageTitle";
import { FaUser } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <PageTitle
        title="About Me"
        subtitle="Learn more about my background, skills, and education."
        icon={<FaUser className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About" }
        ]}
      />
      <About />
      <Education educationData={education} />
    </>
  );
}