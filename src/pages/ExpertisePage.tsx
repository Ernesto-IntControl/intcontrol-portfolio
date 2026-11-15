import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import { HatsGrid, Steps } from "@/src/components/sections/Method";
import Stack from "@/src/components/sections/Stack";
import Seo from "@/src/components/Seo";
import SectionHeading from "@/src/components/ui/SectionHeading";

export default function ExpertisePage() {
  return (
    <PageTransition>
      <Seo
        title="Expertise | Ernest Katumbi — INTCONTROL"
        description="Product Owner et Lead Software Engineer : vision produit, backlog et priorisation, puis architecture et développement web, mobile et .NET. Méthode et outils au quotidien."
        path="/expertise"
      />

      <section className="container-x pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="02"
          label="Expertise"
          title={[{ text: "Deux casquettes, " }, { text: "un seul produit.", className: "serif-accent text-accent" }]}
          intro="Product Owner, je décide quoi construire et pourquoi. Ingénieur logiciel, je le construis et je le fais tenir. Porter les deux, c'est réduire la distance entre l'idée et le code."
        />
        <HatsGrid className="mt-14 sm:mt-20" />
      </section>

      <section className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="02.1"
          label="Méthode"
          title={[{ text: "De la question " }, { text: "à la mise en production.", className: "serif-accent text-accent" }]}
        />
        <Steps className="mt-14 sm:mt-20" />
      </section>

      <section className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="02.2"
          label="Outils"
          title={[{ text: "Les outils " }, { text: "du quotidien.", className: "serif-accent text-accent" }]}
          intro="Du code au pilotage de projet : le web moderne en JavaScript en tête, .NET quand le projet l'exige."
        />
        <Stack className="mt-14 sm:mt-20" />
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
