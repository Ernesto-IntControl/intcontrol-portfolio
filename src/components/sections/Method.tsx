import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import HexBullet from "@/src/components/ui/HexBullet";
import Reveal from "@/src/components/ui/Reveal";
import { capabilities, steps } from "@/src/data/method";
import { cn } from "@/src/lib/utils";

/**
 * Savoir-faire, en grille ; `compact` (accueil) : titre et phrase seulement.
 * Au survol, un filet d'accent se trace en haut de la carte.
 */
export function CapabilitiesGrid({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {capabilities.map((item, i) => (
        <Reveal key={item.title} delay={(i % 3) * 0.06} y={20} className="group relative bg-bg-elevated p-7 sm:p-8">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
          <p className="flex items-center gap-3 font-mono text-xs text-subtle">
            <HexBullet className="transition-transform duration-700 ease-out-expo group-hover:rotate-90" filled={i % 2 === 1} />
            0{i + 1}
          </p>
          <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
          {!compact && (
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {item.items.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
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
              <p className="font-mono text-xs text-subtle">0{i + 1}</p>
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
