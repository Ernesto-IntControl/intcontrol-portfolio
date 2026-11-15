import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import HexField from "@/src/components/ui/HexField";
import Scramble from "@/src/components/ui/Scramble";
import { profile } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { EASE_DRAW, EASE_OUT_EXPO } from "@/src/lib/motion";
import HeroFlow from "./HeroFlow";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
});

/** Mots du titre, avec leur délai d'apparition. */
const LINE = 0.055;

export default function Hero() {
  const time = useLocalTime(profile.timeZone);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HexField
        delay={700}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,black_20%,transparent_75%)]"
      />

      <div className="container-x relative z-10 grid flex-1 items-center gap-14 pb-14 pt-32 sm:pt-36 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            <Scramble trigger="mount" delay={150} text={`${profile.name} — ${profile.alias}`} />
          </p>

          <h1 className="mt-7 text-[clamp(2.3rem,4.7vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
            <span className="sr-only">Des produits pensés pour vos utilisateurs, construits pour durer.</span>
            <span aria-hidden>
              <Word delay={0.2}>Des</Word> <Word delay={0.2 + LINE}>produits</Word> <Thought delay={0.2 + LINE * 2} />{" "}
              <Word delay={0.2 + LINE * 3}>pour</Word> <Word delay={0.2 + LINE * 4}>vos</Word>{" "}
              <Word delay={0.2 + LINE * 5}>utilisateurs,</Word> <Built delay={0.2 + LINE * 6} />{" "}
              <Word delay={0.2 + LINE * 7}>pour</Word> <Word delay={0.2 + LINE * 8}>durer.</Word>
            </span>
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            <span className="text-fg">Product Owner</span> et <span className="text-fg">{profile.role}</span> chez{" "}
            {profile.company}, j'accompagne les produits web et mobiles de la vision au déploiement : cadrage,
            priorisation, architecture et développement.
          </motion.p>

          <motion.div {...fadeUp(0.9)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/projets" className="btn-primary group">
              Voir mes projets
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
            </Link>
            <Link to="/contact" className="btn-ghost group">
              Me contacter
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: EASE_OUT_EXPO }}
          className="lg:col-span-5"
        >
          <HeroFlow className="mx-auto max-w-[520px] lg:ml-auto lg:mr-0" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="container-x relative z-10 pb-5"
      >
        <div className="flex items-center justify-between gap-4 whitespace-nowrap border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          <span>
            Kolwezi, RDC <span className="text-subtle">·</span> {time}
          </span>
          <span className="hidden sm:inline">Web · Mobile · .NET</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {profile.availability}
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/** Mot qui monte d'un masque. */
function Word({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** « pensés » : le côté produit, en serif italique, souligné d'un trait tracé ; le survol le redessine. */
function Thought({ delay }: { delay: number }) {
  const [run, setRun] = useState(0);
  return (
    <span className="relative inline-block" onPointerEnter={() => setRun((r) => r + 1)}>
      <Word delay={delay}>
        <span className="serif-accent pr-[0.04em] text-accent">pensés</span>
      </Word>
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.04em] left-0 h-[0.16em] w-[96%] overflow-visible text-accent"
        aria-hidden
      >
        <motion.path
          key={run}
          d="M4 16 C 70 7, 170 3, 296 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: run ? 0.7 : 0.9, delay: run ? 0 : delay + 0.7, ease: EASE_DRAW }}
        />
      </svg>
    </span>
  );
}

/** « construits » : le côté code, en mono, posé sur un fond de code inline qui se déploie. */
function Built({ delay }: { delay: number }) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        className="absolute -inset-x-[0.1em] inset-y-[0.14em] origin-left rounded-[0.14em] border border-line bg-surface-strong/70"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.55, ease: EASE_OUT_EXPO }}
      />
      <span className="relative">
        <Word delay={delay}>
          <span className="mono-accent text-[0.78em] text-fg">construits</span>
        </Word>
      </span>
    </span>
  );
}
