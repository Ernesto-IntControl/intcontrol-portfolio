import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import HexField from "@/src/components/ui/HexField";
import Reveal from "@/src/components/ui/Reveal";
import RevealText from "@/src/components/ui/RevealText";
import { profile } from "@/src/data/profile";

/** Bandeau de fin de page : la prochaine étape, vers le contact. */
export default function ContactCTA({ id }: { id?: string }) {
  return (
    <section id={id} className="container-x pb-8 pt-24 sm:pt-32">
      <div className="panel relative isolate overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
        <HexField
          delay={0}
          className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_85%_50%,black_10%,transparent_75%)]"
        />
        <Reveal>
          <p className="eyebrow">Prochaine étape</p>
        </Reveal>
        <RevealText
          as="h2"
          text={[{ text: "Un produit à lancer ou " }, { text: "à faire grandir ?", className: "serif-accent text-accent" }]}
          className="mt-5 max-w-3xl text-[clamp(2.1rem,4.8vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
        />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Du cadrage à la mise en production, parlons de votre besoin. Je vous réponds rapidement.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="btn-primary group">
            Démarrer un projet
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a href={`mailto:${profile.email}`} className="btn-ghost group bg-bg/40 backdrop-blur">
            <Mail className="h-4 w-4 text-muted transition-colors group-hover:text-fg" />
            {profile.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
