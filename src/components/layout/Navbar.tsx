import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoMark from "@/src/components/ui/LogoMark";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/src/data/profile";
import { useIntro } from "@/src/providers/IntroProvider";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

/**
 * Barre du haut, volontairement minimale : la marque et le thème.
 * La navigation entre les pages vit dans le dock (Dock.tsx), en bas d'écran.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const intro = useIntro();
  // Pendant l'intro, la barre reste à sa place (le logo sert de cible à l'emblème) mais invisible
  const waiting = intro.played ? { y: 0, opacity: 0 } : { y: -90, opacity: 0 };

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev);
  });

  const pill = cn(
    "rounded-full border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
    scrolled ? "border-line bg-bg/70 shadow-[var(--shadow-float)] backdrop-blur-xl" : "border-transparent bg-transparent",
  );

  return (
    <motion.header
      initial={waiting}
      animate={intro.revealed ? { y: hidden ? -110 : 0, opacity: 1 } : waiting}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: hidden ? 0 : 0.1 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5"
    >
      <div className="container-x flex items-center justify-between">
        <Link
          to="/"
          className={cn("group pointer-events-auto flex items-center gap-2.5 py-2 pl-3 pr-4", pill)}
          aria-label={`${profile.alias} — accueil`}
        >
          <span data-intro-logo className="inline-flex" style={intro.done ? undefined : { opacity: 0 }}>
            <LogoMark className="h-7 w-7 text-fg transition-transform duration-700 ease-out-expo group-hover:rotate-[60deg]" />
          </span>
          <span className="font-mono text-[13px] font-semibold tracking-[0.2em] text-fg">{profile.alias}</span>
        </Link>

        <div className={cn("pointer-events-auto p-1", pill)}>
          <ThemeToggle className="border-transparent" />
        </div>
      </div>
    </motion.header>
  );
}
