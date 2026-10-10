import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, type PointerEvent } from "react";
import ProjectMockup from "@/src/components/mockups/ProjectMockup";
import type { Project } from "@/src/data/projects";
import { useFinePointer } from "@/src/hooks/useMediaQuery";
import { cn } from "@/src/lib/utils";

const spring = { stiffness: 140, damping: 20, mass: 0.8 };

/**
 * Scène 3D d'une maquette : rotation liée au scroll (optionnelle)
 * combinée à une inclinaison qui suit le pointeur.
 */
export default function MockupStage({
  project,
  scrollRotate,
  className,
  scaleClassName,
}: {
  project: Project;
  scrollRotate?: MotionValue<number>;
  className?: string;
  scaleClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const px = useSpring(useMotionValue(0), spring);
  const py = useSpring(useMotionValue(0), spring);
  const fallback = useMotionValue(-14);
  const scroll = scrollRotate ?? fallback;

  const rotateY = useTransform(() => scroll.get() + px.get() * 12);
  const rotateX = useTransform(() => 6 - py.get() * 9);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className={cn("relative flex items-center justify-center", className)}
      style={{ perspective: 1600 }}
    >
      {/* Halo coloré du produit */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-50"
        style={{ background: `radial-gradient(closest-side, ${project.accent}66, transparent)` }}
      />
      <motion.div className="preserve-3d absolute left-1/2 top-1/2" style={{ rotateX, rotateY, x: "-50%", y: "-50%" }}>
        <div
          className={cn(
            "preserve-3d origin-center",
            scaleClassName ??
              (project.mockup === "bisomarket"
                ? "scale-[0.5] sm:scale-[0.68] lg:scale-[0.74] xl:scale-[0.86]"
                : "scale-[0.56] sm:scale-[0.72] lg:scale-[0.8] xl:scale-[0.92]"),
          )}
        >
          <ProjectMockup project={project} />
        </div>
      </motion.div>
    </div>
  );
}
