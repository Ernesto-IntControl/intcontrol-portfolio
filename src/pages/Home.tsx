import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import Hero from "@/src/components/sections/Hero";
import { HatsGrid } from "@/src/components/sections/Method";
import ProjectRow from "@/src/components/sections/ProjectRow";
import Seo from "@/src/components/Seo";
import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";

function MoreLink({ to, children }: { to: string; children: string }) {
  return (
    <Reveal className="mt-10 flex justify-end">
      <Link to={to} className="btn-ghost group">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
      </Link>
    </Reveal>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title={`${profile.name} — ${profile.alias} | Product Owner & ${profile.role}`}
        description={`${profile.name} (${profile.alias}), Product Owner et ${profile.role} chez ${profile.company}. Des produits web et mobiles pensés pour leurs utilisateurs et construits pour durer : Next.js, NestJS, Expo, .NET.`}
      />
      <Hero />

      <section className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="01"
          label="Projets"
          title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
          intro="Les produits sur lesquels je travaille en ce moment, de la vision produit jusqu'au code."
        />
        <div className="mt-14 sm:mt-20">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </section>

      <section className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="02"
          label="Expertise"
          title={[{ text: "Deux casquettes, " }, { text: "un seul produit.", className: "serif-accent text-accent" }]}
          intro="Product Owner, je décide quoi construire et pourquoi. Ingénieur logiciel, je le construis et je le fais tenir en production."
        />
        <HatsGrid className="mt-14 sm:mt-20" />
        <MoreLink to="/expertise">Méthode et outils</MoreLink>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
