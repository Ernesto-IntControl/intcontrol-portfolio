import PageTransition from "@/src/components/layout/PageTransition";
import About from "@/src/components/sections/About";
import ContactCTA from "@/src/components/sections/ContactCTA";
import NextPage from "@/src/components/sections/NextPage";
import Seo from "@/src/components/Seo";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { profile } from "@/src/data/profile";

export default function AboutPage() {
  return (
    <PageTransition>
      <Seo
        title="À propos | Ernest Katumbi — INTCONTROL"
        description={`Le parcours d'${profile.name} (${profile.alias}), développeur fullstack et ${profile.role} chez ${profile.company}, à Kolwezi (RDC).`}
        path="/a-propos"
      />
      <section className="container-x pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="01"
          label="À propos"
          title={[{ text: "Du code solide, " }, { text: "pensé produit.", className: "serif-accent text-accent" }]}
        />
        <About className="mt-14 sm:mt-20" />
      </section>
      <NextPage to="/projets" label="Projets" text="Trois études de cas, des produits en cours et des sites vitrines." />
      <ContactCTA />
    </PageTransition>
  );
}
