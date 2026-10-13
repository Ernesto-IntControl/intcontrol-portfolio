import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Souris/trackpad : on active tilt, curseur et effets magnétiques. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
