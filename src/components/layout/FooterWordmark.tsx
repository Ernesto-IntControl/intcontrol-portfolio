import { motion, stagger, useAnimate, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/src/data/profile";
import { useFinePointer } from "@/src/hooks/useMediaQuery";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

const rise: Variants = {
  hidden: { y: "70%", rotateX: -85, opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.06, ease: EASE_OUT_EXPO },
  }),
};

const fill: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({ opacity: 1, transition: { duration: 0.9, delay: 0.55 + i * 0.06, ease: "easeOut" } }),
};

/**
 * Logotype INTCONTROL de fin de page :
 * 1. les lettres se dressent une à une quand il entre à l'écran, d'abord en contour puis remplies ;
 * 2. une vague parcourt ensuite le mot à intervalle régulier tant qu'il reste visible ;
 * 3. à la souris, chaque lettre se soulève et passe à la couleur d'accent.
 * Tout passe par transform et opacity, pour rester fluide même sur un appareil modeste.
 */
export default function FooterWordmark({ className }: { className?: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { amount: 0.4 });
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [revealed, setRevealed] = useState(false);
  const letters = profile.alias.split("");

  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

  // Vague périodique, seulement quand le logotype est visible
  useEffect(() => {
    if (!revealed || !inView || reduce) return;
    const wave = () =>
      animate(
        "[data-wave]",
        { y: ["0%", "-9%", "0%"] },
        { duration: 1.1, delay: stagger(0.06), ease: [0.45, 0, 0.55, 1] },
      );
    const first = window.setTimeout(wave, 2000);
    const loop = window.setInterval(wave, 6500);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
    };
  }, [revealed, inView, reduce, animate]);

  return (
    <div ref={scope} className={cn("@container select-none", className)} aria-hidden>
      <motion.div
        className="flex justify-center font-semibold leading-[0.82] tracking-[-0.065em] [perspective:900px] wordmark-fit"
        initial={reduce ? "visible" : "hidden"}
        animate={revealed || reduce ? "visible" : "hidden"}
      >
        {letters.map((char, i) => (
          <motion.span key={i} custom={i} variants={rise} className="relative inline-block origin-bottom">
            <motion.span
              className="group relative inline-block"
              whileHover={fine ? { y: "-12%" } : undefined}
              transition={{ type: "spring", stiffness: 420, damping: 16 }}
            >
              <span data-wave className="relative inline-block pb-[0.06em]">
                <span className="text-outline-strong">{char}</span>
                <motion.span
                  custom={i}
                  variants={fill}
                  className="absolute inset-0 bg-linear-to-b from-fg/55 to-fg/10 bg-clip-text text-transparent"
                >
                  {char}
                </motion.span>
                <span className="absolute inset-0 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {char}
                </span>
              </span>
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
