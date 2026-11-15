import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import ProjectMockup from "@/src/components/mockups/ProjectMockup";
import HexBullet from "@/src/components/ui/HexBullet";
import Reveal from "@/src/components/ui/Reveal";
import RevealText from "@/src/components/ui/RevealText";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { projects, type Project } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Projects() {
  return (
    <section id="projets" className="relative pb-12 pt-24 sm:pt-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Projets"
          title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
          intro="Les produits sur lesquels je travaille en ce moment, de la vision produit jusqu'au code."
        />
        <div className="mt-14 sm:mt-20">
          {projects.map((project, i) => (
            <ProjectCase key={project.slug} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCase({ project, index, total }: { project: Project; index: number; total: number }) {
  const reversed = index % 2 === 1;
  const hasRoles = project.product.length > 0 || project.engineering.length > 0;
  const textCol = reversed ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5 lg:col-start-1";

  return (
    <article id={project.slug} className="relative scroll-mt-24 py-12 sm:py-16">
      {/* Filet qui se trace à l'arrivée de chaque projet */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
      />

      <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        {/* En-tête */}
        <header className={cn(textCol, "lg:row-start-1 lg:self-end")}>
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-subtle">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span className="chip" style={{ color: project.accent }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
              {project.category}
            </span>
            {project.role && <span className="chip">{project.role}</span>}
          </Reveal>
          <RevealText
            as="h3"
            text={project.title}
            className="mt-6 text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
          />
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-md text-xl leading-snug text-fg/90">{project.tagline}</p>
          </Reveal>
        </header>

        {/* Maquette */}
        <div className={cn("lg:col-span-7 lg:row-span-2 lg:row-start-1", reversed ? "lg:col-start-1" : "lg:col-start-6")}>
          <ProjectVisual project={project} />
        </div>

        {/* Le problème, puis les deux casquettes (ou les points clés du produit) */}
        <div className={cn(textCol, "lg:row-start-2")}>
          <Reveal delay={0.12}>
            <p className="eyebrow">Le problème</p>
            <p className="mt-2.5 max-w-md leading-relaxed text-fg/85">{project.problem}</p>
          </Reveal>

          <div className="mt-8 space-y-7">
            {hasRoles ? (
              <>
                {project.product.length > 0 && <Facet side="produit" items={project.product} />}
                {project.engineering.length > 0 && <Facet side="code" items={project.engineering} />}
              </>
            ) : (
              <Facet items={project.highlights} />
            )}
          </div>

          {project.stack.length > 0 && (
            <Reveal className="mt-7 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => {
                const Icon = techIcons[tech];
                return (
                  <span key={tech} className="chip">
                    {Icon && <Icon className="h-3 w-3" />}
                    {tech}
                  </span>
                );
              })}
            </Reveal>
          )}

          {(project.links.demo || project.links.github) && (
            <Reveal className="mt-8 flex flex-wrap gap-3">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary group">
                  Voir le produit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Code source <Github className="h-4 w-4" />
                </a>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </article>
  );
}

/** Une casquette sur le projet : produit en serif italique, code en mono. */
function Facet({ side, items }: { side?: "produit" | "code"; items: string[] }) {
  const label =
    side === "produit" ? (
      <span className="serif-accent text-lg text-accent">Côté produit</span>
    ) : side === "code" ? (
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Côté code</span>
    ) : (
      <span className="eyebrow">Le produit</span>
    );

  return (
    <div>
      <Reveal delay={0.1} className="flex items-center gap-3">
        {label}
        <span className="h-px flex-1 bg-line" aria-hidden />
      </Reveal>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <Reveal key={item} delay={0.14 + i * 0.06} y={10}>
            <li className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <HexBullet className="mt-[0.55em]" filled={side === "code"} />
              {item}
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/**
 * Cadre de la maquette : halo à la couleur du produit, léger parallaxe au scroll
 * et lueur qui suit le pointeur.
 */
function ProjectVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const phone = project.mockup !== "bisomarket";

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal y={36} className="h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        className={cn(
          "group relative h-full overflow-hidden rounded-[28px] border border-line bg-surface sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]",
          phone ? "aspect-[4/5]" : "aspect-[5/4]",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(55% 55% at 50% 55%, ${project.accent}30, transparent 72%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${project.accent}26, transparent 70%)` }}
        />
        <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "shrink-0 origin-center",
              phone
                ? "scale-[0.6] sm:scale-[0.72] lg:scale-[0.78] xl:scale-[0.84]"
                : "scale-[0.46] sm:scale-[0.82] lg:scale-[0.8] xl:scale-[0.95]",
            )}
          >
            <ProjectMockup project={project} />
          </div>
        </motion.div>
        <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
          {project.title.toLowerCase()}
        </span>
      </div>
    </Reveal>
  );
}
