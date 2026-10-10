import Reveal from "@/src/components/ui/Reveal";
import TiltCard, { Depth } from "@/src/components/ui/TiltCard";
import { services } from "@/src/data/services";
import { cn } from "@/src/lib/utils";

/** Grille de services ; chaque icône est une « touche » en relief qui flotte au-dessus de la carte. */
export default function ServicesGrid({ detailed = false, className }: { detailed?: boolean; className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <Reveal key={service.title} delay={(i % 2) * 0.08}>
            <TiltCard className="group h-full rounded-[28px]" max={7}>
              <div className="flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-start justify-between">
                  <Depth z={60}>
                    <span className="keycap flex h-14 w-14 items-center justify-center rounded-2xl text-accent-fg transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                  </Depth>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <Depth z={30} className="mt-10">
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{service.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{service.description}</p>
                </Depth>
                <ul className={cn("mt-6 flex flex-wrap gap-2", !detailed && "mt-auto pt-6")}>
                  {service.features.map((feature) => (
                    <li key={feature} className="chip">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        );
      })}
    </div>
  );
}
