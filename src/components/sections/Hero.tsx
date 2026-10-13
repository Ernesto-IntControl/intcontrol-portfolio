import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import HeroVisual from "@/src/components/three/HeroVisual";
import Magnetic from "@/src/components/ui/Magnetic";
import RevealText from "@/src/components/ui/RevealText";
import { profile } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { useScrollTo } from "@/src/providers/SmoothScroll";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } },
  transition: { duration: 1.1, delay, ease: EASE_OUT_EXPO },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const time = useLocalTime(profile.timeZone);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 mask-radial" aria-hidden />
      <HeroVisual progress={scrollYProgress} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex flex-1 flex-col pt-[44svh] lg:pt-36"
      >
        <div className="order-2 max-w-xl lg:order-1">
          <motion.div {...fadeUp(0.2)}>
            <span className="chip !bg-bg/60 backdrop-blur">
              <span className="h-1.5 w-1.5 pulse-dot rounded-full bg-accent" />
              {profile.role} · {profile.company}
            </span>
          </motion.div>

          <RevealText
            as="p"
            trigger="mount"
            delay={0.45}
            stagger={0.03}
            className="mt-6 text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.03em] text-fg"
            text={[
              { text: "Je conçois des produits web et mobiles " },
              { text: "ultra-fluides,", className: "serif-accent text-accent" },
              { text: " de l'API NestJS au front Next.js et aux apps Expo." },
            ]}
          />

          <motion.div {...fadeUp(0.9)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button type="button" onClick={() => scrollTo("#projets", { offset: -40 })} className="btn-primary group">
                Voir mes projets
                <ArrowDownRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]" />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link to="/contact" className="btn-ghost group backdrop-blur">
                Me contacter
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.h1
          style={{ y: wordmarkY }}
          className="@container order-1 mb-6 select-none lg:order-2 lg:mb-0 lg:mt-auto lg:pt-10"
        >
          <motion.span {...fadeUp(0.35)} className="eyebrow mb-3 block lg:mb-1">
            {profile.name} — {profile.headline}
          </motion.span>
          <span className="sr-only">{profile.alias}</span>
          <span aria-hidden className="wordmark-fit block font-semibold leading-[0.8] tracking-[-0.065em] [perspective:800px]">
            {profile.alias.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block origin-bottom bg-linear-to-b from-fg from-30% to-fg/30 bg-clip-text pb-[0.06em] text-transparent"
                initial={{ y: "70%", rotateX: -90, opacity: 0 }}
                animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.25 + i * 0.055, ease: EASE_OUT_EXPO }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="container-x relative z-10 pb-5"
      >
        <div className="flex items-center justify-between gap-4 whitespace-nowrap border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:text-[11px] sm:tracking-[0.16em]">
          <span>
            Kolwezi, RDC <span className="text-subtle">·</span> {time}
          </span>
          <button
            type="button"
            onClick={() => scrollTo(window.innerHeight)}
            className="hidden items-center gap-3 transition-colors hover:text-fg sm:flex"
          >
            Défiler
            <span className="relative block h-6 w-px overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-x-0 top-0 h-2 bg-fg"
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: EASE_OUT_EXPO }}
              />
            </span>
          </button>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {profile.availability}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
