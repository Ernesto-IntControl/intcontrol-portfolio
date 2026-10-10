import Reveal from "@/src/components/ui/Reveal";
import { skillGroups } from "@/src/data/skills";
import { techIcons } from "@/src/lib/techIcons";

export default function SkillsGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group, i) => (
        <Reveal key={group.title} delay={i * 0.06} blur={false} className="bg-bg-elevated p-7">
          <p className="font-mono text-xs text-accent">0{i + 1}</p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">{group.title}</h3>
          <p className="mt-1 text-sm text-muted">{group.description}</p>
          <ul className="mt-6 space-y-2.5">
            {group.items.map((item) => {
              const Icon = techIcons[item];
              return (
                <li key={item} className="group flex items-center gap-3 text-sm text-fg/90">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
