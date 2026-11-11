import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/src/lib/utils";

/**
 * Apparition douce au scroll, sans bibliothèque : un IntersectionObserver bascule
 * un attribut, le reste est du CSS. Le contenu n'est jamais caché avant que le JS
 * ait démarré (prérendu, sans JS), et l'est seulement s'il est hors de l'écran.
 */
export default function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${delay}s`;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
