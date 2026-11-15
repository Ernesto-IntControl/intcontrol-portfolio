import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import HexBullet from "@/src/components/ui/HexBullet";
import Reveal from "@/src/components/ui/Reveal";
import { hats, steps, type Hat, type Side } from "@/src/data/method";
import { cn } from "@/src/lib/utils";

/** Les deux casquettes, côte à côte. */
export function HatsGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2", className)}>
      {hats.map((hat, i) => (
        <HatCard key={hat.side} hat={hat} delay={i * 0.08} />
      ))}
    </div>
  );
}

function SideLabel({ side, className }: { side: Side; className?: string }) {
  return side === "produit" ? (
    <span className={cn("serif-accent text-accent", className)}>produit</span>
  ) : (
    <span className={cn("font-mono uppercase tracking-[0.16em] text-accent", className)}>code</span>
  );
}

function HatCard({ hat, delay }: { hat: Hat; delay: number }) {
  const product = hat.side === "produit";
  return (
    <Reveal delay={delay} y={24} className="group relative overflow-hidden bg-bg-elevated p-7 sm:p-10">
      {/* Grand signe en filigrane : « ? » pour le produit, « { } » pour le code */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-6 right-4 select-none leading-none text-fg/[0.045] transition-transform duration-1000 ease-out-expo group-hover:-translate-y-2 group-hover:-rotate-6",
          product ? "font-serif text-[12rem] italic" : "font-mono text-[9rem] font-medium tracking-[-0.1em]",
        )}
      >
        {product ? "?" : "{ }"}
      </span>

      <p className={product ? "serif-accent text-2xl text-accent" : "font-mono text-xs uppercase tracking-[0.16em] text-accent"}>
        {hat.label}
      </p>
      <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{hat.role}</h3>
      <p className="mt-3 max-w-sm leading-relaxed text-muted">{hat.summary}</p>

      <ul className="relative mt-8 space-y-3 border-t border-line pt-6">
        {hat.items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-start gap-3",
              product ? "font-serif text-xl italic text-fg/90" : "font-mono text-[13px] leading-relaxed text-fg/85",
            )}
          >
            <HexBullet filled={!product} className={product ? "mt-[0.5em]" : "mt-[0.6em]"} />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** Les étapes, reliées par un fil qui se remplit au scroll ; chaque repère s'allume au passage. */
export function Steps({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Fil vertical (téléphone) */}
      <div aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line md:hidden">
        <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY: progress }} />
      </div>
      {/* Fil horizontal (tablette et plus) */}
      <div aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-line md:block">
        <motion.div className="h-full w-full origin-left bg-accent" style={{ scaleX: progress }} />
      </div>

      <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-9 md:pl-0 md:pt-10">
            <Marker progress={progress} at={i / steps.length} />
            <Reveal delay={i * 0.06} y={14}>
              <p className="flex items-center gap-3 text-xs">
                <span className="font-mono text-subtle">0{i + 1}</span>
                <span className="h-px w-4 bg-line-strong" aria-hidden />
                <SideLabel side={step.side} className={step.side === "produit" ? "text-base" : "text-[11px]"} />
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">{step.title}</h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Marker({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const lit = useTransform(progress, [at, at + 0.04], [0, 1]);
  const scale = useTransform(progress, [at, at + 0.04, at + 0.12], [1, 1.35, 1]);
  return (
    <motion.span
      aria-hidden
      className="absolute left-0 top-0 block h-[11px] w-[11px] bg-bg md:top-0"
      style={{ scale }}
    >
      <svg viewBox="0 0 10 10" className="absolute inset-0 h-full w-full text-line-strong">
        <path d="M5 .9 8.6 3v4L5 9.1 1.4 7V3Z" fill="var(--bg)" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <motion.svg viewBox="0 0 10 10" className="absolute inset-0 h-full w-full text-accent" style={{ opacity: lit }}>
        <path d="M5 .9 8.6 3v4L5 9.1 1.4 7V3Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </motion.svg>
    </motion.span>
  );
}
