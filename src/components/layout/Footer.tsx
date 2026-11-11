import { Link } from "react-router-dom";
import SocialLink from "@/src/components/ui/SocialLink";
import { profile, socials } from "@/src/data/profile";
import { navLinks } from "./Navbar";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="wrap flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[13px] font-semibold tracking-[0.14em]">{profile.alias}</p>
          <p className="mt-1.5 max-w-xs text-[13px] text-muted">
            {profile.role}, {profile.location}.
          </p>
          <a href={`mailto:${profile.email}`} className="link mt-3 inline-block text-[13px]">
            {profile.email}
          </a>
        </div>

        <div className="flex gap-10 text-[13px]">
          <ul className="space-y-1.5">
            {[...navLinks, { name: "Contact", to: "/contact" }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted transition-colors hover:text-fg">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-1.5">
            {socials.map((s) => (
              <li key={s.label}>
                <SocialLink social={s} className="text-muted transition-colors hover:text-fg">
                  {s.label}
                </SocialLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-4 font-mono text-[11px] text-subtle">
          © {new Date().getFullYear()} {profile.name} · construit avec du café et du TypeScript
        </p>
      </div>
    </footer>
  );
}
