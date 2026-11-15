import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { DesktopShot, PhoneShot } from "@/src/components/ui/Screenshot";
import type { Project } from "@/src/data/projects";
import { cn } from "@/src/lib/utils";

/**
 * Mise en scène des vraies captures d'un projet : deux téléphones décalés, ou un
 * écran d'ordinateur avec le téléphone posé devant. Halo à la couleur du produit,
 * parallaxe à deux vitesses au scroll et lueur qui suit le pointeur.
 */
export default function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const near = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const far = useTransform(scrollYProgress, [0, 1], [48, -48]);

  const desktop = project.shots.filter((s) => s.kind === "desktop");
  const phones = project.shots.filter((s) => s.kind === "phone");

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group relative isolate overflow-hidden rounded-[28px] border border-line bg-surface", className)}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(60% 60% at 50% 60%, ${project.accent}33, transparent 72%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), ${project.accent}29, transparent 70%)` }}
      />

      {desktop.length > 0 ? (
        <>
          <motion.div style={{ y: near }} className="absolute left-[6%] top-[12%] w-[80%]">
            <DesktopShot
              shots={desktop}
              title={project.fullName ?? project.title}
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="transition-transform duration-1000 ease-out-expo group-hover:-translate-y-1"
            />
          </motion.div>
          {phones[0] && (
            <motion.div style={{ y: far }} className="absolute bottom-[5%] right-[5%] h-[66%]">
              <PhoneShot shot={phones[0]} sizes="(min-width: 1024px) 12vw, 30vw" className="h-full" />
            </motion.div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center gap-[4%]">
          {phones.slice(0, 2).map((shot, i) => (
            <motion.div key={shot.src} style={{ y: i === 0 ? near : far }} className={cn("h-[78%]", i === 1 && "mt-[9%]")}>
              <PhoneShot
                shot={shot}
                sizes="(min-width: 1024px) 14vw, 40vw"
                className={cn("h-full transition-transform duration-1000 ease-out-expo", i === 0 ? "group-hover:-rotate-2" : "group-hover:rotate-2")}
              />
            </motion.div>
          ))}
        </div>
      )}

      <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
        {project.title.toLowerCase()}
      </span>
    </div>
  );
}
