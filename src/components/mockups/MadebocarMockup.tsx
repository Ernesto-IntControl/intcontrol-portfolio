import { motion } from "motion/react";
import { Check, Clock3, MapPin, Search, Star } from "lucide-react";
import { Depth } from "@/src/components/ui/TiltCard";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { FloatChip, Phone } from "./Devices";

// Tracé de la course, partagé par le SVG et la voiture (offset-path)
const ROUTE = "M 52 280 L 52 262 Q 52 250 64 250 L 154 250 Q 166 250 166 238 L 166 166 Q 166 154 178 154 L 206 154";

export default function MadebocarMockup({ accent }: { accent: string }) {
  return (
    <div className="preserve-3d relative h-[560px] w-[440px]">
      <div className="preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Phone>
          {/* Carte stylisée */}
          <svg viewBox="0 0 244 520" className="absolute inset-0 h-full w-full" aria-hidden>
            <rect width="244" height="520" className="fill-surface-strong" />
            <rect x="68" y="168" width="84" height="68" rx="10" fill={accent} opacity="0.1" />
            <rect x="180" y="168" width="56" height="68" rx="10" fill={accent} opacity="0.06" />
            <g className="stroke-white dark:stroke-white/[0.07]" strokeWidth="14" strokeLinecap="round" fill="none">
              <path d="M 52 0 V 520" />
              <path d="M 166 0 V 520" />
              <path d="M 0 154 H 244" />
              <path d="M 0 250 H 244" />
              <path d="M 0 400 L 244 350" />
            </g>
            <g className="stroke-white dark:stroke-white/[0.05]" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M 110 0 V 520" />
              <path d="M 0 204 H 244" />
              <path d="M 0 110 H 244" />
              <path d="M 220 0 V 520" />
            </g>
            <motion.path
              d={ROUTE}
              fill="none"
              stroke={accent}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
            />
            <circle cx="52" cy="280" r="7" fill={accent} />
            <circle cx="52" cy="280" r="3" className="fill-bg-elevated" />
          </svg>

          {/* Destination */}
          <div className="absolute left-[194px] top-[131px]">
            <MapPin className="h-6 w-6" fill="currentColor" strokeWidth={1.5} style={{ color: accent }} />
          </div>

          {/* Voiture qui suit le tracé */}
          <div
            className="absolute left-0 top-0 h-[22px] w-[12px] rounded-[4px] border-2 border-white"
            style={{
              background: accent,
              offsetPath: `path("${ROUTE}")`,
              offsetRotate: "auto 90deg",
              animation: "drive 7s cubic-bezier(0.65, 0, 0.35, 1) infinite alternate",
              boxShadow: `0 4px 14px ${accent}88`,
            }}
          />

          {/* Recherche */}
          <div className="absolute inset-x-4 top-12 flex items-center gap-2.5 rounded-2xl border border-line bg-bg-elevated/95 px-3.5 py-3 text-[12px] text-muted shadow-lg backdrop-blur">
            <Search className="h-4 w-4 text-fg" />
            Où allez-vous ?
          </div>

          {/* Fiche chauffeur */}
          <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] border-t border-line bg-bg-elevated px-5 pb-7 pt-3 shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.35)]">
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-line-strong" />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] text-muted">Votre chauffeur arrive</p>
                <p className="text-[22px] font-semibold leading-tight tracking-tight text-fg">3 min</p>
              </div>
              <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: `${accent}22`, color: accent }}>
                En route
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-strong/70 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold text-white" style={{ background: accent }}>
                JM
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-fg">Jean M.</p>
                <p className="flex items-center gap-1 text-[10px] text-muted">
                  <Star className="h-2.5 w-2.5" fill="currentColor" /> 4,9 · Toyota Corolla
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-xl py-2.5 text-center text-[12px] font-semibold text-black" style={{ background: accent }}>
              Suivre la course
            </div>
          </div>
        </Phone>
      </div>

      <Depth z={90} className="absolute right-0 top-[92px]">
        <FloatChip>
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-black" style={{ background: accent }}>
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <span>
            <span className="block font-semibold">Course confirmée</span>
            <span className="block text-[10px] text-muted">Prise en charge à 9:44</span>
          </span>
        </FloatChip>
      </Depth>

      <Depth z={60} className="absolute bottom-[110px] left-0">
        <FloatChip>
          <Clock3 className="h-4 w-4" style={{ color: accent }} />
          <span className="font-mono text-[11px]">ETA · 3 min</span>
        </FloatChip>
      </Depth>
    </div>
  );
}
