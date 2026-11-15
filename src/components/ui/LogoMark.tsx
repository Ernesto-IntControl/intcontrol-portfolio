import { motion } from "motion/react";
import { EASE_DRAW } from "@/src/lib/motion";

/** Emblème hexagonal INTCONTROL ; `draw` le fait se dessiner à l'arrivée. */
export default function LogoMark({ className, draw }: { className?: string; draw?: boolean }) {
  const anim = (duration: number, delay = 0) =>
    draw ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration, delay, ease: EASE_DRAW } } : {};
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <motion.path
        d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        {...anim(1.2)}
      />
      <motion.path
        d="M21.2 11.4 16 8.4l-5.2 3v9.2l5.2 3 5.2-3"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="round"
        style={{ stroke: "var(--accent)" }}
        {...anim(0.9, 0.45)}
      />
    </svg>
  );
}
