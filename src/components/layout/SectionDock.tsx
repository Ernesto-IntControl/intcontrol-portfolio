import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

export interface DockSection {
  id: string;
  label: string;
}

/** Fait défiler jusqu'à une section, en laissant la place de la navigation. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
}

/**
 * Sommaire flottant d'une page : ses sections, celle en cours mise en valeur
 * (la pastille glisse de l'une à l'autre) et la progression de lecture.
 * Il apparaît une fois l'en-tête dépassé et s'efface à l'approche du pied de page.
 */
export default function SectionDock({ sections }: { sections: DockSection[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((el) => spy.observe(el));

    const onScroll = () => {
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      setVisible(window.scrollY > window.innerHeight * 0.45 && footerTop > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Sections de la page"
          initial={{ y: 24, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 24, opacity: 0, x: "-50%" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="fixed bottom-4 left-1/2 z-40 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-full border border-line bg-bg/80 p-1 shadow-[var(--shadow-float)] backdrop-blur-xl sm:bottom-6"
        >
          <ul className="flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none]">
            {sections.map((section, i) => {
              const current = active === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "relative isolate flex min-h-9 items-center gap-2 whitespace-nowrap rounded-full px-3 text-xs transition-colors duration-300 sm:px-3.5",
                      current ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {current && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/[0.08] ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                    {section.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <motion.span aria-hidden className="absolute inset-x-4 bottom-0 h-px origin-left bg-accent/70" style={{ scaleX: progress }} />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
