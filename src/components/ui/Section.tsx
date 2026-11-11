import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/** Bloc de page avec un titre à la ligne et un lien optionnel à droite. */
export default function Section({
  id,
  label,
  title,
  more,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  more?: { to: string; text: string };
  children: ReactNode;
}) {
  return (
    <section id={id} className="wrap pt-14 sm:pt-16">
      <Reveal>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="label mb-1.5">{label}</p>
            <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          </div>
          {more && (
            <Link to={more.to} className="group inline-flex shrink-0 items-center gap-1 text-[13px] text-muted transition-colors hover:text-fg">
              {more.text}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
