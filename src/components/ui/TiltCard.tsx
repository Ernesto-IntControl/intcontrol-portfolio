import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/src/hooks/useMediaQuery";
import { cn } from "@/src/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Classe du calque de fond (surface visible de la carte). */
  surfaceClassName?: string;
  /** Inclinaison maximale en degrés. */
  max?: number;
  glare?: boolean;
  perspective?: number;
  style?: CSSProperties;
}

const spring = { stiffness: 260, damping: 24, mass: 0.6 };

/**
 * Carte inclinable en vraie 3D : le conteneur interne est en preserve-3d,
 * les enfants peuvent sortir du plan avec <Depth z={…}>.
 * Le fond est un calque séparé pour que backdrop-filter n'aplatisse pas la 3D.
 */
export default function TiltCard({
  children,
  className,
  surfaceClassName = "panel",
  max = 9,
  glare = true,
  perspective = 1100,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useSpring(0, { stiffness: 200, damping: 30 });

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgb(255 255 255 / 0.07), transparent 45%)`;
  const borderBg = useMotionTemplate`radial-gradient(360px circle at ${gx} ${gy}, var(--accent), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => fine && hover.set(1)}
      onPointerLeave={onLeave}
      className={cn("relative", className)}
      style={{ perspective, ...style }}
    >
      <motion.div
        className="preserve-3d relative h-full rounded-[inherit]"
        style={fine ? { rotateX, rotateY } : undefined}
      >
        <div className={cn("absolute inset-0 rounded-[inherit]", surfaceClassName)} aria-hidden />
        {glare && fine && (
          <>
            {/* Liseré lumineux qui suit le pointeur */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
              style={{
                opacity: hover,
                background: borderBg,
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{ opacity: hover, background: glareBg }}
            />
          </>
        )}
        <div className="preserve-3d relative h-full rounded-[inherit]">{children}</div>
      </motion.div>
    </div>
  );
}

/** Décale un élément hors du plan de la carte (parallaxe de profondeur). */
export function Depth({ z, className, children }: { z: number; className?: string; children: ReactNode }) {
  return (
    <div className={cn("preserve-3d", className)} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  );
}
