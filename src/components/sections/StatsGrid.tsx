import CountUp from "@/src/components/ui/CountUp";
import Reveal from "@/src/components/ui/Reveal";
import TiltCard, { Depth } from "@/src/components/ui/TiltCard";
import { stats } from "@/src/data/profile";
import { cn } from "@/src/lib/utils";

export default function StatsGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-2 sm:gap-3", className)}>
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08}>
          <TiltCard className="h-full rounded-2xl sm:rounded-3xl" max={12}>
            <div className="flex h-full flex-col justify-between gap-5 p-4 sm:gap-8 sm:p-6">
              <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
              <Depth z={40}>
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="block whitespace-nowrap text-2xl font-semibold tracking-[-0.05em] text-fg sm:text-5xl"
                />
                <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
              </Depth>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
