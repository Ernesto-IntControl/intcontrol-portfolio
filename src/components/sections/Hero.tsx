import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import HexField from "@/src/components/ui/HexField";
import HeroIllustration from "./HeroIllustration";
import Scramble from "@/src/components/ui/Scramble";
import { profile } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { EASE_DRAW, EASE_OUT_EXPO } from "@/src/lib/motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
});

/** Écart entre l'apparition de deux mots du titre. */
const STEP = 0.055;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const time = useLocalTime(profile.timeZone);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HexField
        delay={900}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,black_20%,transparent_75%)]"
      />

      <div className="container-x relative z-10 grid flex-1 gap-10 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ y: contentY }} className="self-center pb-4 lg:col-span-7 lg:pb-16">
          <p className="eyebrow flex items-center gap-3">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            <Scramble trigger="mount" delay={150} text={`${profile.name} — ${profile.alias}`} />
          </p>

          <h1 className="mt-7 text-[clamp(2.3rem,4.3vw,4.15rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
            <span className="sr-only">Des produits pensés pour vos utilisateurs, construits pour durer.</span>
            <span aria-hidden>
              <Word delay={0.2}>Des</Word> <Word delay={0.2 + STEP}>produits</Word> <Thought delay={0.2 + STEP * 2} />{" "}
              <Word delay={0.2 + STEP * 3}>pour</Word> <Word delay={0.2 + STEP * 4}>vos</Word>{" "}
              <Word delay={0.2 + STEP * 5}>utilisateurs,</Word> <Built delay={0.2 + STEP * 6} />{" "}
              <Word delay={0.2 + STEP * 7}>pour</Word> <Word delay={0.2 + STEP * 8}>
                durer<span className="text-accent">.</span>
              </Word>
            </span>
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            <span className="text-fg">Développeur fullstack</span> et <span className="text-fg">{profile.role}</span> chez{" "}
            {profile.company}. Je conçois et je livre des produits web et mobiles, du cadrage à la mise en production.
          </motion.p>

          <motion.div {...fadeUp(0.9)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/projets" className="btn-primary group">
              Voir mes projets
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
            </Link>
            <Link to="/contact" className="btn-ghost group bg-bg/40 backdrop-blur">
              Me contacter
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: illustrationY }}
          className="hero-illustration-wrap relative h-[min(60svh,460px)] self-end sm:h-[min(64svh,560px)] lg:col-span-5 lg:h-[min(78svh,740px)]"
        >
          <HeroIllustration className="h-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="container-x relative z-20 -mt-px bg-bg pb-5"
      >
        <div className="flex items-center justify-between gap-4 whitespace-nowrap border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          <span>
            Kolwezi, RDC <span className="text-subtle">·</span> {time}
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: window.innerHeight - 64, behavior: "smooth" })}
            className="hidden min-h-10 items-center gap-3 uppercase transition-colors hover:text-fg sm:flex"
          >
            Défiler
            <span className="relative block h-6 w-px overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-x-0 top-0 h-2 bg-fg"
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: EASE_OUT_EXPO }}
              />
            </span>
          </button>
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

/** « construits » : le côté code, en mono, plus léger que le reste du titre. */
function Built({ delay }: { delay: number }) {
  return (
    <Word delay={delay}>
      <span className="mono-accent text-[0.84em] font-light text-fg/90">construits</span>
    </Word>
  );
}
