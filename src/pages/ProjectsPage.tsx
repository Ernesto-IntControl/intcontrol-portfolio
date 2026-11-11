import { ArrowUpRight, Github } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import MockupStage from "@/src/components/sections/MockupStage";
import { ZoomImage } from "@/src/components/sections/ProjectVisual";
import Seo from "@/src/components/Seo";
import Reveal from "@/src/components/ui/Reveal";
import RevealText from "@/src/components/ui/RevealText";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { projects, type Project } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";
import { cn } from "@/src/lib/utils";
import { useScrollTo } from "@/src/providers/SmoothScroll";

export default function ProjectsPage() {
  const { hash } = useLocation();
  const scrollTo = useScrollTo();

  // Arrivée depuis « Découvrir le projet » : on rejoint la bonne fiche après la transition
  useEffect(() => {
    if (!hash) return;
    const id = window.setTimeout(() => scrollTo(hash, { offset: -100 }), 700);
    return () => window.clearTimeout(id);
  }, [hash, scrollTo]);

  return (
    <PageTransition>
      <Seo path="/projets" />

      <section className="container-x pb-10 pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="02"
          label="Projets"
          title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
          intro="Mobilité, point de vente, réseau social, registre numérique : quatre produits, une même exigence de qualité, de la vision produit jusqu'au code."
        />
      </section>

      <div className="container-x space-y-6 pb-10 sm:space-y-10">
        {projects.map((project, i) => (
          <ProjectDetail key={project.slug} project={project} index={i} />
        ))}
      </div>

      <ContactCTA index="03" />
    </PageTransition>
  );
}

function ProjectDetail({ project, index }: { project: Project; index: number }) {
  const { visual } = project;
  const board = visual.kind === "board";
  const reversed = index % 2 === 1;
  const details = [
    { label: "Catégorie", value: project.category },
    project.role ? { label: "Rôle", value: project.role } : null,
  ].filter((d): d is { label: string; value: string } => d !== null);

  const heading = (
    <>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
        <span className="chip" style={{ color: project.accent }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
          {project.category}
        </span>
      </div>
      <RevealText
        as="h2"
        text={project.title}
        className="mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
      />
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-lg text-xl leading-snug text-fg/90">{project.tagline}</p>
      </Reveal>
    </>
  );

  const body = (
    <Reveal delay={0.15}>
      <p className="leading-relaxed text-muted">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.highlights.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-8 divide-y divide-line border-y border-line">
        {details.map((d) => (
          <div key={d.label} className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
            <dt className="eyebrow">{d.label}</dt>
            <dd className="text-right text-fg">{d.value}</dd>
          </div>
        ))}
        {project.stack.length > 0 && (
          <div className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
            <dt className="eyebrow">Stack</dt>
            <dd className="flex flex-wrap justify-end gap-1.5">
              {project.stack.map((tech) => {
                const Icon = techIcons[tech];
                return (
                  <span key={tech} className="chip">
                    {Icon && <Icon className="h-3 w-3" />}
                    {tech}
                  </span>
                );
              })}
            </dd>
          </div>
        )}
      </dl>

      {(project.links.demo || project.links.github) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" data-cursor="Ouvrir">
              Voir le produit <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Code source <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </Reveal>
  );

  // Planche réelle : elle occupe toute la largeur de la fiche, le texte vient dessous
  if (board) {
    return (
      <article id={project.slug} className="panel relative scroll-mt-28 overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <div className="p-2 sm:p-3">
          {/* Téléphone : le recadrage, lisible en petit. Au-delà : la planche entière. */}
          <ZoomImage
            image={visual.cover}
            alt={visual.alt}
            background={visual.background}
            sizes="94vw"
            aspect={visual.cover.width / visual.cover.height}
            imgClassName={visual.coverFocus}
            className="w-full rounded-[20px] sm:hidden"
          />
          <ZoomImage
            image={visual.board}
            alt={visual.alt}
            background={visual.background}
            sizes="(min-width: 1400px) 1280px, 94vw"
            className="hidden aspect-[16/10] w-full rounded-[26px] sm:block"
          />
        </div>
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>{heading}</div>
          <div className="lg:pt-9">{body}</div>
        </div>
      </article>
    );
  }

  return (
    <article id={project.slug} className="panel relative grid scroll-mt-28 overflow-hidden rounded-[28px] sm:rounded-[36px] lg:grid-cols-2">
      <MockupStage
        project={project}
        className={cn("min-h-[340px] sm:min-h-[460px] lg:min-h-[640px]", reversed && "lg:order-2")}
      />
      <div className="relative flex flex-col justify-center border-t border-line p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
        {heading}
        <div className="mt-6">{body}</div>
      </div>
    </article>
  );
}
