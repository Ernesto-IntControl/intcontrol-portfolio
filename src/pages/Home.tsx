import { Helmet } from "react-helmet-async";
import PageTransition from "@/src/components/layout/PageTransition";
import AboutSection from "@/src/components/sections/AboutSection";
import ContactCTA from "@/src/components/sections/ContactCTA";
import Hero from "@/src/components/sections/Hero";
import ProjectsSection from "@/src/components/sections/ProjectsSection";
import ServicesSection from "@/src/components/sections/ServicesSection";
import StackMarquee from "@/src/components/sections/StackMarquee";
import { profile } from "@/src/data/profile";

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>{`${profile.name} — ${profile.alias} | ${profile.role}`}</title>
        <meta
          name="description"
          content={`${profile.name} (${profile.alias}), ${profile.role} chez ${profile.company}. Développement fullstack C# .NET & Next.js.`}
        />
      </Helmet>
      <Hero />
      <StackMarquee />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactCTA />
    </PageTransition>
  );
}
