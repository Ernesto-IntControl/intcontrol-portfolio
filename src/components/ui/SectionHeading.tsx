import type { ReactNode } from "react";
import Reveal from "./Reveal";
import RevealText, { type Segment } from "./RevealText";
import Scramble from "./Scramble";
import { cn } from "@/src/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: Segment[];
  intro?: ReactNode;
  className?: string;
  /** h1 en haut de page (animé au chargement), h2 pour une section. */
  as?: "h1" | "h2";
}

/** En-tête de section : repère mono qui se décode, titre révélé mot à mot, introduction à droite. */
export default function SectionHeading({ index, label, title, intro, className, as = "h2" }: SectionHeadingProps) {
  const page = as === "h1";
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <Scramble text={label} trigger={page ? "mount" : "view"} />
        </p>
        <RevealText
          as={as}
          text={title}
          trigger={page ? "mount" : "view"}
          delay={page ? 0.1 : 0}
          className={cn(
            "font-semibold leading-[1] tracking-[-0.045em]",
            page ? "text-[clamp(2.6rem,6.6vw,5.5rem)]" : "text-[clamp(2.25rem,5.4vw,4.25rem)]",
          )}
        />
      </div>
      {intro && (
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
