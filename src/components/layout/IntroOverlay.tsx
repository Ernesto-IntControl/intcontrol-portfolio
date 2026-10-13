import { animate, motion, type Transition } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile } from "@/src/data/profile";
import { useFinePointer } from "@/src/hooks/useMediaQuery";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/src/lib/motion";
import type { IntroPhase } from "@/src/providers/IntroProvider";

const EASE_IN_EXPO = [0.7, 0, 0.84, 0] as const;
const EASE_DRAW = [0.65, 0, 0.35, 1] as const;

const LETTERS = profile.alias.split("");
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_";

const HEX = "M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25L16 2.5Z";
const CORE = "M21.2 11.4 16 8.4l-5.2 3v9.2l5.2 3 5.2-3";

type Box = { top: number; left: number; size: number };
type Flight = { x: number; y: number; scale: number };

/**
 * Overlay de l'intro. Uniquement transform, opacity et tracés SVG :
 * l'animation reste fluide même sur un téléphone modeste.
 */
export default function IntroOverlay({ phase, onSkip }: { phase: IntroPhase; onSkip: () => void }) {
  const exiting = phase === "exit";
  const fine = useFinePointer();
  const slotRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState<Box | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);

  // L'emblème vit au-dessus des rideaux : on le pose sur l'emplacement réservé dans la colonne centrale
  useLayoutEffect(() => {
    if (exiting) return;
    const measure = () => {
      const rect = slotRef.current?.getBoundingClientRect();
      if (rect) setSlot({ top: rect.top, left: rect.left, size: rect.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [exiting]);

  // Sortie : l'emblème vole jusqu'au logo de la navigation (technique FLIP)
  useLayoutEffect(() => {
    const el = emblemRef.current;
    if (!exiting || !el) return;
    const from = el.getBoundingClientRect();
    const size = el.offsetWidth; // taille sans transformation, même si l'intro a été passée en cours d'entrée
    const cx = from.left + from.width / 2;
    const cy = from.top + from.height / 2;
    const target = document.querySelector("[data-intro-logo]")?.getBoundingClientRect();
    if (!target?.width) {
      setFlight({ x: 0, y: -(cy + size), scale: 0.4 });
      return;
    }
    setFlight({
      x: target.left + target.width / 2 - cx,
      y: target.top + target.height / 2 - cy,
      scale: target.width / size,
    });
  }, [exiting]);

  const curtain = (delay: number): Transition => ({ duration: 1, delay, ease: EASE_IN_OUT_QUART });
  const chrome = exiting
    ? { opacity: 0, transition: { duration: 0.3 } }
    : { opacity: 1, transition: { duration: 0.8, delay: 0.25 } };

  return (
    <div aria-hidden onClick={onSkip} data-cursor="Passer" className="fixed inset-0 z-[95] select-none">
      {/* Rideau à deux couches : l'accent suit le panneau principal avec un léger retard */}
      <motion.div className="absolute inset-0 bg-accent" animate={{ y: exiting ? "-100%" : "0%" }} transition={curtain(0.47)} />
      <motion.div
        className="absolute inset-0 overflow-hidden bg-bg"
        animate={{ y: exiting ? "-100%" : "0%" }}
        transition={curtain(0.35)}
      >
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_16%,transparent),transparent)]"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE_OUT_EXPO }}
        />

        {/* Détails éditoriaux dans les coins */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={chrome}
          className="absolute inset-x-0 top-0 flex justify-between p-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:p-8 sm:text-[11px]"
        >
          <span>Portfolio — {new Date().getFullYear()}</span>
          <span>Kolwezi · RDC</span>
        </motion.div>

        {/* Colonne centrale : emplacement de l'emblème, INTCONTROL, sous-titre */}
        <div className="@container absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 sm:px-8">
          <div ref={slotRef} className="mx-auto mb-[clamp(1.25rem,4vw,2.25rem)] aspect-square w-[clamp(52px,9vw,80px)]" />
          {/* Les lettres montent d'un masque en se resserrant, puis s'envolent */}
          <div className="flex justify-center pb-[0.06em] text-[length:min(15cqi,10.5rem)] font-semibold leading-[0.8] tracking-[-0.065em] text-fg [overflow-x:visible] [overflow-y:clip]">
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                initial={{ y: "110%", x: `${(i - (LETTERS.length - 1) / 2) * 0.22}em` }}
                animate={
                  exiting
                    ? // x reste explicite : une valeur absente de la cible reviendrait à sa valeur initiale
                      { y: "-115%", x: "0em", transition: { duration: 0.6, delay: i * 0.03, ease: EASE_IN_EXPO } }
                    : { y: "0%", x: "0em", transition: { duration: 1.25, delay: 0.5 + i * 0.045, ease: EASE_OUT_EXPO } }
                }
              >
                {char}
              </motion.span>
            ))}
          </div>
          {/* Nom et rôle : sur une ligne à partir de la tablette, empilés sur téléphone */}
          <motion.div
            animate={exiting ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 flex flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted sm:mt-7 sm:flex-row sm:justify-center sm:gap-[1em] sm:text-xs"
          >
            <Decode text={profile.name.toUpperCase()} delay={1050} />
            <Decode text="—" delay={1050} className="hidden sm:block" />
            <Decode text={profile.role.toUpperCase()} delay={1200} />
          </motion.div>
        </div>

        {/* Compteur et progression */}
        <motion.div initial={{ opacity: 0 }} animate={chrome} className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px]">Chargement</p>
              <Counter className="block text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-fg tabular-nums" />
            </div>
            <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle sm:text-[11px]">
              {fine ? "Cliquer pour passer" : "Toucher pour passer"}
            </span>
          </div>
          <div className="mt-4 h-px w-full bg-line">
            <motion.div
              className="h-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, delay: 0.1, ease: EASE_DRAW }}
            />
          </div>
        </motion.div>
      </motion.div>

      {slot && (
        <motion.div
          ref={emblemRef}
          className="fixed text-fg will-change-transform"
          style={{ top: slot.top, left: slot.left, width: slot.size, height: slot.size }}
          initial={{ scale: 0.86, opacity: 0 }}
          animate={flight ? { x: flight.x, y: flight.y, scale: flight.scale, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={flight ? { duration: 1.05, delay: 0.25, ease: EASE_IN_OUT_QUART } : { duration: 1, ease: EASE_OUT_EXPO }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="h-full w-full overflow-visible">
            {/* Le fond plein (à la sortie seulement) garde le « C » lisible quand l'emblème
                croise la bande d'accent du rideau ; une fois posé, il se confond avec la page */}
            <motion.path
              d={HEX}
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ fill: "var(--bg)" }}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: exiting ? 1 : 0 }}
              transition={{ duration: 1.05, delay: 0.05, ease: EASE_DRAW, fillOpacity: { duration: 0.3 } }}
            />
            <motion.path
              d={CORE}
              strokeWidth="2.4"
              strokeLinecap="square"
              strokeLinejoin="round"
              style={{ stroke: "var(--accent)" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE_DRAW }}
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

/** Compteur 000 → 100, écrit directement dans le DOM (aucun rendu React par image). */
function Counter({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.9,
      delay: 0.1,
      ease: EASE_DRAW,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
    });
    return () => controls.stop();
  }, []);
  return (
    <span ref={ref} className={className}>
      000
    </span>
  );
}

/** Texte qui se « décode » : les caractères défilent puis se fixent de gauche à droite. */
function Decode({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const duration = 800;
    let start = 0;
    let last = 0;
    let frame = 0;

    const tick = (now: number) => {
      if (!start) start = now + delay;
      if (now >= start && now - last > 45) {
        last = now;
        const progress = Math.min((now - start) / duration, 1);
        const settled = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          out += i < settled || ch === " " || ch === "—" ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        el.style.opacity = "1";
        if (progress >= 1) return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay]);

  return (
    <span ref={ref} className={className ?? "block"} style={{ opacity: 0 }}>
      {text}
    </span>
  );
}
