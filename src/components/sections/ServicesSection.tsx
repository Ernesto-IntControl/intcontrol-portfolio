import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import ServicesGrid from "./ServicesGrid";

export default function ServicesSection() {
  return (
    <section id="services" className="relative pb-8 pt-16 sm:pb-12 sm:pt-24">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            label="Expertise"
            title={[{ text: "Ce que je " }, { text: "construis.", className: "serif-accent text-accent" }]}
            intro="Du web au mobile, jusqu'à la vision produit : je couvre toute la chaîne pour livrer des applications fiables et agréables à utiliser."
          />
          <Reveal>
            <Link to="/services" className="btn-ghost group">
              Tous les services
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <ServicesGrid className="mt-14" />
      </div>
    </section>
  );
}
