"use client";

import Projects from "@/components/projects/Projects";
import data from "@/data/data.json";
import { GlobalData } from "@/types/data";

export default function ProjectsPage() {
  const { projects } = data as any;
  return <Projects projectsData={projects} showAll={true} />;
}
