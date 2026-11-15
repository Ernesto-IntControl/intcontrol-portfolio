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
}

/** En-tête de section : repère mono qui se décode, titre révélé mot à mot, introduction à droite. */
export default function SectionHeading({ index, label, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <Scramble text={label} />
        </p>
        <RevealText
          as="h2"
          text={title}
          className="text-[clamp(2.25rem,5.4vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em]"
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
