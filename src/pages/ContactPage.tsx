import PageTransition from "@/src/components/layout/PageTransition";
import Contact from "@/src/components/sections/Contact";
import Seo from "@/src/components/Seo";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { profile } from "@/src/data/profile";

export default function ContactPage() {
  return (
    <PageTransition>
      <Seo
        title="Contact | Ernest Katumbi — INTCONTROL"
        description={`Contactez ${profile.name} (${profile.alias}) pour un projet web ou mobile : cadrage produit, architecture et développement.`}
        path="/contact"
      />
      <section className="container-x pb-8 pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="04"
          label="Contact"
          title={[{ text: "Parlons de " }, { text: "votre projet.", className: "serif-accent text-accent" }]}
          intro="Décrivez-moi votre besoin en quelques lignes : le problème à résoudre, pour qui, et pour quand. Je vous réponds rapidement."
        />
        <div className="mt-14 sm:mt-20">
          <Contact />
        </div>
      </section>
    </PageTransition>
  );
}
