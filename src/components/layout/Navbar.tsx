import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoMark from "@/src/components/ui/LogoMark";
import { profile } from "@/src/data/profile";
import { cn } from "@/src/lib/utils";
import ThemeToggle from "./ThemeToggle";

export const navLinks = [
  { name: "Accueil", to: "/" },
  { name: "Projets", to: "/projets" },
  { name: "Services", to: "/services" },
  { name: "À propos", to: "/a-propos" },
];

/** Barre fixe et fine : logo, liens, thème, contact. Sur téléphone, un menu déroulant simple. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
      isActive ? "bg-surface-2 font-medium text-fg" : "text-muted hover:text-fg",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label={`${profile.alias} — accueil`}>
          <LogoMark className="h-6 w-6 text-fg" />
          <span className="font-mono text-[13px] font-semibold tracking-[0.14em]">{profile.alias}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link to="/contact" className="btn-solid hidden md:inline-flex">
            Me contacter
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-fg hover:bg-surface-2 md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="border-t border-line bg-bg md:hidden">
          <div className="wrap flex flex-col gap-1 py-3">
            {[...navLinks, { name: "Contact", to: "/contact" }].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex h-11 items-center rounded-lg px-3 text-[15px]",
                    isActive ? "bg-surface-2 font-medium" : "text-muted active:bg-surface-2",
                  )
                }
              >
                {l.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
