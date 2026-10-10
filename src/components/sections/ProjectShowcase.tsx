import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";
import MockupStage from "./MockupStage";

/** Cartes empilées : chaque projet se pose sur le précédent, qui recule en profondeur. */
export default function ProjectShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <div ref={container} className="relative mt-14 sm:mt-20">
      {projects.map((project, i) => {
        const steps = Math.max(projects.length - 1, 1);
        const isLast = i === projects.length - 1;
        // Les plages restent dans [0, 1] : Motion les transmet à des animations natives
        // (ScrollTimeline) qui rejettent tout offset hors de cet intervalle
        const start = Math.min(i / steps, 1);
        return (
          <StackCard
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            range={isLast ? [0, 1] : [start, 1]}
            dimRange={isLast ? [0, 1] : [start, Math.min((i + 1) / steps, 1)]}
            targetScale={isLast ? 1 : 1 - (projects.length - i) * 0.04}
            dims={!isLast}
          />
        );
      })}
    </div>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  range,
  dimRange,
  targetScale,
  dims,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  dimRange: [number, number];
  targetScale: number;
  dims: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });

  const scale = useTransform(progress, range, [1, targetScale]);
  // Le projet s'efface seulement pendant que le suivant vient le recouvrir
  const dim = useTransform(progress, dimRange, [0, dims ? 0.6 : 0]);
  const mockRotate = useTransform(enter, [0, 1], [-34, -12]);
  const contentY = useTransform(enter, [0.4, 1], [60, 0]);

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center">
      <motion.article
        id={`projet-${project.slug}`}
        style={{ scale, top: `calc(${index * 22}px - 2vh)` }}
        className="panel relative grid h-[min(84svh,760px)] w-full origin-top grid-rows-[auto_1fr] overflow-hidden rounded-[28px] sm:rounded-[36px] lg:grid-cols-2 lg:grid-rows-1"
      >
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden />

        <motion.div style={{ y: contentY }} className="relative z-10 flex flex-col p-6 sm:p-10 lg:p-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-subtle">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="chip" style={{ color: project.accent }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
              {project.category}
            </span>
          </div>

          <h3 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] lg:mt-auto">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-lg leading-snug text-fg/90 sm:text-xl">{project.tagline}</p>
          <p className="mt-4 hidden max-w-md text-sm leading-relaxed text-muted sm:block">{project.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.role && <span className="chip">{project.role}</span>}
            {project.stack.map((tech) => {
              const Icon = techIcons[tech];
              return (
                <span key={tech} className="chip">
                  {Icon && <Icon className="h-3 w-3" />}
                  {tech}
                </span>
              );
            })}
          </div>

          <Link
            to={`/projets#${project.slug}`}
            data-cursor="Voir"
            className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-fg lg:mt-10"
          >
            Découvrir le projet
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-fg group-hover:text-bg">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>

        <MockupStage project={project} scrollRotate={mockRotate} className="relative min-h-[300px]" />

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-bg" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}
