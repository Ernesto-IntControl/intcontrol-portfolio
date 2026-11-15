import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import LogoMark from "@/src/components/ui/LogoMark";
import SocialLink from "@/src/components/ui/SocialLink";
import { profile, socials } from "@/src/data/profile";
import { projects } from "@/src/data/projects";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { navLinks } from "./navLinks";

const linkClass = "inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-fg";

export default function Footer() {
  const time = useLocalTime(profile.timeZone);

  return (
    <footer className="relative mt-16 border-t border-line">
      <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        {/* Identité */}
        <div className="lg:col-span-5">
          <Link to="/" className="group inline-flex items-center gap-3" aria-label={`${profile.alias} — accueil`}>
            <LogoMark className="h-8 w-8 text-fg transition-transform duration-700 ease-out-expo group-hover:rotate-[60deg]" />
            <span className="font-mono text-sm font-semibold tracking-[0.2em] text-fg">{profile.alias}</span>
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">
            {profile.name}, Product Owner et {profile.role}. J'accompagne les produits web et mobiles, de la vision au
            déploiement.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {profile.availability}
            </span>
            <Link to="/contact" className="group inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-fg">
              <span className="link-underline pb-0.5">Démarrer un projet</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Liens */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          <nav aria-label="Pied de page">
            <p className="eyebrow mb-4">Navigation</p>
            <ul>
              <li>
                <Link to="/" className={linkClass}>
                  Accueil
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-4">Projets</p>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link to={`/projets/${project.slug}`} className={linkClass}>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="eyebrow mb-4">Contact</p>
            <ul>
              <li>
                <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className={linkClass}>
                  {profile.phone}
                </a>
              </li>
              <li className="flex min-h-9 items-center text-sm text-muted">{profile.location}</li>
              <li className="flex min-h-9 items-center font-mono text-xs text-subtle">{time} · heure locale</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} {profile.name} ({profile.alias}). Tous droits réservés.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <SocialLink
                  key={social.label}
                  social={social}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
                >
                  <Icon className="h-4 w-4" />
                </SocialLink>
              );
            })}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Retour en haut"
              className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
