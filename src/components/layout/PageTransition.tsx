import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";

/** Enveloppe de page : fondu et léger glissement à l'entrée comme à la sortie. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
    >
      {children}
    </motion.div>
  );
}
