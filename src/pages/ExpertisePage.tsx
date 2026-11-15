import PageTransition from "@/src/components/layout/PageTransition";
import SectionDock, { type DockSection } from "@/src/components/layout/SectionDock";
import ContactCTA from "@/src/components/sections/ContactCTA";
import { CapabilitiesGrid, Steps } from "@/src/components/sections/Method";
import Stack from "@/src/components/sections/Stack";
import Seo from "@/src/components/Seo";
import SectionHeading from "@/src/components/ui/SectionHeading";

const sections: DockSection[] = [
  { id: "savoir-faire", label: "Savoir-faire" },
  { id: "methode", label: "Méthode" },
  { id: "outils", label: "Outils" },
];

export default function ExpertisePage() {
  return (
    <PageTransition>
      <Seo
        title="Expertise | Ernest Katumbi — INTCONTROL"
        description="Développement web fullstack, applications mobiles et backends .NET, cadrage et direction technique : savoir-faire, méthode et outils d'Ernest Katumbi (INTCONTROL)."
        path="/expertise"
      />
      <SectionDock sections={sections} />

      <section id="savoir-faire" className="container-x pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="03"
          label="Expertise"
          title={[{ text: "Du besoin au code, " }, { text: "jusqu'en production.", className: "serif-accent text-accent" }]}
          intro="Web, mobile et .NET, cadrage et direction technique : j'interviens sur tout le cycle d'un produit."
        />
        <CapabilitiesGrid className="mt-14 sm:mt-20" />
      </section>

      <section id="methode" className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="03.1"
          label="Méthode"
          title={[{ text: "Quatre étapes, " }, { text: "un même fil.", className: "serif-accent text-accent" }]}
        />
        <Steps className="mt-14 sm:mt-20" />
      </section>

      <section id="outils" className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="03.2"
          label="Outils"
          title={[{ text: "Les outils " }, { text: "du quotidien.", className: "serif-accent text-accent" }]}
          intro="Du code au suivi de projet : le web moderne en JavaScript en tête, .NET quand le projet l'exige."
        />
        <Stack className="mt-14 sm:mt-20" />
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
