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
      {/* React 19 place <title> et <meta> dans le <head> */}
      <title>À propos | Ernest Katumbi — INTCONTROL</title>
      <meta
        name="description"
        content={`Le parcours d'${profile.name} (${profile.alias}), ${profile.role} chez ${profile.company} et Product Owner, développeur web et mobile à Kolwezi.`}
      />

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
                  Je suis <span className="font-medium text-fg">{profile.name}</span>, plus connu sous le nom d'
                  <span className="font-medium text-fg">{profile.alias}</span>. Je code depuis Kolwezi, en République
                  Démocratique du Congo, avec une conviction : des produits de niveau mondial peuvent naître d'ici.
                </p>
                <p>
                  Aujourd'hui <span className="font-medium text-fg">{profile.role}</span> chez{" "}
                  <span className="font-medium text-accent">{profile.company}</span>, je pilote la partie technique des produits,
                  de l'architecture jusqu'à la qualité du code livré.
                </p>
                <p>
                  Mon terrain de jeu, c'est le web moderne en JavaScript : <span className="font-medium text-fg">Next.js</span>{" "}
                  et <span className="font-medium text-fg">React</span> pour les interfaces,{" "}
                  <span className="font-medium text-fg">Node.js</span>, <span className="font-medium text-fg">NestJS</span> et{" "}
                  <span className="font-medium text-fg">GraphQL</span> pour les API, puis{" "}
                  <span className="font-medium text-fg">Expo</span>, <span className="font-medium text-fg">Capacitor</span> ou{" "}
                  <span className="font-medium text-fg">Flutter</span> pour le mobile. Et quand un projet l'exige,{" "}
                  <span className="font-medium text-fg">.NET</span>.
                </p>
                <p>
                  Mais le code n'est qu'une partie de l'histoire. En tant que{" "}
                  <span className="font-medium text-fg">Product Owner</span>, je pars toujours d'une question simple :
                  quel problème résout-on, et pour qui ? Écouter, prioriser, oser dire non : c'est là que se joue la
                  différence entre un projet qui tourne et un produit qu'on aime utiliser.
                </p>
              </div>
            </Reveal>

            {/* Message à la nouvelle génération, mis en avant comme une citation */}
            <Reveal delay={0.1}>
              <figure className="panel relative mt-10 overflow-hidden rounded-[28px] p-7 sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)]"
                />
                <p className="eyebrow mb-4 text-accent">À la nouvelle génération</p>
                <blockquote className="relative text-[clamp(1.35rem,3.2vw,2rem)] leading-snug tracking-[-0.02em] text-fg">
                  Vous n'avez pas besoin d'attendre la permission pour commencer. Un ordinateur, de la curiosité et de la
                  constance suffisent pour bâtir des choses qui comptent.{" "}
                  <span className="serif-accent text-accent">Le futur du numérique s'écrit aussi depuis chez nous</span>, et il
                  a besoin de vous.
                </blockquote>
                <figcaption className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  — {profile.name}, {profile.alias}
                </figcaption>
              </figure>
            </Reveal>

            <StatsGrid className="mt-10" />
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
