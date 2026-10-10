import { BatteryFull, Signal, Wifi } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

/** Téléphone en CSS pur : châssis, boutons latéraux, Dynamic Island, barre d'état. */
export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("relative h-[540px] w-[264px] rounded-[48px] bg-[#0a0c10] p-[10px]", className)}
      style={{
        boxShadow:
          "inset 0 0 0 1.5px rgb(255 255 255 / 0.14), inset 0 0 0 7px #040506, 0 50px 90px -35px rgb(0 0 0 / 0.6), 0 20px 40px -20px rgb(0 0 0 / 0.4)",
      }}
    >
      <span className="absolute -left-[3px] top-[96px] h-7 w-[3px] rounded-l-sm bg-[#1c2026]" />
      <span className="absolute -left-[3px] top-[140px] h-12 w-[3px] rounded-l-sm bg-[#1c2026]" />
      <span className="absolute -right-[3px] top-[150px] h-16 w-[3px] rounded-r-sm bg-[#1c2026]" />
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-bg-elevated">
        <div className="absolute left-1/2 top-[9px] z-30 h-[24px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 pt-[13px] text-[11px] font-semibold text-fg">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" strokeWidth={2.5} />
            <Wifi className="h-3 w-3" strokeWidth={2.5} />
            <BatteryFull className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>
        {children}
        <div className="absolute bottom-[7px] left-1/2 z-30 h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-fg/80" />
      </div>
      {/* Reflet sur l'écran */}
      <div className="pointer-events-none absolute inset-[10px] rounded-[38px] bg-linear-to-br from-white/10 via-transparent to-transparent" />
    </div>
  );
}

/** Fenêtre de navigateur minimaliste. */
export function Browser({ children, url, className }: { children: ReactNode; url: string; className?: string }) {
  return (
    <div
      className={cn("overflow-hidden rounded-[18px] border border-line-strong bg-bg-elevated", className)}
      style={{ boxShadow: "0 50px 90px -35px rgb(0 0 0 / 0.55), 0 20px 40px -20px rgb(0 0 0 / 0.35), inset 0 1px 0 var(--highlight)" }}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-md bg-bg/70 font-mono text-[10px] text-subtle">
          {url}
        </div>
        <div className="w-10" />
      </div>
      {children}
    </div>
  );
}

/** Petite carte flottante, placée hors du plan avec <Depth>. */
export function FloatChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-2xl border border-line-strong bg-bg-elevated/90 px-3.5 py-2.5 text-[12px] text-fg backdrop-blur-md",
        className,
      )}
      style={{ boxShadow: "var(--shadow-float), inset 0 1px 0 var(--highlight)" }}
    >
      {children}
    </div>
  );
}
