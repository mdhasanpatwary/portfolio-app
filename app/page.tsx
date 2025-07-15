import Banner from "@/components/banner/Banner";
import Skills from "@/components/skills/Skills";
import ProfessionalExperience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Testimonials from "@/components/testimonial/Testimonial";
import Education from "@/components/education/Education";
import Hobby from "@/components/hobby/Hobby";
import Blog from "@/components/blog/Blog";
import FunFact from "@/components/funfact/Funfact";
import Services from "@/components/services/Services";
import {
  education,
  projects,
  banner,
  skills,
  experiences,
  services,
  funFacts,
  hobbies,
  testimonials,
} from "@/data";

export default function Home() {

  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Banner banner={banner} />
      <Skills skills={skills} />
      <ProfessionalExperience experiences={experiences} />

      <Projects projectsData={{ ...projects, items: projects.items.slice(0, 8) }} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />

      <FunFact funFacts={funFacts} />
      <Education educationData={education} />
      <Hobby hobbiesData={hobbies} />
      <Blog />
    </main>
  );
}
