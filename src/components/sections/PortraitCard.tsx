import { MapPin } from "lucide-react";
import ProgressiveImage from "@/src/components/ui/ProgressiveImage";
import TiltCard, { Depth } from "@/src/components/ui/TiltCard";
import { profile } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { cn } from "@/src/lib/utils";

/** Portrait en carte 3D : la photo reste dans le plan, les étiquettes flottent devant. */
export default function PortraitCard({ className }: { className?: string }) {
  const time = useLocalTime(profile.timeZone);

  return (
    <TiltCard className={cn("rounded-[32px]", className)} surfaceClassName="panel" max={7}>
      <div className="p-3">
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-surface-strong">
          <ProgressiveImage
            {...profile.portrait}
            alt={`Portrait de ${profile.name}`}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 90vw"
            className="h-full w-full transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{profile.alias}</p>
            <p className="text-xl font-semibold tracking-tight">{profile.name}</p>
          </div>
        </div>
      </div>

      <Depth z={70} className="absolute right-3 top-8 sm:-right-6">
        <div className="glass flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span className="text-fg">Kolwezi, RDC</span>
          <span className="font-mono text-muted">{time}</span>
        </div>
      </Depth>

      <Depth z={110} className="absolute left-3 top-[42%] sm:-left-8">
        <div className="glass rounded-2xl px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Poste actuel</p>
          <p className="mt-0.5 text-sm font-semibold text-fg">{profile.role}</p>
          <p className="text-xs text-accent">@ {profile.company}</p>
        </div>
      </Depth>
    </TiltCard>
  );
}
