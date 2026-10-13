import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/src/components/ui/Reveal";
import ScrollWords from "@/src/components/ui/ScrollWords";
import SectionHeading from "@/src/components/ui/SectionHeading";
import ExperienceList from "./ExperienceList";
import PortraitCard from "./PortraitCard";
import StatsGrid from "./StatsGrid";

export default function AboutSection() {
  return (
    <section id="a-propos" className="relative pb-8 pt-24 sm:pb-12 sm:pt-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="À propos"
          title={[{ text: "Du code solide, " }, { text: "pensé produit.", className: "serif-accent text-accent" }]}
        />

        <ScrollWords
          className="mt-14 max-w-5xl text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.18] tracking-[-0.03em] text-fg"
          highlight={["INTCONTROL", "Josar", "Technologie"]}
          text="Je suis Ernest Katumbi, alias INTCONTROL. Lead Software Engineer chez Josar Technologie et Product Owner, je transforme des idées en produits web et mobiles fiables : APIs Node.js et NestJS, interfaces Next.js, apps Expo, et .NET quand le projet l'exige."
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <PortraitCard />
          </Reveal>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <StatsGrid />
            <ExperienceList />
            <Reveal>
              <Link
                to="/a-propos"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg"
                data-cursor="Lire"
              >
                <span className="relative">
                  En savoir plus sur mon parcours
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-fg/30 transition-transform duration-500 ease-out-expo group-hover:scale-x-0" />
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
