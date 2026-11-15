import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/src/data/projects";
import { EASE_IN_OUT_QUART } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";
import ProjectVisual from "./ProjectVisual";

const pad = (n: number) => String(n).padStart(2, "0");
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Durée commune des changements de disposition (carte → en-tête d'étude de cas). */
export const LAYOUT = { duration: 0.75, ease: EASE_IN_OUT_QUART };

/**
 * Carte d'un projet. `card` : vignette et résumé ; `header` : la même carte réduite
 * en bandeau, au-dessus de son étude de cas. Le passage de l'un à l'autre est animé
 * (motion `layout` sur l'image et le texte) : la carte se resserre pour laisser la place à l'étude.
 * `to` : lien vers l'étude (accueil) ; `onOpen` / `onClose` : ouverture sur place (page Projets).
 */
export default function ProjectCard({
  project,
  index,
  total,
  variant = "card",
  headingAs: Heading = "h3",
  to,
  onOpen,
  onClose,
}: {
  project: Project;
  index: number;
  total: number;
  variant?: "card" | "header";
  /** Niveau du titre : h3 sous une section (accueil), h2 directement sous le titre de page. */
  headingAs?: "h2" | "h3";
  to?: string;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const header = variant === "header";

  const open = (children: ReactNode, className?: string, label?: string) =>
    to ? (
      <Link to={to} className={className} aria-label={label}>
        {children}
      </Link>
    ) : (
      <button type="button" onClick={onOpen} className={cn("text-left", className)} aria-label={label}>
        {children}
      </button>
    );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
      className={cn(
        "group relative",
        header
          ? "grid items-center gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-10"
          : "flex flex-col",
      )}
    >
      <motion.div
        layout
        transition={{ layout: LAYOUT }}
        className={cn("w-full", header && "max-w-[15rem] sm:max-w-none")}
      >
        {header ? (
          <ProjectVisual project={project} className="aspect-[4/3] w-full" />
        ) : (
          open(
            <ProjectVisual project={project} className="aspect-[4/3] w-full" />,
            "block w-full",
            `Étude de cas : ${project.title}`,
          )
        )}
      </motion.div>

      <motion.div layout="position" transition={{ layout: LAYOUT }} className={cn("min-w-0", !header && "mt-5")}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs text-subtle">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="chip" style={{ color: `color-mix(in oklab, ${project.accent} 50%, var(--fg))` }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
            {project.category}
          </span>
          {header && project.role && <span className="chip">{project.role}</span>}
        </div>

        <Heading
          className={cn(
            "mt-4 font-semibold tracking-[-0.04em] transition-colors duration-500",
            header
              ? "text-[clamp(1.75rem,3vw,2.25rem)] leading-tight"
              : "text-2xl leading-tight group-hover:text-accent",
          )}
        >
          {project.title}
          {project.fullName && (
            <span className="ml-3 align-middle font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">
              {project.fullName}
            </span>
          )}
        </Heading>
        <p className={cn("mt-2.5 leading-relaxed text-muted", header ? "max-w-2xl text-lg text-fg/85" : "text-[15px]")}>
          {project.tagline}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={variant}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: header ? 0.45 : 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            {header ? (
              <>
                <button type="button" onClick={onClose} className="btn-ghost group/close !min-h-10 !px-4 !py-2">
                  <X className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover/close:rotate-90" />
                  Tous les projets
                </button>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-fg"
                  >
                    <span className="link-underline pb-0.5">{host(project.links.demo)}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                )}
              </>
            ) : (
              open(
                <>
                  <span className="link-underline pb-0.5">Voir l'étude de cas</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                </>,
                "inline-flex min-h-10 items-center gap-2 text-sm font-medium text-fg",
              )
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}
