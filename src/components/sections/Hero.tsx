import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";

const stack = ["next.js", "nestjs", "expo", ".net"];

/** Accueil : présentation courte à gauche, petit terminal à droite (la touche tech et fun). */
export default function Hero() {
  const time = useLocalTime(profile.timeZone);

  return (
    <section className="wrap grid items-center gap-8 pb-4 pt-12 sm:pt-16 md:grid-cols-[1.15fr_1fr] md:gap-10">
      <div>
        <p className="chip mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {profile.availability} · {time}
        </p>
        <h1 className="text-[2rem] font-semibold leading-[1.1] sm:text-[2.5rem]">
          Salut, je suis Ernest.
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
          {profile.role} chez {profile.company} et Product Owner. Je conçois des produits web et mobiles fiables, de l'API
          NestJS au front Next.js et aux apps Expo.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link to="/projets" className="btn-solid">
            Voir mes projets <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/contact" className="btn">
            Me contacter
          </Link>
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-[13px] text-subtle">
          <MapPin className="h-3.5 w-3.5" /> {profile.location}
        </p>
      </div>

      <div className="card overflow-hidden font-mono text-[12px] leading-6" aria-hidden>
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-subtle">~/intcontrol</span>
        </div>
        <div className="space-y-0.5 p-3.5">
          <p>
            <span className="text-accent">$</span> whoami
          </p>
          <p className="text-muted">ernest · lead software engineer</p>
          <p className="pt-1.5">
            <span className="text-accent">$</span> stack --now
          </p>
          <p className="flex flex-wrap gap-1.5 text-muted">
            {stack.map((s) => (
              <span key={s} className="rounded bg-accent-soft px-1.5 text-accent">
                {s}
              </span>
            ))}
          </p>
          <p className="pt-1.5">
            <span className="text-accent">$</span> coffee --level
          </p>
          <p className="text-muted">
            <span className="text-fun">████████░░</span> 82 %
          </p>
          <p className="pt-1.5">
            <span className="text-accent">$</span> <span className="caret" />
          </p>
        </div>
      </div>
    </section>
  );
}
