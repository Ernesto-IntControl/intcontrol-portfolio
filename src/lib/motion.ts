import type { Transition } from "motion/react";

/** Courbes partagées : une seule signature de mouvement sur tout le site. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

export const springSoft: Transition = { type: "spring", stiffness: 220, damping: 26, mass: 0.7 };
export const springSnappy: Transition = { type: "spring", stiffness: 420, damping: 32, mass: 0.6 };

export const reveal = (delay = 0, duration = 1): Transition => ({
  duration,
  delay,
  ease: EASE_OUT_EXPO,
});
