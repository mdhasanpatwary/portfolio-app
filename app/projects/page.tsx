import PageTitle from "@/components/global/PageTitle";
import { FaFolderOpen } from "react-icons/fa";
import { projects } from "@/data";
import ProjectsList from "./ProjectsList";

export default function ProjectsPage() {
  return (
    <>
      <PageTitle
        title={projects.title}
        subtitle={projects.subtitle}
        icon={<FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: projects.title }
        ]}
      />
      <ProjectsList />
    </>
  );
}
