import { motion, type HTMLMotionProps } from "motion/react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

/** Apparition douce à l'entrée dans le viewport : léger glissement et fondu (transform + opacité). */
export default function Reveal({ delay = 0, y = 18, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
