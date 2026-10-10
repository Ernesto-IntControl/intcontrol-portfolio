import { motion, type HTMLMotionProps } from "motion/react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  blur?: boolean;
}

/** Apparition douce à l'entrée dans le viewport (transform + opacité, composées par le GPU). */
export default function Reveal({ delay = 0, y = 28, blur = false, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(blur && { filter: "blur(8px)" }) }}
      // Le flou est réservé aux petits éléments et retiré à la fin : un filtre résiduel
      // coûte cher au rendu et casse le backdrop-filter des enfants
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)", transitionEnd: { filter: "none" } }) }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
