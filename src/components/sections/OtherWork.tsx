import { ArrowUpRight } from "lucide-react";
import Reveal from "@/src/components/ui/Reveal";
import Screenshot from "@/src/components/ui/Screenshot";
import type { OtherWork } from "@/src/data/projects";
import { cn } from "@/src/lib/utils";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Pastille de statut : « En cours » (pulsation) ou « Site vitrine ». */
export function StatusChip({ kind }: { kind: OtherWork["kind"] }) {
  return kind === "en-cours" ? (
    <span className="chip">
      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400" />
      En cours
    </span>
  ) : (
    <span className="chip">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      Site vitrine
    </span>
  );
}

/** Grille des autres réalisations (produits en cours, sites vitrines). */
export default function OtherWorkGrid({ items, className, wide }: { items: OtherWork[]; className?: string; wide?: boolean }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", !wide && "lg:grid-cols-4", className)}>
      {items.map((item, i) => (
        <Reveal key={item.name} delay={i * 0.06} y={20} className="h-full">
          <OtherWorkCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

function OtherWorkCard({ item }: { item: OtherWork }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-strong">
        {item.shot ? (
          <Screenshot
            shot={item.shot}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          // Pas encore de capture : le nom en filigrane sur une trame discrète
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(var(--dot)_1px,transparent_1px)] [background-size:14px_14px]">
            <span className="font-mono text-2xl font-medium tracking-[-0.04em] text-fg/25 transition-colors duration-500 group-hover:text-fg/40">
              {item.name.toLowerCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip kind={item.kind} />
          {item.by && <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">{item.by}</span>}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {item.description ?? "Présentation à venir."}
        </p>
        {item.url && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-fg">
            <span className="link-underline pb-0.5">{host(item.url)}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </>
  );

  const cardClass = "group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-colors duration-300";
  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={cn(cardClass, "hover:border-line-strong")}>
      {body}
    </a>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}
