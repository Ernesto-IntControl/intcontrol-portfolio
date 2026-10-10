import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Magnetic from "@/src/components/ui/Magnetic";
import { profile, socials } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { useScrollTo } from "@/src/providers/SmoothScroll";

const nav = [
  { name: "Accueil", to: "/" },
  { name: "À propos", to: "/a-propos" },
  { name: "Services", to: "/services" },
  { name: "Projets", to: "/projets" },
  { name: "Contact", to: "/contact" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const time = useLocalTime(profile.timeZone);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // Le grand logotype remonte et se dévoile à mesure qu'on atteint le bas de page
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-bg-elevated pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">Prochaine étape</p>
            <h2 className="text-4xl font-semibold leading-[1.02] sm:text-5xl">
              Construisons quelque chose <span className="serif-accent text-accent">d'exceptionnel.</span>
            </h2>
            <div className="mt-8">
              <Magnetic>
                <Link to="/contact" className="btn-primary" data-cursor="Go">
                  Démarrer un projet
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:pl-10">
            <div>
              <p className="eyebrow mb-5">Navigation</p>
              <ul className="space-y-3">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Réseaux</p>
              <ul className="space-y-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                      <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-5">Contact</p>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-fg">
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a href={profile.phoneHref} className="transition-colors hover:text-fg">
                    {profile.phone}
                  </a>
                </li>
                <li>{profile.location}</li>
                <li className="font-mono text-xs">
                  {time} · heure locale
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="container-x relative mt-16 select-none sm:mt-24" aria-hidden>
        <p className="bg-linear-to-b from-fg/20 to-fg/0 bg-clip-text pb-[0.04em] text-center text-[14.6vw] font-semibold leading-[0.8] tracking-[-0.065em] text-transparent 2xl:text-[13rem]">
          {profile.alias}
        </p>
      </motion.div>

      <div className="container-x relative flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          © {new Date().getFullYear()} {profile.name} — {profile.alias}
        </p>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        >
          Retour en haut
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            <ArrowUp className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </footer>
  );
}
