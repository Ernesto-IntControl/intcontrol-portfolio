import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageTransition from "@/src/components/layout/PageTransition";
import ContactCTA from "@/src/components/sections/ContactCTA";
import { Facet } from "@/src/components/sections/ProjectRow";
import ProjectVisual from "@/src/components/sections/ProjectVisual";
import Seo from "@/src/components/Seo";
import HexBullet from "@/src/components/ui/HexBullet";
import Reveal from "@/src/components/ui/Reveal";
import RevealText from "@/src/components/ui/RevealText";
import { DesktopShot, PhoneShot } from "@/src/components/ui/Screenshot";
import { projects, type Project } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import NotFoundPage from "./NotFoundPage";

export default function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFoundPage />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const hasRoles = project.product.length > 0 || project.engineering.length > 0;

  const meta = [
    { label: "Catégorie", value: project.category },
    project.company && { label: "Éditeur", value: project.company },
    project.role && { label: "Rôle", value: project.role },
  ].filter((m): m is { label: string; value: string } => !!m);

  return (
    <PageTransition>
      <Seo
        title={`${project.title} — Étude de cas | Ernest Katumbi — INTCONTROL`}
        description={`${project.title}${project.fullName ? ` (${project.fullName})` : ""} : ${project.tagline}`}
        path={`/projets/${project.slug}`}
      />

      {/* En-tête */}
      <section className="container-x pt-32 sm:pt-40">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}>
          <Link to="/projets" className="group inline-flex min-h-10 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-fg">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5" />
            Projets
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="chip"
              style={{ color: project.accent }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
              {project.category}
            </motion.span>
            <RevealText
              as="h1"
              trigger="mount"
              delay={0.1}
              text={project.title}
              className="mt-6 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
            />
            {project.fullName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted"
              >
                {project.fullName}
              </motion.p>
            )}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE_OUT_EXPO }}
              className="mt-6 max-w-2xl text-xl leading-snug text-fg/90 sm:text-2xl"
            >
              {project.tagline}
            </motion.p>
          </div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE_OUT_EXPO }}
            className="divide-y divide-line border-y border-line text-sm lg:col-span-4 lg:col-start-9"
          >
            {meta.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="eyebrow">{m.label}</dt>
                <dd className="text-right text-fg">{m.value}</dd>
              </div>
            ))}
            {project.links.demo && (
              <div className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="eyebrow">En ligne</dt>
                <dd>
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-fg hover:text-accent">
                    {project.links.demo.replace(/^https?:\/\//, "")}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </dd>
              </div>
            )}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE_OUT_EXPO }}
          className="mt-14 sm:mt-20"
        >
          <ProjectVisual project={project} className="aspect-square sm:aspect-[16/10] lg:aspect-[16/8]" />
        </motion.div>
      </section>

      {/* Le problème, le produit */}
      <section className="container-x pt-24 sm:pt-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow">Le problème</p>
          </Reveal>
          <div className="lg:col-span-8 lg:col-start-5">
            <RevealText
              as="p"
              text={project.problem}
              className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.035em] text-fg"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow">Le produit</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {project.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06} y={16} className="bg-bg-elevated p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <HexBullet filled className="h-2.5 w-2.5" />
                  <h2 className="text-lg font-semibold tracking-tight">{feature.title}</h2>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{feature.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {(hasRoles || project.stack.length > 0) && (
          <div className="mt-20 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <p className="eyebrow">Mon rôle</p>
            </Reveal>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="grid gap-10 md:grid-cols-2">
                {project.product.length > 0 && <Facet side="produit" items={project.product} />}
                {project.engineering.length > 0 && <Facet side="code" items={project.engineering} />}
              </div>
              {project.stack.length > 0 && (
                <Reveal className="mt-8 flex flex-wrap gap-1.5">
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
            </div>
          </div>
        )}
      </section>

      <Gallery project={project} />

      {/* Projet suivant */}
      <section className="container-x pt-24 sm:pt-32">
        <Link to={`/projets/${next.slug}`} className="group block border-y border-line py-10 sm:py-14">
          <p className="eyebrow">Projet suivant</p>
          <div className="mt-4 flex items-center justify-between gap-6">
            <span className="text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] transition-colors duration-500 group-hover:text-accent">
              {next.title}
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-fg group-hover:text-bg sm:h-20 sm:w-20">
              <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
            </span>
          </div>
          <p className="mt-3 max-w-xl text-muted">{next.tagline}</p>
        </Link>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}

/** Tous les écrans du projet, chacun avec sa légende. */
function Gallery({ project }: { project: Project }) {
  const desktop = project.shots.filter((s) => s.kind === "desktop");
  const phones = project.shots.filter((s) => s.kind === "phone");

  return (
    <section className="container-x pt-24 sm:pt-32">
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow">Écrans</p>
        </Reveal>
        <div className="space-y-12 lg:col-span-8 lg:col-start-5">
          {desktop.length > 0 && (
            <Reveal y={30}>
              <figure>
                <DesktopShot shots={desktop} title={project.fullName ?? project.title} sizes="(min-width: 1024px) 60vw, 92vw" />
                <figcaption className="mt-4 text-sm text-muted">
                  {desktop[0].caption} <span className="text-subtle">· suit le thème clair ou sombre du site</span>
                </figcaption>
              </figure>
            </Reveal>
          )}
          {phones.length > 0 && (
            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              {phones.map((shot, i) => (
                <Reveal key={shot.src} y={30} delay={i * 0.08}>
                  <figure
                    className="flex h-full flex-col items-center rounded-[24px] border border-line p-3 pt-6 sm:p-8"
                    style={{ background: `radial-gradient(70% 60% at 50% 40%, ${project.accent}1f, transparent 75%)` }}
                  >
                    <PhoneShot shot={shot} sizes="(min-width: 1024px) 22vw, 42vw" className="h-[clamp(210px,56vw,560px)]" />
                    <figcaption className="mt-5 text-center text-xs text-muted sm:text-sm">{shot.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
