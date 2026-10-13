import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Scroll inertiel (molette/trackpad). Le tactile garde le scroll natif du système. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      autoRaf: true,
    });
    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Scroll vers un élément ou une position, fluide si Lenis est actif.
 * La fonction est stable et lit toujours l'instance courante (utile dans un setTimeout).
 */
export function useScrollTo() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  return useCallback((target: string | number, opts: { offset?: number; immediate?: boolean } = {}) => {
    const { offset = 0, immediate = false } = opts;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, immediate, force: true, duration: immediate ? 0 : 1.4 });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
      return;
    }
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
    }
  }, []);
}
