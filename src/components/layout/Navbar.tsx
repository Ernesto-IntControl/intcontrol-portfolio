import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoMark from "@/src/components/ui/LogoMark";
import SocialLink from "@/src/components/ui/SocialLink";
import { profile, socials } from "@/src/data/profile";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";
import { navLinks } from "./navLinks";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 200 && y > prev && !open);
  });

  // Nouvelle page : menu fermé, barre visible
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-line bg-bg/75 backdrop-blur-xl" : "border-transparent",
        )}
      >
        <nav aria-label="Navigation principale" className="container-x flex h-16 items-center justify-between sm:h-[72px]">
          <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.alias} — accueil`}>
            <LogoMark draw className="h-7 w-7 text-fg transition-transform duration-700 ease-out-expo group-hover:rotate-[60deg]" />
            <span className="leading-tight">
              <span className="block font-mono text-[13px] font-semibold tracking-[0.2em] text-fg">{profile.alias}</span>
              <span className="hidden font-mono text-[10px] tracking-[0.08em] text-subtle sm:block">Fullstack · Lead Software Engineer</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-10 items-center px-4 text-sm transition-colors duration-300",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {link.name}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
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
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT_QUART }}
            className="fixed inset-0 z-40 flex flex-col bg-bg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav className="container-x flex flex-1 flex-col justify-center gap-1 pt-20">
              {navLinks.map((link, i) => (
                <div key={link.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, delay: 0.12 + i * 0.05, ease: EASE_OUT_EXPO }}
                  >
                    <Link to={link.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <span
                        className={cn(
                          "text-5xl font-semibold tracking-tight",
                          isActive(link.to) ? "text-fg" : "text-muted",
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
              className="container-x flex flex-col gap-4 pb-8"
            >
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center text-sm text-muted">
                {profile.email}
              </a>
              <div className="flex gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <SocialLink
                      key={social.label}
                      social={social}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg"
                    >
                      <Icon className="h-4 w-4" />
                    </SocialLink>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
