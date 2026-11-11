import { ArrowUpRight, Github } from "lucide-react";
import ProgressiveImage from "@/src/components/ui/ProgressiveImage";
import type { Project } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";

function Thumb({ project }: { project: Project }) {
  const { visual } = project;
  const frame = "relative aspect-[16/10] overflow-hidden border-b border-line";

  if (visual.kind === "board") {
    const img = visual.board;
    return (
      <div className={frame} style={{ background: visual.background }}>
        <ProgressiveImage
          src={img.src}
          alt={visual.alt}
          width={img.width}
          height={img.height}
          avif={img.avif}
          webp={img.webp}
          sizes="(min-width: 880px) 420px, 92vw"
          placeholder={img.placeholder}
          className="h-full w-full"
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  if (visual.kind === "phone") {
    const img = visual.screen;
    return (
      <div className={frame} style={{ background: visual.screenBackground }}>
        <picture>
          <source type="image/avif" srcSet={img.avif} />
          <img
            src={img.src}
            alt={visual.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            className="absolute left-1/2 top-[12%] w-[34%] -translate-x-1/2 rounded-t-xl border border-line-strong shadow-md transition-transform duration-500 ease-out group-hover:-translate-y-1"
          />
        </picture>
      </div>
    );
  }

  // Pas encore de visuel réel : un emplacement propre plutôt qu'une fausse maquette
  return (
    <div
      className={`${frame} flex items-center justify-center`}
      style={{ background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}08)` }}
    >
      <span className="rounded-md border border-dashed border-line-strong bg-surface/70 px-2.5 py-1 font-mono text-[11px] text-muted">
        visuel bientôt disponible
      </span>
    </div>
  );
}

/** Carte de projet compacte : visuel réel, titre, accroche, puces. `detailed` ajoute description et liens. */
export default function ProjectCard({ project, detailed = false }: { project: Project; detailed?: boolean }) {
  return (
    <article id={project.slug} className="card card-hover group flex scroll-mt-20 flex-col overflow-hidden">
      <Thumb project={project} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: project.accent }} />
          <span className="label">{project.category}</span>
        </div>
        <h3 className="mt-2 text-[17px] font-semibold">{project.title}</h3>
        <p className="mt-1 text-[13.5px] leading-snug text-muted">{project.tagline}</p>

        {detailed && <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{project.description}</p>}

        {project.highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.highlights.slice(0, detailed ? 6 : 3).map((h) => (
              <li key={h} className="chip">
                {h}
              </li>
            ))}
          </ul>
        )}

        {detailed && project.role && (
          <p className="mt-3 text-[12.5px] text-subtle">
            <span className="label mr-1.5">Rôle</span>
            {project.role}
          </p>
        )}

        {project.stack.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => {
              const Icon = techIcons[tech];
              return (
                <li key={tech} className="chip">
                  {Icon && <Icon className="h-3 w-3" />}
                  {tech}
                </li>
              );
            })}
          </ul>
        )}

        {(project.links.demo || project.links.github) && (
          <div className="mt-4 flex gap-2">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn">
                Voir le produit <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn">
                Code <Github className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
