import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { DesktopShot, PhoneShot } from "@/src/components/ui/Screenshot";
import type { Project, Shot } from "@/src/data/projects";
import { cn } from "@/src/lib/utils";

/** Captures d'ordinateur regroupées par écran (les variantes clair / sombre partagent la même légende). */
export function desktopGroups(shots: Shot[]) {
  const groups = new Map<string, Shot[]>();
  for (const shot of shots.filter((s) => s.kind === "desktop")) {
    groups.set(shot.caption, [...(groups.get(shot.caption) ?? []), shot]);
  }
  return [...groups.values()];
}

/**
 * Mise en scène des vraies captures d'un projet : deux téléphones décalés, ou un
 * écran d'ordinateur avec le téléphone posé devant. Halo à la couleur du produit,
 * parallaxe à deux vitesses au scroll et lueur qui suit le pointeur.
 */
export default function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const near = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const far = useTransform(scrollYProgress, [0, 1], [28, -28]);

  const desktop = desktopGroups(project.shots)[0];
  const phones = project.shots.filter((s) => s.kind === "phone");
  const title = desktop?.[0].label ?? project.fullName ?? project.title;

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
      className={cn("group/visual relative isolate overflow-hidden rounded-[22px] border border-line bg-surface", className)}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(60% 60% at 50% 60%, ${project.accent}33, transparent 72%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover/visual:opacity-100"
        style={{ background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${project.accent}29, transparent 70%)` }}
      />

      {desktop ? (
        <>
          <motion.div style={{ y: near }} className="absolute left-[6%] top-[13%] w-[80%]">
            <DesktopShot
              shots={desktop}
              title={title}
              sizes="(min-width: 1024px) 26vw, 80vw"
              className="transition-transform duration-1000 ease-out-expo group-hover/visual:-translate-y-1"
            />
          </motion.div>
          {phones[0] && (
            <motion.div style={{ y: far }} className="absolute bottom-[5%] right-[5%] h-[64%]">
              <PhoneShot shot={phones[0]} sizes="(min-width: 1024px) 9vw, 26vw" className="h-full" />
            </motion.div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center gap-[4%]">
          {phones.slice(0, 2).map((shot, i) => (
            <motion.div key={shot.src} style={{ y: i === 0 ? near : far }} className={cn("h-[76%]", i === 1 && "mt-[9%]")}>
              <PhoneShot
                shot={shot}
                sizes="(min-width: 1024px) 10vw, 30vw"
                className={cn(
                  "h-full transition-transform duration-1000 ease-out-expo",
                  i === 0 ? "group-hover/visual:-rotate-2" : "group-hover/visual:rotate-2",
                )}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
