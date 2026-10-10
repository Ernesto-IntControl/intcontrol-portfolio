import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import ProjectShowcase from "./ProjectShowcase";

export default function ProjectsSection() {
  return (
    <section id="projets" className="relative pt-16 sm:pt-24">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            label="Projets"
            title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
            intro="Les produits sur lesquels je travaille en ce moment, de la vision produit jusqu'au code."
          />
          <Reveal>
            <Link to="/projets" className="btn-ghost group">
              Tous les projets
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <ProjectShowcase />
      </div>
    </section>
  );
}
