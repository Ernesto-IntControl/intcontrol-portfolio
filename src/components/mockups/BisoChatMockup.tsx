import { motion } from "motion/react";
import { Bell, Heart, Home, MessageCircle, PlusSquare, Search, Send, User } from "lucide-react";
import { Depth } from "@/src/components/ui/TiltCard";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { FloatChip, Phone } from "./Devices";

const stories = ["Vous", "Grâce", "Patrick", "Sarah", "Jo"];

export default function BisoChatMockup({ accent }: { accent: string }) {
  const ring = `conic-gradient(from 200deg, ${accent}, #ec4899, #f59e0b, ${accent})`;

  return (
    <div className="preserve-3d relative h-[560px] w-[440px]">
      <div className="preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Phone>
          <div className="absolute inset-0 flex flex-col pt-11">
            <div className="flex items-center justify-between px-5 py-2">
              <p className="text-[18px] font-semibold tracking-tight text-fg">
                Biso<span style={{ color: accent }}>Chat</span>
              </p>
              <div className="flex gap-3 text-fg">
                <Bell className="h-4 w-4" />
                <Send className="h-4 w-4" />
              </div>
            </div>

            {/* Stories */}
            <div className="flex gap-3 px-5 pb-3 pt-1">
              {stories.map((name, i) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <div className="rounded-full p-[2px]" style={{ background: i === 0 ? "var(--line-strong)" : ring }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-elevated bg-surface-strong text-[11px] font-semibold text-muted">
                      {name[0]}
                    </div>
                  </div>
                  <span className="text-[9px] text-muted">{name}</span>
                </div>
              ))}
            </div>

            {/* Publication */}
            <div className="mx-3 overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="flex items-center gap-2 p-2.5">
                <div className="h-7 w-7 rounded-full" style={{ background: ring }} />
                <div>
                  <p className="text-[11px] font-semibold text-fg">Grâce M.</p>
                  <p className="text-[9px] text-subtle">il y a 2 min · Kolwezi</p>
                </div>
              </div>
              <div
                className="relative h-[150px] overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${accent}, #ec4899 60%, #f59e0b)` }}
              >
                <motion.div
                  className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.4),transparent)]"
                  animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
                  Soirée tech · 18h
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 text-fg">
                <Heart className="h-4 w-4" fill={accent} stroke={accent} />
                <MessageCircle className="h-4 w-4" />
                <Send className="h-4 w-4" />
                <span className="ml-auto text-[10px] text-muted">128 j'aime</span>
              </div>
            </div>

            {/* Barre d'onglets */}
            <div className="mt-auto flex items-center justify-around border-t border-line px-4 pb-6 pt-3 text-muted">
              <Home className="h-[18px] w-[18px] text-fg" />
              <Search className="h-[18px] w-[18px]" />
              <PlusSquare className="h-[18px] w-[18px]" />
              <MessageCircle className="h-[18px] w-[18px]" />
              <User className="h-[18px] w-[18px]" />
            </div>
          </div>
        </Phone>
      </div>

      <Depth z={95} className="absolute left-[-8px] top-[120px]">
        <FloatChip className="max-w-[210px]">
          <div className="h-8 w-8 shrink-0 rounded-full bg-surface-strong text-center text-[12px] font-semibold leading-8 text-muted">P</div>
          <div>
            <p className="text-[11px] font-semibold">Patrick K.</p>
            <p className="text-[11px] text-muted">On se retrouve à 18h ?</p>
          </div>
        </FloatChip>
      </Depth>

      <Depth z={65} className="absolute bottom-[96px] right-[-4px]">
        <FloatChip>
          <span className="flex gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent, animation: `typing 1.2s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </span>
          <span className="text-[11px] text-muted">Sarah écrit…</span>
        </FloatChip>
      </Depth>

      <Depth z={120} className="absolute right-[34px] top-[48px]">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.6 }}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-white"
          style={{ background: accent, boxShadow: `0 12px 30px -8px ${accent}` }}
        >
          <Heart className="h-3.5 w-3.5" fill="currentColor" /> 128
        </motion.div>
      </Depth>
    </div>
  );
}
