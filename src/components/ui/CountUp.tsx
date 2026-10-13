import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { useIntro } from "@/src/providers/IntroProvider";

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const { revealed } = useIntro();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || !revealed || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, revealed, reduce, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
