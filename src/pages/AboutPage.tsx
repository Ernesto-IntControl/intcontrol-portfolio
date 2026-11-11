import ContactCTA from "@/src/components/sections/ContactCTA";
import SkillsGrid from "@/src/components/sections/SkillsGrid";
import Stats from "@/src/components/sections/Stats";
import Seo from "@/src/components/Seo";
import PageHeader from "@/src/components/ui/PageHeader";
import Section from "@/src/components/ui/Section";
import { experience, profile } from "@/src/data/profile";

export default function AboutPage() {
  return (
    <>
      <Seo path="/a-propos" />
      <PageHeader label="à propos" title={`${profile.name}, alias ${profile.alias}.`} />

      <div className="wrap space-y-4 text-muted">
        <p>
          Je code depuis Kolwezi, en République Démocratique du Congo, avec une conviction : des produits de niveau mondial
          peuvent naître d'ici. Aujourd'hui <strong className="font-medium text-fg">{profile.role}</strong> chez{" "}
          <strong className="font-medium text-accent">{profile.company}</strong>, je pilote la partie technique des produits,
          de l'architecture jusqu'à la qualité du code livré.
        </p>
        <p>
          Mon terrain de jeu, c'est le web moderne en JavaScript : Next.js et React pour les interfaces, Node.js, NestJS et
          GraphQL pour les API, puis Expo, Capacitor ou Flutter pour le mobile. Et quand un projet l'exige, .NET.
        </p>
        <p>
          En tant que <strong className="font-medium text-fg">Product Owner</strong>, je pars toujours d'une question simple :
          quel problème résout-on, et pour qui ? Écouter, prioriser, oser dire non : c'est là que se joue la différence entre
          un projet qui tourne et un produit qu'on aime utiliser.
        </p>
        <div className="pt-2">
          <Stats />
        </div>
      </div>

      <Section label="parcours" title="Expérience">
        <ul className="space-y-3">
          {experience.map((e) => (
            <li key={e.company} className="card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[15px] font-semibold">
                  {e.role} <span className="font-normal text-accent">· {e.company}</span>
                </h3>
                <span className="label">{e.period}</span>
              </div>
              <p className="mt-1.5 text-[13.5px] text-muted">{e.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="compétences" title="Une stack maîtrisée">
        <SkillsGrid />
      </Section>

      <Section label="message" title="À la nouvelle génération">
        <blockquote className="card border-l-2 border-l-accent p-5 text-[15px] leading-relaxed">
          Vous n'avez pas besoin d'attendre la permission pour commencer. Un ordinateur, de la curiosité et de la constance
          suffisent pour bâtir des choses qui comptent. Le futur du numérique s'écrit aussi depuis chez nous, et il a besoin
          de vous.
        </blockquote>
      </Section>

      <ContactCTA />
    </>
  );
}
