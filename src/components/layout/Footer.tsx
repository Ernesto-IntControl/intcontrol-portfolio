import { ArrowUp } from "lucide-react";
import FooterWordmark from "./FooterWordmark";
import SocialLink from "@/src/components/ui/SocialLink";
import { profile, socials } from "@/src/data/profile";

export default function Footer() {
  return (
    <footer className="relative pb-6 pt-10">
      <div className="container-x">
        <FooterWordmark />

        <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            © {new Date().getFullYear()} {profile.name} — {profile.alias}
          </p>

          <p className="text-sm text-muted">
            <span className="serif-accent text-base text-fg">Pensé produit</span>,{" "}
            <span className="font-mono text-[13px] text-fg">codé</span> à Kolwezi.
          </p>

          <div className="flex items-center gap-1.5">
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
            <a
              href="/#top"
              aria-label="Retour en haut"
              className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
