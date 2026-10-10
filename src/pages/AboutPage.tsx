import { Helmet } from "react-helmet-async";
import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import ExperienceList from "@/src/components/sections/ExperienceList";
import PortraitCard from "@/src/components/sections/PortraitCard";
import SkillsGrid from "@/src/components/sections/SkillsGrid";
import StatsGrid from "@/src/components/sections/StatsGrid";
import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { profile } from "@/src/data/profile";

export default function AboutPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>À propos | Ernest Katumbi — INTCONTROL</title>
        <meta
          name="description"
          content={`Le parcours d'${profile.name} (${profile.alias}), ${profile.role} chez ${profile.company} et fondateur d'${profile.venture.name}.`}
        />
      </Helmet>

      <section className="container-x pb-20 pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="01"
          label="À propos"
          title={[{ text: "Ernest Katumbi, " }, { text: "alias INTCONTROL.", className: "serif-accent text-accent" }]}
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
            <PortraitCard />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
                <p>
                  Je suis <span className="font-medium text-fg">{profile.name}</span>, développeur logiciel basé à Kolwezi, en
                  République Démocratique du Congo. On me connaît aussi sous le nom d'
                  <span className="font-medium text-fg">{profile.alias}</span>.
                </p>
                <p>
                  Aujourd'hui <span className="font-medium text-fg">{profile.role}</span> chez{" "}
                  <span className="font-medium text-accent">{profile.company}</span>, je pilote la partie technique des produits,
                  de l'architecture jusqu'à la qualité du code livré.
                </p>
                <p>
                  Spécialisé dans l'écosystème <span className="font-medium text-fg">.NET</span> et les technologies web
                  modernes comme <span className="font-medium text-fg">React</span> et{" "}
                  <span className="font-medium text-fg">Next.js</span>, je conçois des applications qui allient performance
                  backend et élégance frontend. Sur Madebocar, je porte aussi la casquette de Product Owner.
                </p>
                <p>
                  En parallèle, j'ai fondé <span className="font-medium text-fg">{profile.venture.name}</span>, une agence de
                  services digitaux qui accompagne des entreprises locales et internationales.
                </p>
              </div>
            </Reveal>

            <StatsGrid className="mt-12" />
            <ExperienceList className="mt-6" />
          </div>
        </div>
      </section>

      <section className="container-x pb-12 pt-12 sm:pt-20">
        <SectionHeading
          index="02"
          label="Compétences"
          title={[{ text: "Une stack " }, { text: "maîtrisée.", className: "serif-accent text-accent" }]}
        />
        <div className="mt-14">
          <SkillsGrid />
        </div>
      </section>

      <ContactCTA index="03" />
    </PageTransition>
  );
}
