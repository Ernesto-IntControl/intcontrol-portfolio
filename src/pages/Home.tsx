import ContactCTA from "@/src/components/sections/ContactCTA";
import Hero from "@/src/components/sections/Hero";
import ProjectCard from "@/src/components/sections/ProjectCard";
import ServicesGrid from "@/src/components/sections/ServicesGrid";
import Stats from "@/src/components/sections/Stats";
import Seo from "@/src/components/Seo";
import Reveal from "@/src/components/ui/Reveal";
import Section from "@/src/components/ui/Section";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";
import { marqueeStack } from "@/src/data/skills";
import { techIcons } from "@/src/lib/techIcons";

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />

      <div className="wrap pt-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {marqueeStack.map((t) => {
            const Icon = techIcons[t];
            return (
              <li key={t} className="chip">
                {Icon && <Icon className="h-3 w-3" />}
                {t}
              </li>
            );
          })}
        </ul>
      </div>

      <Section id="projets" label="01 · projets" title="Ce sur quoi je travaille" more={{ to: "/projets", text: "Tous les projets" }}>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="02 · services" title="Comment je peux aider" more={{ to: "/services", text: "Voir le détail" }}>
        <ServicesGrid />
      </Section>

      <Section label="03 · à propos" title="Du code solide, pensé produit" more={{ to: "/a-propos", text: "Mon parcours" }}>
        <Reveal>
          <p className="max-w-xl text-muted">
            Je suis {profile.name}, alias {profile.alias}. {profile.role} chez {profile.company} et Product Owner, je transforme
            des idées en produits web et mobiles fiables : APIs Node.js et NestJS, interfaces Next.js, apps Expo, et .NET quand
            le projet l'exige.
          </p>
          <div className="mt-5">
            <Stats />
          </div>
        </Reveal>
      </Section>

      <ContactCTA />
    </>
  );
}
