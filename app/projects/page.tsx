"use client";

import Projects from "@/components/projects/Projects";
import { projects } from "@/data";

export default function ProjectsPage() {
  return <Projects projectsData={projects} showAll={true} />;
}
