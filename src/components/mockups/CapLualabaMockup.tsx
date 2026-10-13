import { motion } from "motion/react";
import { Compass, Landmark, Mountain, Navigation, Search, Star, TreePine, Waves } from "lucide-react";
import { Depth } from "@/src/components/ui/TiltCard";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { FloatChip, Phone } from "./Devices";

const WATER = "#38bdf8";
const ME = "#3b82f6";

// Itinéraire de la position de l'utilisateur jusqu'au site sélectionné
const ROUTE = "M 156 326 Q 156 306 140 292 L 112 270 Q 98 258 98 244 Q 98 226 86 216";

const pins = [
  { x: 192, y: 200, Icon: Mountain },
  { x: 44, y: 300, Icon: TreePine },
  { x: 196, y: 312, Icon: Landmark },
];

const filters = ["Sites", "Nature", "Hôtels"];

export default function CapLualabaMockup({ accent }: { accent: string }) {
  return (
    <div className="preserve-3d relative h-[560px] w-[440px]">
      <div className="preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Phone>
          {/* Carte stylisée : relief, lac, rivière et routes */}
          <svg viewBox="0 0 244 520" className="absolute inset-0 h-full w-full" aria-hidden>
            <rect width="244" height="520" className="fill-surface-strong" />
            <g className="stroke-black/[0.07] dark:stroke-white/[0.06]" strokeWidth="1.2" fill="none">
              <path d="M 150 150 C 190 120 250 140 250 190 C 250 240 200 262 168 240 C 140 220 122 172 150 150 Z" />
              <path d="M 162 168 C 190 148 228 162 228 192 C 228 222 198 236 178 222 C 160 210 146 182 162 168 Z" />
              <path d="M 176 184 C 192 174 210 182 210 196 C 210 210 194 216 184 208 C 174 200 168 190 176 184 Z" />
              <path d="M -10 400 C 40 370 80 390 110 420 C 140 450 120 520 60 530" />
              <path d="M -10 424 C 30 402 64 416 86 440 C 108 464 96 520 50 530" />
            </g>
            <path
              d="M 30 168 C 42 138 90 130 112 152 C 130 170 118 196 96 208 C 76 218 58 232 40 222 C 20 210 22 188 30 168 Z"
              fill={WATER}
              opacity="0.28"
            />
            <path
              d="M 60 214 C 54 250 20 268 26 300 C 32 338 70 350 64 392 C 58 432 22 452 20 520"
              fill="none"
              stroke={WATER}
              strokeOpacity="0.35"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <g className="stroke-white dark:stroke-white/[0.07]" strokeWidth="12" strokeLinecap="round" fill="none">
              <path d="M 156 520 V 326 Q 156 306 140 292 L 110 266" />
              <path d="M 0 452 C 80 430 170 450 244 410" />
            </g>
            <g className="stroke-white dark:stroke-white/[0.05]" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M 98 266 V 228" />
              <path d="M 156 340 L 244 300" />
              <path d="M 0 330 L 98 300" />
              <path d="M 196 520 V 360" />
            </g>
            {/* Tracé de l'itinéraire, liseré clair puis couleur du produit */}
            <motion.path
              d={ROUTE}
              fill="none"
              className="stroke-bg-elevated"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
            />
            <motion.path
              d={ROUTE}
              fill="none"
              stroke={accent}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
            />
          </svg>

          {/* Autres sites touristiques */}
          {pins.map(({ x, y, Icon }) => (
            <div
              key={`${x}-${y}`}
              className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full rounded-br-none border-2 border-bg-elevated text-white shadow-md [rotate:45deg]"
              style={{ left: x, top: y, background: accent }}
            >
              <Icon className="h-3.5 w-3.5 [rotate:-45deg]" strokeWidth={2.4} />
            </div>
          ))}

          {/* Site sélectionné */}
          <div className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ left: 84, top: 214 }}>
            <span className="mb-1.5 whitespace-nowrap rounded-full bg-bg-elevated px-2.5 py-1 text-[10px] font-semibold text-fg shadow-md">
              Lac Nzilo
            </span>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full rounded-br-none border-[2.5px] border-bg-elevated text-white shadow-lg [rotate:45deg]"
              style={{ background: accent, boxShadow: `0 8px 20px ${accent}66` }}
            >
              <Waves className="h-4 w-4 [rotate:-45deg]" strokeWidth={2.4} />
            </div>
          </div>

          {/* Position de l'utilisateur */}
          <div className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2" style={{ left: 156, top: 326 }}>
            <span className="pulse-dot absolute inset-0 rounded-full" style={{ background: `${ME}55` }} />
            <span className="absolute inset-0 rounded-full border-[3px] border-white shadow-md" style={{ background: ME }} />
          </div>

          {/* Recherche et filtres */}
          <div className="absolute inset-x-4 top-12">
            <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-bg-elevated/95 px-3.5 py-3 text-[12px] text-muted shadow-lg backdrop-blur">
              <Search className="h-4 w-4 text-fg" />
              Explorer le Lualaba
            </div>
            <div className="mt-2 flex gap-1.5">
              {filters.map((label, i) => (
                <span
                  key={label}
                  className={
                    i === 0
                      ? "rounded-full px-3 py-1.5 text-[10px] font-semibold text-white shadow-md"
                      : "rounded-full border border-line bg-bg-elevated/95 px-3 py-1.5 text-[10px] font-medium text-muted shadow-sm"
                  }
                  style={i === 0 ? { background: accent } : undefined}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Fiche du site */}
          <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] border-t border-line bg-bg-elevated px-5 pb-7 pt-3 shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.35)]">
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-line-strong" />
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                style={{ background: `linear-gradient(140deg, ${WATER}, #0e7490)` }}
              >
                <Waves className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-tight tracking-tight text-fg">Lac Nzilo</p>
                <p className="mt-0.5 text-[10px] text-muted">Site naturel · Kolwezi</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-fg">
                <Star className="h-3 w-3" fill="currentColor" style={{ color: "#f5a524" }} /> 4,8
              </span>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
              <div className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-semibold text-white" style={{ background: accent }}>
                <Navigation className="h-3.5 w-3.5" fill="currentColor" />
                Itinéraire
              </div>
              <div className="flex items-center rounded-xl border border-line px-4 text-[12px] font-medium text-fg">Détails</div>
            </div>
          </div>
        </Phone>
      </div>

      <Depth z={90} className="absolute right-0 top-[236px]">
        <FloatChip>
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: accent }}>
            <Compass className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span>
            <span className="block font-semibold">Itinéraire prêt</span>
            <span className="block text-[10px] text-muted">Depuis votre position</span>
          </span>
        </FloatChip>
      </Depth>

      <Depth z={60} className="absolute bottom-[118px] left-0">
        <FloatChip>
          <span className="flex -space-x-1.5">
            {[Mountain, TreePine, Landmark].map((Icon, i) => (
              <span
                key={i}
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-bg-elevated text-white"
                style={{ background: accent }}
              >
                <Icon className="h-2.5 w-2.5" strokeWidth={2.6} />
              </span>
            ))}
          </span>
          <span className="font-mono text-[11px]">À proximité</span>
        </FloatChip>
      </Depth>
    </div>
  );
}
