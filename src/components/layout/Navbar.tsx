import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoMark from "@/src/components/ui/LogoMark";
import Magnetic from "@/src/components/ui/Magnetic";
import ThemeToggle from "./ThemeToggle";
import { profile, socials } from "@/src/data/profile";
import { useLenis } from "@/src/providers/SmoothScroll";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

const links = [
  { name: "Accueil", to: "/" },
  { name: "À propos", to: "/a-propos" },
  { name: "Services", to: "/services" },
  { name: "Projets", to: "/projets" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const location = useLocation();
  const lenis = useLenis();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev && !open);
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));
  const indicator = hovered ?? links.find((l) => isActive(l.to))?.to ?? null;

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: hidden ? 0 : 0.1 }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5"
      >
        <div className="container-x">
          <nav
            aria-label="Navigation principale"
            className={cn(
              "flex items-center justify-between rounded-full border py-2 pl-4 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
              scrolled || open
                ? "border-line bg-bg/70 shadow-[var(--shadow-float)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <Link to="/" className="group flex items-center gap-2.5" aria-label={`${profile.alias} — accueil`}>
              <LogoMark className="h-7 w-7 text-fg transition-transform duration-700 ease-out-expo group-hover:rotate-[60deg]" />
              <span className="font-mono text-[13px] font-semibold tracking-[0.2em] text-fg">{profile.alias}</span>
            </Link>

            <ul className="relative hidden items-center gap-1 md:flex" onPointerLeave={() => setHovered(null)}>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onPointerEnter={() => setHovered(link.to)}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive(link.to) ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {indicator === link.to && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07] ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                      />
                    )}
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden md:block">
                <Magnetic strength={0.25}>
                  <Link to="/contact" className="btn-primary !px-5 !py-2.5">
                    Contact
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
              >
                <motion.span
                  className="absolute h-[1.5px] w-4 rounded bg-fg"
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                />
                <motion.span
                  className="absolute h-[1.5px] w-4 rounded bg-fg"
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-bg/70 md:hidden"
            aria-hidden
          />
        )}
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0 round 28px)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 28px)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 28px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT_QUART }}
            className="fixed inset-2 z-40 flex flex-col overflow-hidden rounded-[28px] border border-line bg-bg shadow-[var(--shadow-float)] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="absolute inset-0 bg-grid opacity-60 mask-radial" aria-hidden />
            <nav className="container-x relative flex flex-1 flex-col justify-center gap-1 pt-24">
              {[...links, { name: "Contact", to: "/contact" }].map((link, i) => (
                <div key={link.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE_OUT_EXPO }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <span
                        className={cn(
                          "text-5xl font-semibold tracking-tight transition-colors",
                          isActive(link.to) ? "text-fg" : "text-muted group-hover:text-fg",
                        )}
                      >
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE_OUT_EXPO }}
              className="container-x relative flex items-end justify-between gap-4 pb-10"
            >
              <a href={`mailto:${profile.email}`} className="text-sm text-muted underline-offset-4 hover:underline">
                {profile.email}
              </a>
              <div className="flex gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
