import { motion, type Variants } from "motion/react";
import { createElement, Fragment, type ElementType, type ReactNode } from "react";
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
  /** Élément ajouté après le dernier mot (soulignement, curseur…). */
  children?: ReactNode;
}

const word: Variants = {
  hidden: { y: "110%" },
  visible: (custom: { delay: number; duration: number }) => ({
    y: "0%",
    transition: { duration: custom.duration, delay: custom.delay, ease: EASE_OUT_EXPO },
  }),
};

/** Révélation mot par mot à travers un masque, lisible par les lecteurs d'écran. */
export default function RevealText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.05,
  duration = 1,
  trigger = "view",
  children,
}: RevealTextProps) {
  const segments: Segment[] = typeof text === "string" ? [{ text }] : text;
  const label = segments.map((s) => s.text).join("");

  let index = 0;
  const words = segments.flatMap((segment, si) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((w, wi) => {
        const i = index++;
        // L'espace reste hors du masque : en fin de bloc inline, il serait supprimé
        return (
          <Fragment key={`${si}-${wi}`}>
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
              <motion.span
                className={cn("inline-block will-change-transform", segment.className)}
                variants={word}
                custom={{ delay: delay + i * stagger, duration }}
              >
                {w}
              </motion.span>
            </span>{" "}
          </Fragment>
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
      {children}
    </motion.span>,
  );
}
