import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import HexBullet from "@/src/components/ui/HexBullet";
import Reveal from "@/src/components/ui/Reveal";
import { DesktopShot, PhoneShot } from "@/src/components/ui/Screenshot";
import { projects, type Project } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { desktopGroups } from "./ProjectVisual";

/** Bloc d'étude de cas : libellé à gauche, contenu à droite. */
function Block({ label, children, delay = 0 }: { label: string; children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
      className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10"
    >
      <h3 className="eyebrow lg:col-span-3">{label}</h3>
      <div className="lg:col-span-9">{children}</div>
    </motion.div>
  );
}

/**
 * Étude de cas, affichée sous la carte du projet une fois réduite :
 * problème, fonctionnalités, rôle, écrans, puis les autres études.
 */
export default function CaseStudy({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  const hasRoles = project.product.length > 0 || project.engineering.length > 0;
  const others = projects.filter((p) => p.slug !== project.slug);
  const screens = desktopGroups(project.shots);
  const phones = project.shots.filter((s) => s.kind === "phone");

  return (
    <motion.div exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }} className="mt-14 space-y-14 sm:mt-20 sm:space-y-16">
      <Block label="Le problème" delay={0.5}>
        <p className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.03em] text-fg">{project.problem}</p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
      </Block>

      <Block label="Le produit" delay={0.6}>
        <div className="grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2">
          {project.features.map((feature) => (
            <div key={feature.title} className="bg-bg-elevated p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <HexBullet filled className="h-2.5 w-2.5" />
                <h4 className="font-semibold tracking-tight">{feature.title}</h4>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </Block>

      {(hasRoles || project.stack.length > 0) && (
        <Block label="Mon rôle" delay={0.7}>
          <div className="grid gap-10 md:grid-cols-2">
            {project.product.length > 0 && <Facet side="produit" items={project.product} />}
            {project.engineering.length > 0 && <Facet side="code" items={project.engineering} />}
          </div>
          {project.stack.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-1.5">
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
          )}
        </Block>
      )}

      <Block label="Écrans" delay={0.75}>
        <div className="space-y-10">
          {screens.map((group) => (
            <Reveal key={group[0].src} y={24}>
              <figure>
                <DesktopShot shots={group} title={group[0].label ?? project.fullName ?? project.title} sizes="(min-width: 1024px) 60vw, 92vw" />
                <figcaption className="mt-3.5 text-sm text-muted">
                  {group[0].caption}
                  {group.length > 1 && <span className="text-subtle"> · suit le thème clair ou sombre du site</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
          {phones.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {phones.map((shot, i) => (
                <Reveal key={shot.src} y={24} delay={i * 0.06}>
                  <figure
                    className="flex h-full flex-col items-center rounded-[22px] border border-line p-3 pt-6 sm:p-7"
                    style={{ background: `radial-gradient(70% 60% at 50% 40%, ${project.accent}1f, transparent 75%)` }}
                  >
                    <PhoneShot shot={shot} sizes="(min-width: 1024px) 20vw, 42vw" className="h-[clamp(210px,50vw,520px)]" />
                    <figcaption className="mt-4 text-center text-xs text-muted sm:text-sm">{shot.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Block>

      <Block label="Autres études de cas" delay={0.8}>
        <div className="grid gap-3 sm:grid-cols-2">
          {others.map((other) => (
            <button
              key={other.slug}
              type="button"
              onClick={() => onOpen(other.slug)}
              className="group flex items-center gap-4 rounded-[18px] border border-line p-3 text-left transition-colors hover:border-line-strong hover:bg-fg/[0.02]"
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-semibold"
                style={{
                  background: `color-mix(in oklab, ${other.accent} 18%, transparent)`,
                  color: `color-mix(in oklab, ${other.accent} 50%, var(--fg))`,
                }}
              >
                {other.title.slice(0, 2)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold tracking-tight">{other.title}</span>
                <span className="block truncate text-sm text-muted">{other.category}</span>
              </span>
              <ArrowRight className="mr-2 h-4 w-4 text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-fg" />
            </button>
          ))}
        </div>
      </Block>
    </motion.div>
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
      <div className="flex items-center gap-3">
        {label}
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <HexBullet className="mt-[0.55em]" filled={side === "code"} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
