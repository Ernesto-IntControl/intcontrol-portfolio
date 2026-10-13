import { ArrowUpRight } from "lucide-react";
import Reveal from "@/src/components/ui/Reveal";
import { experience } from "@/src/data/profile";
import { cn } from "@/src/lib/utils";

export default function ExperienceList({ className }: { className?: string }) {
  return (
    <div className={cn("panel overflow-hidden rounded-3xl", className)}>
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <p className="eyebrow">Parcours</p>
      </div>
      <ol>
        {experience.map((item, i) => (
          <Reveal key={item.company} delay={i * 0.08} blur={false} y={16}>
            <li className="group relative grid gap-3 border-b border-line px-6 py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      {item.company}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-sm text-accent">{item.company}</span>
                  )}
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <span className="chip h-fit self-start">
                {item.current && <span className="h-1.5 w-1.5 pulse-dot rounded-full bg-accent" />}
                {item.period}
              </span>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
