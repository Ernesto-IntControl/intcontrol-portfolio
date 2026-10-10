import VelocityMarquee from "@/src/components/ui/VelocityMarquee";
import { marqueeStack } from "@/src/data/skills";
import { techIcons } from "@/src/lib/techIcons";

export default function StackMarquee() {
  return (
    <section aria-label="Technologies" className="relative border-y border-line bg-bg-elevated/50 py-6 sm:py-8">
      <VelocityMarquee baseVelocity={-1.6} className="mask-fade-x">
        {marqueeStack.map((tech, i) => {
          const Icon = techIcons[tech];
          return (
            <span key={tech} className="flex items-center gap-4 pr-10 sm:gap-6 sm:pr-16">
              {Icon && <Icon className="h-7 w-7 text-accent sm:h-10 sm:w-10" />}
              <span
                className={
                  i % 2 === 0
                    ? "whitespace-nowrap text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-6xl"
                    : "text-outline whitespace-nowrap text-4xl font-semibold tracking-[-0.04em] sm:text-6xl"
                }
              >
                {tech}
              </span>
            </span>
          );
        })}
      </VelocityMarquee>
    </section>
  );
}
