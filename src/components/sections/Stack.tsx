import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { skillGroups } from "@/src/data/skills";
import { techIcons } from "@/src/lib/techIcons";

export default function Stack() {
  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Stack"
          title={[{ text: "Les outils " }, { text: "du quotidien.", className: "serif-accent text-accent" }]}
          intro="Le web moderne en JavaScript en tête, .NET quand le projet l'exige."
        />

        <div className="mt-14 border-t border-line sm:mt-20">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05} y={14}>
              <div className="grid gap-5 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                  <p className="font-mono text-xs text-accent">0{i + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted">{group.description}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-8">
                  {group.items.map((item) => {
                    const Icon = techIcons[item];
                    return (
                      <li
                        key={item}
                        className="group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-fg/90 transition-colors duration-300 hover:border-accent/50"
                      >
                        {Icon && (
                          <Icon className="h-3.5 w-3.5 text-muted transition-[color,transform] duration-500 ease-out-expo group-hover:-rotate-12 group-hover:text-accent" />
                        )}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
