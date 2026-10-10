import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/src/hooks/useMediaQuery";
import { cn } from "@/src/lib/utils";

const spring = { stiffness: 320, damping: 22, mass: 0.5 };

/** Attire légèrement l'élément vers le pointeur, puis le relâche avec un ressort. */
export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
