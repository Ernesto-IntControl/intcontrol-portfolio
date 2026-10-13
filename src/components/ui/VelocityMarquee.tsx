import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface VelocityMarqueeProps {
  children: ReactNode;
  /** Vitesse de base en % par seconde (négatif = vers la gauche). */
  baseVelocity?: number;
  className?: string;
}

const COPIES = 4;

/** Bandeau infini qui accélère et s'incline avec la vitesse de scroll. */
export default function VelocityMarquee({ children, baseVelocity = -2.5, className }: VelocityMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-2500, 2500], [10, -10], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: reduce ? 0 : skewX }}>
        {Array.from({ length: COPIES }, (_, i) => (
          <div key={i} className="flex shrink-0 flex-nowrap" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
