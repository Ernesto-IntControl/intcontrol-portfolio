import { useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#";

interface ScrambleProps {
  text: string;
  className?: string;
  /** Délai avant le décodage, en ms. */
  delay?: number;
  /** "mount" : au chargement ; "view" : à l'entrée dans le viewport. */
  trigger?: "mount" | "view";
  /** Rejoue le décodage au survol. */
  replayOnHover?: boolean;
}

/**
 * Texte mono qui se « décode » : les caractères défilent puis se fixent de gauche
 * à droite. Écrit directement dans le DOM (aucun rendu React par image), et la police
 * mono évite tout décalage de mise en page pendant l'effet.
 */
export default function Scramble({ text, className, delay = 0, trigger = "view", replayOnHover }: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();

  const run = useCallback(
    (wait: number) => {
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(frame.current);
      if (reduce) {
        el.textContent = text;
        el.style.opacity = "1";
        return;
      }
      const duration = 420 + text.length * 22;
      let start = 0;
      let last = 0;
      const tick = (now: number) => {
        if (!start) start = now + wait;
        if (now >= start && now - last > 40) {
          last = now;
          const progress = Math.min((now - start) / duration, 1);
          const settled = Math.floor(progress * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            out += i < settled || !/[\p{L}\p{N}]/u.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          el.textContent = out;
          el.style.opacity = "1";
          if (progress >= 1) return;
        }
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    },
    [text, reduce],
  );

  useEffect(() => {
    if (trigger === "mount" || inView) run(delay);
  }, [trigger, inView, delay, run]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <span className={cn("relative inline-block", className)} onPointerEnter={replayOnHover ? () => run(0) : undefined}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden style={{ opacity: 0 }}>
        {text}
      </span>
    </span>
  );
}
