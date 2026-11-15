import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/src/components/layout/PageTransition";
import SectionDock, { type DockSection } from "@/src/components/layout/SectionDock";
import { Counter } from "@/src/components/sections/About";
import ContactCTA from "@/src/components/sections/ContactCTA";
import Hero from "@/src/components/sections/Hero";
import { CapabilitiesGrid } from "@/src/components/sections/Method";
import ProjectCard from "@/src/components/sections/ProjectCard";
import Seo from "@/src/components/Seo";
import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { profile, stats } from "@/src/data/profile";
import { ongoing, projects } from "@/src/data/projects";

const sections: DockSection[] = [
  { id: "a-propos", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
];

/** Lien vers la page détaillée d'une section. */
function MoreLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="btn-ghost group">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
    </Link>
  );
}

/** L'accueil : chaque section en bref, le détail sur la page concernée. */
export default function Home() {
  const facts = [
    { label: "Poste", value: `${profile.role} · ${profile.company}` },
    { label: "Stack", value: "Next.js · NestJS · Expo · .NET" },
    { label: "Basé à", value: "Kolwezi, RDC" },
  ];

  return (
    <PageTransition>
      <Seo
        title={`${profile.name} — ${profile.alias} | Développeur fullstack & ${profile.role}`}
        description={`${profile.name} (${profile.alias}), développeur fullstack et ${profile.role} chez ${profile.company}. Des produits web et mobiles pensés pour leurs utilisateurs et construits pour durer : Next.js, NestJS, Expo, .NET.`}
      />
      <Hero />
      <SectionDock sections={sections} />

      {/* À propos, en bref */}
      <section id="a-propos" className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="01"
          label="À propos"
          title={[{ text: "Du code solide, " }, { text: "pensé produit.", className: "serif-accent text-accent" }]}
        />
        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="text-xl leading-snug tracking-[-0.02em] text-fg/90 sm:text-[1.65rem]">
              Je suis {profile.name}, alias {profile.alias}. Développeur fullstack et {profile.role} chez{" "}
              {profile.company}, je conçois des produits web et mobiles depuis Kolwezi, avec une conviction :{" "}
              <span className="serif-accent text-accent">des produits de niveau mondial peuvent naître d'ici.</span>
            </p>
            <div className="mt-9">
              <MoreLink to="/a-propos">Mon parcours</MoreLink>
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <dl className="divide-y divide-line border-y border-line text-sm">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="text-right text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.12 + i * 0.06}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter stat={stat} className="!text-3xl sm:!text-4xl" />
                    <span className="mt-1 block text-xs text-muted">{stat.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Projets, en bref */}
      <section id="projets" className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="02"
          label="Projets"
          title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
          intro="Trois études de cas, de la vision produit jusqu'au code, et d'autres produits en cours."
        />
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} total={projects.length} to={`/projets/${project.slug}`} />
          ))}
        </div>
        <Reveal className="mt-14 flex flex-col gap-6 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="eyebrow">Aussi en cours</span>
            {ongoing.map((item) => (
              <span key={item.name} className="inline-flex items-center gap-2 text-fg">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400" />
                {item.name}
              </span>
            ))}
          </p>
          <MoreLink to="/projets">Tous les projets</MoreLink>
        </Reveal>
      </section>

      {/* Expertise, en bref */}
      <section id="expertise" className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="03"
          label="Expertise"
          title={[{ text: "Du besoin au code, " }, { text: "jusqu'en production.", className: "serif-accent text-accent" }]}
          intro="Web, mobile et .NET, cadrage et direction technique : j'interviens sur tout le cycle d'un produit."
        />
        <CapabilitiesGrid compact className="mt-12 sm:mt-16" />
        <Reveal className="mt-10 flex justify-end">
          <MoreLink to="/expertise">Méthode et outils</MoreLink>
        </Reveal>
      </section>

      {/* Contact, en bref */}
      <ContactCTA id="contact" />
    </PageTransition>
  );
}
