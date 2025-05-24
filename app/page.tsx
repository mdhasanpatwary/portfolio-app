import Banner from "@/components/banner/Banner";
import Skills from "@/components/skills/Skills";
import About from "@/components/about/About";
import Experience from "@/components/experiance/Experiance";
import Projects from "@/components/projects/Projects";
import Testimonial from "@/components/testimonial/Testimonial";
import Education from "@/components/education/Education";
import Hobby from "@/components/hobby/Hobby";
import Blog from "@/components/blog/Blog";
import Funfact from "@/components/funfact/Funfact";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Banner
            name="Donald Trump Champion"
            title="Front-End Developer • 6+ Years Experience • Based in Dhaka"
            summary="Passionate about crafting intuitive user interfaces using HTML, CSS, JavaScript, React, and Next.js.
          Experienced in Docker, AWS, and performance optimization. Let's build something amazing."
        />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonial />
        <Education />
        <Hobby />
          <Blog />
          <Funfact />
        <Contact />
      </main>
  );
}
