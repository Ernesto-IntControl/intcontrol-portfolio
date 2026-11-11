import { skillGroups } from "@/src/data/skills";
import { techIcons } from "@/src/lib/techIcons";

export default function SkillsGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skillGroups.map((g) => (
        <div key={g.title} className="card p-4">
          <h3 className="text-[15px] font-semibold">{g.title}</h3>
          <p className="mt-0.5 text-[13px] text-muted">{g.description}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {g.items.map((item) => {
              const Icon = techIcons[item];
              return (
                <li key={item} className="chip">
                  {Icon && <Icon className="h-3 w-3" />}
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
