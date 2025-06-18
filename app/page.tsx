import Banner from "@/components/banner/Banner";
import Skills from "@/components/skills/Skills";
import Experience from "@/components/experiance/Experiance";
import Projects from "@/components/projects/Projects";
import Testimonial from "@/components/testimonial/Testimonial";
import Education from "@/components/education/Education";
import Hobby from "@/components/hobby/Hobby";
import Blog from "@/components/blog/Blog";
import Funfact from "@/components/funfact/Funfact";
import Contact from "@/components/contact/Contact";
import Services from "@/components/services/Services";
import data from "@/data/data.json";
import { GlobalData } from "@/types/data";

export default function Home() {
  const { education } = data as GlobalData;

  return (
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Banner
            name="MD Hasan Patwary"
            title="Front-End Web Developer | 6+ Years Exp. | HTML, CSS, JavaScript, jQuery, React, Next.js, Docker, AWS"
            summary="Passionate about crafting intuitive user interfaces using HTML, CSS, JavaScript, React, and Next.js.
          Experienced in Docker, AWS, and performance optimization. Let's build something amazing."
        />
          <Skills />
          <Experience />

          <Projects />
          <Services />
          <Testimonial />

          <Funfact />
          <Education educationData={education} />
          <Hobby />
          <Blog />

          <Contact />
      </main>
  );
}
