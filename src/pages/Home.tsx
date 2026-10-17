import PageTransition from "@/src/components/layout/PageTransition";
import AboutSection from "@/src/components/sections/AboutSection";
import ContactCTA from "@/src/components/sections/ContactCTA";
import Hero from "@/src/components/sections/Hero";
import ProjectsSection from "@/src/components/sections/ProjectsSection";
import ServicesSection from "@/src/components/sections/ServicesSection";
import StackMarquee from "@/src/components/sections/StackMarquee";
import Seo from "@/src/components/Seo";
import { profile } from "@/src/data/profile";

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title={`${profile.name} — ${profile.alias} | ${profile.role}`}
        description={`${profile.name} (${profile.alias}), ${profile.role} chez ${profile.company}. Développement web et mobile : Next.js, NestJS, Node.js, Expo et .NET.`}
      />
      <Hero />
      <StackMarquee />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactCTA />
    </PageTransition>
  );
}
