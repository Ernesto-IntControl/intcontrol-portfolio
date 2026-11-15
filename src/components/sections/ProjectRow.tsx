import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import HexBullet from "@/src/components/ui/HexBullet";
import Reveal from "@/src/components/ui/Reveal";
import RevealText from "@/src/components/ui/RevealText";
import type { Project } from "@/src/data/projects";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";
import ProjectVisual from "./ProjectVisual";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Un projet sur une rangée : texte d'un côté, captures de l'autre (en alternance).
 * `compact` (accueil) : points clés ; `full` (page Projets) : problème et deux casquettes.
 */
export default function ProjectRow({
  project,
  index,
  total,
  variant = "compact",
}: {
  project: Project;
  index: number;
  total: number;
  variant?: "compact" | "full";
}) {
  const reversed = index % 2 === 1;
  const hasRoles = project.product.length > 0 || project.engineering.length > 0;
  const textCol = reversed ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5 lg:col-start-1";
  const href = `/projets/${project.slug}`;

  return (
    <article className="relative py-12 sm:py-16">
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
          <Link to={href} className="group/title mt-6 block">
            <RevealText
              as="h3"
              text={project.title}
              className="text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-colors duration-500 group-hover/title:text-accent"
            />
          </Link>
          {project.fullName && (
            <Reveal delay={0.05}>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{project.fullName}</p>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-md text-xl leading-snug text-fg/90">{project.tagline}</p>
          </Reveal>
        </header>

        <Link
          to={href}
          aria-label={`Étude de cas : ${project.title}`}
          className={cn("block lg:col-span-7 lg:row-span-2 lg:row-start-1", reversed ? "lg:col-start-1" : "lg:col-start-6")}
        >
          <Reveal y={36} className="h-full">
            <ProjectVisual project={project} className="aspect-square h-full sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]" />
          </Reveal>
        </Link>

        <div className={cn(textCol, "lg:row-start-2")}>
          {variant === "full" && (
            <Reveal delay={0.12} className="mb-8">
              <p className="eyebrow">Le problème</p>
              <p className="mt-2.5 max-w-md leading-relaxed text-fg/85">{project.problem}</p>
            </Reveal>
          )}

          <div className="space-y-7">
            {variant === "full" && hasRoles ? (
              <>
                {project.product.length > 0 && <Facet side="produit" items={project.product} />}
                {project.engineering.length > 0 && <Facet side="code" items={project.engineering} />}
              </>
            ) : (
              <Facet items={project.highlights} />
            )}
          </div>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={href} className="btn-primary group">
              Voir l'étude de cas
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
            </Link>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg"
              >
                <span className="link-underline pb-0.5">{project.links.demo.replace(/^https?:\/\//, "")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/** Une casquette sur le projet : produit en serif italique, code en mono ; sans casquette : les points clés. */
export function Facet({ side, items, className }: { side?: "produit" | "code"; items: string[]; className?: string }) {
  const label =
    side === "produit" ? (
      <span className="serif-accent text-lg text-accent">Côté produit</span>
    ) : side === "code" ? (
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Côté code</span>
    ) : (
      <span className="eyebrow">Le produit</span>
    );

  return (
    <div className={className}>
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
