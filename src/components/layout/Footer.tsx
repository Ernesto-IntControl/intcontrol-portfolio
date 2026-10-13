import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import FooterWordmark from "./FooterWordmark";
import Magnetic from "@/src/components/ui/Magnetic";
import SocialLink from "@/src/components/ui/SocialLink";
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
  const time = useLocalTime(profile.timeZone);
  const scrollTo = useScrollTo();

  return (
    <footer className="relative pb-4 pt-8 sm:pb-6">
      <div className="container-x">
        <div className="panel relative overflow-hidden rounded-[28px] px-6 pt-14 sm:rounded-[40px] sm:px-10 sm:pt-20 lg:px-14">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

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
                <ul className="space-y-0.5">
                  {nav.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-fg">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-5">Réseaux</p>
                <ul className="space-y-0.5">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <li key={social.label}>
                        <SocialLink
                          social={social}
                          className="group inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {social.label}
                          <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </SocialLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="eyebrow mb-5">Contact</p>
                <ul className="space-y-0.5 text-sm text-muted">
                  <li>
                    <a href={`mailto:${profile.email}`} className="inline-flex min-h-10 items-center break-all transition-colors hover:text-fg">
                      {profile.email}
                    </a>
                  </li>
                  <li>
                    <a href={profile.phoneHref} className="inline-flex min-h-10 items-center transition-colors hover:text-fg">
                      {profile.phone}
                    </a>
                  </li>
                  <li className="flex min-h-10 items-center">{profile.location}</li>
                  <li className="flex min-h-10 items-center font-mono text-xs">{time} · heure locale</li>
                </ul>
              </div>
            </div>
          </div>

          <FooterWordmark className="mt-16 sm:mt-24" />

          <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
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
        </div>
      </div>
    </footer>
  );
}
