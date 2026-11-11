import ContactCTA from "@/src/components/sections/ContactCTA";
import ProjectCard from "@/src/components/sections/ProjectCard";
import Seo from "@/src/components/Seo";
import PageHeader from "@/src/components/ui/PageHeader";
import Reveal from "@/src/components/ui/Reveal";
import { projects } from "@/src/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Seo path="/projets" />
      <PageHeader
        label="projets"
        title="Quatre produits, une même exigence."
        intro="Mobilité, point de vente, réseau social, registre numérique : de la vision produit jusqu'au code."
      />
      <div className="wrap grid gap-3 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.05}>
            <ProjectCard project={p} detailed />
          </Reveal>
        ))}
      </div>
      <ContactCTA />
    </>
  );
}
