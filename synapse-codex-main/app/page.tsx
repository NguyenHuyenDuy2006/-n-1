import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProblemsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <SolutionsSection />
        <ServicesSection />
        <ProcessSection />
        <ProblemsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
