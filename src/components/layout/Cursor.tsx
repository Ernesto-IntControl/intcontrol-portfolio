import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/src/hooks/useMediaQuery";

/**
 * Curseur en deux temps : un point exact (aucun retard) et un anneau à ressort
 * qui s'agrandit sur les éléments interactifs ou affiche un libellé (data-cursor="Voir").
 */
export default function Cursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });
  const [state, setState] = useState<{ hover: boolean; label: string | null; down: boolean; visible: boolean }>({
    hover: false,
    label: null,
    down: false,
    visible: false,
  });

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("cursor-custom");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Le point suit directement l'événement : précision au pixel près
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role='button'], input, textarea, label, select");
      setState((s) => {
        const label = labelled?.dataset.cursor ?? null;
        const hover = !!interactive || !!labelled;
        if (s.label === label && s.hover === hover && s.visible) return s;
        return { ...s, label, hover, visible: true };
      });
    };
    const onDown = () => setState((s) => ({ ...s, down: true }));
    const onUp = () => setState((s) => ({ ...s, down: false }));
    const onLeave = () => setState((s) => ({ ...s, visible: false }));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const size = state.label ? 88 : state.hover ? 52 : 32;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: state.visible ? 1 : 0,
          scale: state.down ? 0.85 : 1,
          backgroundColor: state.label ? "var(--accent)" : "rgba(0,0,0,0)",
          borderColor: state.label ? "var(--accent)" : state.hover ? "var(--accent)" : "var(--line-strong)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.6 }}
      >
        {state.label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent-fg"
          >
            {state.label}
          </motion.span>
        )}
      </motion.div>
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-fg transition-opacity duration-200"
        style={{ opacity: state.visible && !state.label ? 1 : 0 }}
      />
    </div>
  );
}
