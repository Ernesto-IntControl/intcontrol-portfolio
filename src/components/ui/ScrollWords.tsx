import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/src/lib/utils";

interface ScrollWordsProps {
  text: string;
  className?: string;
  /** Mots (sans ponctuation) mis en valeur avec la couleur d'accent. */
  highlight?: string[];
}

/** Paragraphe dont les mots s'allument au fil du scroll. */
export default function ScrollWords({ text, className, highlight = [] }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("relative flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = w.replace(/[.,;:!?]/g, "").split(/['’]/).pop() ?? w;
        const isAccent = highlight.includes(clean);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={isAccent}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span aria-hidden className="relative mr-[0.25em]">
      <motion.span style={{ opacity }} className={accent ? "text-accent" : undefined}>
        {children}
      </motion.span>
    </span>
  );
}
