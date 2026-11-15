import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import HexField from "@/src/components/ui/HexField";
import Scramble from "@/src/components/ui/Scramble";
import { profile } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { EASE_DRAW, EASE_OUT_EXPO } from "@/src/lib/motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
});

export default function Hero() {
  const time = useLocalTime(profile.timeZone);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HexField
        delay={700}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_35%,black_20%,transparent_75%)]"
      />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-14 pt-32 sm:pt-36">
        <p className="eyebrow flex items-center gap-3">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <Scramble trigger="mount" delay={150} text={`${profile.name} — ${profile.alias}`} />
        </p>

        <h1 className="mt-7 text-[clamp(2.6rem,8.6vw,7.75rem)] font-semibold leading-[1] tracking-[-0.055em]">
          <span className="sr-only">Je pense le produit. J'écris le code.</span>
          <span aria-hidden className="block">
            <Word delay={0.2}>Je</Word> <Word delay={0.26}>pense</Word> <Word delay={0.32}>le</Word>{" "}
            <ProductWord delay={0.38} />
          </span>
          <span aria-hidden className="block">
            <Word delay={0.5}>J'écris</Word> <Word delay={0.56}>le</Word>{" "}
            <Word delay={0.62}>
              <TypedCode delay={1} />
            </Word>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <motion.div {...fadeUp(0.85)} className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              <span className="text-fg">{profile.role}</span> chez {profile.company} et{" "}
              <span className="text-fg">Product Owner</span>, je transforme des idées en produits web et mobiles
              ultra-fluides : de la première user story à la mise en production.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projets" className="btn-primary group">
                Voir les projets
                <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="btn-ghost group">
                Me contacter
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          <motion.dl {...fadeUp(1)} className="divide-y divide-line border-y border-line text-sm lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <Row label={<span className="serif-accent text-base normal-case tracking-normal text-accent">Côté produit</span>}>
              <span className="text-fg">Product Owner</span> <span className="text-muted">· Madebocar</span>
            </Row>
            <Row label={<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Côté code</span>}>
              <span className="text-fg">{profile.role}</span> <span className="text-muted">· {profile.company}</span>
            </Row>
            <Row label={<span className="eyebrow">Stack</span>}>
              <span className="font-mono text-[13px] text-muted">Next.js · NestJS · Expo · .NET</span>
            </Row>
          </motion.dl>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="container-x relative z-10 pb-5"
      >
        <div className="flex items-center justify-between gap-4 whitespace-nowrap border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          <span>
            {profile.location.split(",")[0]}, RDC <span className="text-subtle">·</span> {time}
          </span>
          <a href="#projets" className="hidden min-h-10 items-center gap-3 transition-colors hover:text-fg sm:flex">
            Défiler
            <span className="relative block h-6 w-px overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-x-0 top-0 h-2 bg-fg"
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: EASE_OUT_EXPO }}
              />
            </span>
          </a>
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

/** « produit. » en serif italique, souligné d'un trait tracé à la main ; le survol le redessine. */
function ProductWord({ delay }: { delay: number }) {
  const [run, setRun] = useState(0);
  return (
    <span className="relative inline-block" onPointerEnter={() => setRun((r) => r + 1)}>
      <Word delay={delay}>
        <span className="serif-accent pr-[0.03em] text-accent">produit.</span>
      </Word>
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.02em] left-[1%] h-[0.15em] w-[84%] overflow-visible text-accent"
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
          transition={{ duration: run ? 0.7 : 0.9, delay: run ? 0 : delay + 0.6, ease: EASE_DRAW }}
        />
      </svg>
    </span>
  );
}

/** « code » tapé lettre à lettre en mono, suivi d'un curseur ; le survol l'efface puis le retape. */
function TypedCode({ delay }: { delay: number }) {
  const word = "code";
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? word.length : 0);
  const [run, setRun] = useState(0);
  const [typing, setTyping] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    // Premier passage : on tape. Ensuite : on efface, puis on retape.
    const script = run === 0 ? [1, 2, 3, 4] : [3, 2, 1, 0, 1, 2, 3, 4];
    let step = 0;
    let interval = 0;
    setTyping(true);
    const timeout = window.setTimeout(
      () => {
        interval = window.setInterval(() => {
          setCount(script[step]);
          step += 1;
          if (step >= script.length) {
            window.clearInterval(interval);
            setTyping(false);
          }
        }, 95);
      },
      run === 0 ? delay * 1000 : 0,
    );
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [run, delay, reduce]);

  return (
    <span className="mono-accent text-[0.9em]" onPointerEnter={() => !typing && setRun((r) => r + 1)}>
      {word.slice(0, count)}
      <span className="caret" style={typing ? { animation: "none" } : undefined} />
    </span>
  );
}

function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5">
      <dt className="shrink-0">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
