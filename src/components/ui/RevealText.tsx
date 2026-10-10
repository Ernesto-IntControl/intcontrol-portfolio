import { motion, type Variants } from "motion/react";
import { createElement, type ElementType } from "react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

export interface Segment {
  text: string;
  className?: string;
}

interface RevealTextProps {
  /** Texte simple ou segments stylés (ex : un mot en serif italique). */
  text: string | Segment[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** "mount" : au chargement ; "view" : à l'entrée dans le viewport. */
  trigger?: "mount" | "view";
}

const word: Variants = {
  hidden: { y: "115%", rotate: 4 },
  visible: (custom: { delay: number; duration: number }) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: custom.duration, delay: custom.delay, ease: EASE_OUT_EXPO },
  }),
};

/** Révélation mot par mot à travers un masque, lisible par les lecteurs d'écran. */
export default function RevealText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
  duration = 1.05,
  trigger = "view",
}: RevealTextProps) {
  const segments: Segment[] = typeof text === "string" ? [{ text }] : text;
  const label = segments.map((s) => s.text.replace(/\s*\n\s*/g, " ")).join("");

  let index = 0;
  const words = segments.flatMap((segment, si) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((w, wi) => {
        if (w === "\n") return <br key={`${si}-${wi}`} />;
        const i = index++;
        return (
          <span key={`${si}-${wi}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block origin-bottom-left will-change-transform", segment.className)}
              variants={word}
              custom={{ delay: delay + i * stagger, duration }}
            >
              {w}
            </motion.span>
            {" "}
          </span>
        );
      }),
  );

  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  // Copie lisible par les lecteurs d'écran ; la version découpée est purement visuelle
  return createElement(
    as,
    { className },
    <span className="sr-only">{label}</span>,
    <motion.span aria-hidden className="block" {...animateProps}>
      {words}
    </motion.span>,
  );
}
