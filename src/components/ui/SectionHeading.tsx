import RevealText, { type Segment } from "./RevealText";
import Reveal from "./Reveal";
import { cn } from "@/src/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: Segment[];
  intro?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export default function SectionHeading({
  index,
  label,
  title,
  intro,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal blur={false} y={12}>
        <p className={cn("eyebrow mb-5 flex items-center gap-3", centered && "justify-center")}>
          <span className="text-accent">({index})</span>
          <span className="h-px w-8 bg-line-strong" />
          {label}
        </p>
      </Reveal>
      <RevealText
        as={as}
        text={title}
        className={cn(
          "font-semibold leading-[0.98]",
          as === "h1" ? "text-[clamp(2.75rem,8vw,6.5rem)]" : "text-[clamp(2.25rem,5.6vw,4.5rem)]",
        )}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg", centered && "mx-auto")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
