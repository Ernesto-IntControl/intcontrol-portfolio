import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/src/components/ui/Reveal";

/** Lien de fin de page vers la page suivante, dans l'ordre de la navigation. */
export default function NextPage({ to, label, text }: { to: string; label: string; text: string }) {
  return (
    <section className="container-x pt-24 sm:pt-32">
      <Reveal>
        <Link to={to} className="group block border-y border-line py-10 sm:py-14">
          <p className="eyebrow">Page suivante</p>
          <div className="mt-4 flex items-center justify-between gap-6">
            <span className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] transition-[color,transform] duration-700 ease-out-expo group-hover:translate-x-2 group-hover:text-accent">
              {label}
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-fg group-hover:text-bg sm:h-20 sm:w-20">
              <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
            </span>
          </div>
          <p className="mt-3 max-w-xl text-muted">{text}</p>
        </Link>
      </Reveal>
    </section>
  );
}
