import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ProjectsGallery />
      <About />
      <Contact />
    </main>
  );
}
