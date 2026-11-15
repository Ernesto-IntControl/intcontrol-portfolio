import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import ProjectRow from "@/src/components/sections/ProjectRow";
import Seo from "@/src/components/Seo";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { projects } from "@/src/data/projects";

export default function ProjectsPage() {
  return (
    <PageTransition>
      <Seo
        title="Projets | Ernest Katumbi — INTCONTROL"
        description="Madebocar, JOSMA (Josar Management), Ngo Chat : les produits web et mobiles d'Ernest Katumbi (INTCONTROL), Product Owner et Lead Software Engineer."
        path="/projets"
      />
      <section className="container-x pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="01"
          label="Projets"
          title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
          intro="Mobilité, gestion commerciale, réseau social : trois produits, une même exigence, de la vision produit jusqu'au code."
        />
        <div className="mt-14 sm:mt-20">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} total={projects.length} variant="full" />
          ))}
        </div>
      </section>
      <ContactCTA />
    </PageTransition>
  );
}
