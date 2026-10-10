import { Helmet } from "react-helmet-async";
import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import ServicesGrid from "@/src/components/sections/ServicesGrid";
import SkillsGrid from "@/src/components/sections/SkillsGrid";
import StackMarquee from "@/src/components/sections/StackMarquee";
import SectionHeading from "@/src/components/ui/SectionHeading";

export default function ServicesPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Services | Ernest Katumbi — INTCONTROL</title>
        <meta
          name="description"
          content="Développement web fullstack, backend .NET, bases de données, produit et lead technique : des solutions sur mesure pour vos projets."
        />
      </Helmet>

      <section className="container-x pb-16 pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="03"
          label="Services"
          title={[{ text: "Des solutions " }, { text: "sur mesure.", className: "serif-accent text-accent" }]}
          intro="Chaque projet est unique. J'interviens là où vous en avez besoin : architecture, développement, données ou pilotage produit."
        />
        <ServicesGrid detailed className="mt-16" />
      </section>

      <StackMarquee />

      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          index="04"
          label="Stack"
          title={[{ text: "Les outils " }, { text: "du quotidien.", className: "serif-accent text-accent" }]}
        />
        <div className="mt-14">
          <SkillsGrid />
        </div>
      </section>

      <ContactCTA index="05" />
    </PageTransition>
  );
}
