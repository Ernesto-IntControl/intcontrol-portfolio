import Reveal from "@/src/components/ui/Reveal";
import { services } from "@/src/data/services";

export default function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <Reveal key={s.title} delay={(i % 2) * 0.05}>
            <div className="card card-hover h-full p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <h3 className="mt-3 text-[15px] font-semibold">{s.title}</h3>
              <p className="mt-1 text-[13.5px] leading-snug text-muted">{s.description}</p>
              {detailed && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="chip">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
