import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import Scramble from "@/src/components/ui/Scramble";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

/** Le croquis se dessine, puis la couleur l'encre : temps total avant l'état « en production » (ms). */
const INKED_AT = 2900;

/** Une image en deux formats (AVIF puis WebP), sans texte alternatif : l'illustration est décorative. */
function Layer({ name, className }: { name: string; className?: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/images/hero/${name}.avif`} />
      <img src={`/images/hero/${name}.webp`} alt="" decoding="async" draggable={false} className={className} />
    </picture>
  );
}

/**
 * Illustration du hero : « pensés » puis « construits ».
 * 1. le croquis au crayon se dessine de haut en bas ;
 * 2. la version en couleur l'encre de bas en haut ;
 * 3. la couronne se pose, puis flotte au-dessus de la tête.
 * Au survol, une loupe montre le croquis sous la couleur ; un clic (ou un toucher)
 * fait basculer toute l'illustration entre croquis et couleur, en cercle depuis le point touché.
 * Formes, tuiles et carte de code suivent la souris à des profondeurs différentes.
 */
export default function HeroIllustration({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inked, setInked] = useState(false);
  const [lens, setLens] = useState(false);
  const [sketch, setSketch] = useState(false);
  const [fine] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  // Parallaxe : chaque calque se déplace selon sa profondeur
  const mx = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setInked(true), reduce ? 0 : INKED_AT);
    if (!fine || reduce) return () => window.clearTimeout(id);
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine, mx, my]);

  const place = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--lx", `${e.clientX - r.left}px`);
    el.style.setProperty("--ly", `${e.clientY - r.top}px`);
  };

  const showingSketch = sketch || lens || !inked;
  const label = !inked ? "esquisse.fig" : showingSketch ? "esquisse · v0.1" : "en production · v1.0";

  return (
    <div className={cn("relative select-none", className)}>
      {/* Formes du décor (en arrière-plan, comme sur la maquette) */}
      <Depth x={mx} y={my} depth={-14} className="pointer-events-none absolute inset-0">
        <span className="hero-blob absolute left-[8%] top-[16%] h-[72%] w-[86%]" />
        <span className="hero-blob hero-blob-b absolute -right-[6%] bottom-[2%] h-[44%] w-[46%]" />
        <span className="absolute left-[2%] top-[34%] h-[18%] w-[22%] bg-[radial-gradient(var(--dot)_1.4px,transparent_1.6px)] [background-size:14px_14px] opacity-80" />
        <span className="absolute right-[0%] top-[8%] h-[16%] w-[24%] bg-[radial-gradient(var(--dot)_1.4px,transparent_1.6px)] [background-size:14px_14px] opacity-80" />
      </Depth>

      <Depth x={mx} y={my} depth={26} className="pointer-events-none absolute inset-0">
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 2.2, ease: EASE_OUT_EXPO }}
          className="hero-tile float-a absolute left-[10%] top-[38%] h-9 w-9 rounded-[10px]"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 2.35, ease: EASE_OUT_EXPO }}
          className="hero-tile float-b absolute left-[17%] top-[58%] h-6 w-6 rounded-[7px] opacity-60"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 2.5, ease: EASE_OUT_EXPO }}
          className="hero-tile float-b absolute right-[6%] top-[30%] h-5 w-5 rounded-[6px] opacity-70"
        />
      </Depth>

      {/* Carte de code flottante (l'ordinateur de la maquette) */}
      <Depth x={mx} y={my} depth={40} className="pointer-events-none absolute right-[-4%] top-[44%] z-20 w-[34%] max-w-[190px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6, ease: EASE_OUT_EXPO }}
          className="float-a rounded-2xl border border-line bg-bg-elevated/80 p-3 shadow-[var(--shadow-float)] backdrop-blur-md"
        >
          <div className="flex items-center gap-1" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="mt-2.5 font-mono text-lg font-medium leading-none text-accent">&lt;/&gt;</p>
          <div className="mt-2.5 space-y-1.5" aria-hidden>
            <span className="block h-1 w-[85%] rounded-full bg-fg/15" />
            <span className="block h-1 w-[60%] rounded-full bg-accent/50" />
            <span className="block h-1 w-[72%] rounded-full bg-fg/15" />
          </div>
        </motion.div>
      </Depth>

      {/* Le personnage : croquis dessous, couleur dessus */}
      <Depth x={mx} y={my} depth={10} className="relative z-10 h-full">
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          aria-pressed={sketch}
          aria-label={
            sketch
              ? "Illustration d'Ernest Katumbi en croquis : afficher la version en couleur"
              : "Illustration d'Ernest Katumbi, en costume, qui pointe du doigt : afficher le croquis"
          }
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            // Au clavier, la bascule part du centre de l'illustration
            ref.current?.style.setProperty("--lx", "50%");
            ref.current?.style.setProperty("--ly", "45%");
            setLens(false);
            setSketch((s) => !s);
          }}
          onPointerEnter={(e) => {
            if (e.pointerType !== "mouse" || !inked) return;
            place(e);
            setLens(true);
          }}
          onPointerMove={(e) => e.pointerType === "mouse" && place(e)}
          onPointerLeave={() => setLens(false)}
          onClick={(e) => {
            place(e as unknown as ReactPointerEvent<HTMLDivElement>);
            setLens(false);
            setSketch((s) => !s);
          }}
          className={cn(
            "hero-figure relative mx-auto aspect-[540/748] h-full cursor-pointer",
            lens && "is-lens",
            sketch && "is-sketch",
          )}
        >
          {/* Deux groupes superposés, chacun avec sa couronne (calque à part qui flotte) :
              les masques s'appliquent au groupe entier, couronne comprise */}
          <div className="hero-draw absolute inset-0">
            <Layer name="body-sketch" className="absolute inset-0 h-full w-full" />
            <div className="hero-crown absolute left-[33.7%] top-[0.4%] w-[27.4%]">
              <Layer name="crown-sketch" className="block h-auto w-full" />
            </div>
          </div>
          <div className="hero-ink absolute inset-0">
            <Layer name="body-color" className="absolute inset-0 h-full w-full" />
            <div className="hero-crown absolute left-[33.7%] top-[0.4%] w-[27.4%]">
              <Layer name="crown-color" className="block h-auto w-full" />
            </div>
          </div>

          {/* Anneau de la loupe */}
          <span aria-hidden className="hero-lens-ring pointer-events-none absolute rounded-full border border-accent/70" />
        </div>
      </Depth>

      {/* Étiquette d'état : esquisse ou en production */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
        className="absolute bottom-[14%] left-[2%] z-20"
      >
        <span className="chip !bg-bg-elevated/85 shadow-[var(--shadow-float)] backdrop-blur-md">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors duration-500",
              showingSketch ? "bg-amber-400" : "pulse-dot bg-emerald-500",
            )}
          />
          <Scramble trigger="mount" text={label} />
        </span>
      </motion.div>
    </div>
  );
}

/** Calque qui suit la souris : plus `depth` est grand, plus il bouge (négatif : sens inverse). */
function Depth({
  x,
  y,
  depth,
  className,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
}) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth * 0.6);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}
