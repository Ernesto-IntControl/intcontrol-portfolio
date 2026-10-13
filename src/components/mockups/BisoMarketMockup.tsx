import { BadgeCheck, Building2, LayoutGrid, Search, Store, Users } from "lucide-react";
import { Depth } from "@/src/components/ui/TiltCard";
import { Browser, FloatChip } from "./Devices";

const rows = [
  { name: "Pharmacie Lumière", type: "Commerce", city: "Kolwezi", status: "Vérifié", initials: "PL" },
  { name: "Cabinet Mwamba", type: "Cabinet", city: "Lubumbashi", status: "En attente", initials: "CM" },
  { name: "Boutique Kanda", type: "Commerce", city: "Kolwezi", status: "Vérifié", initials: "BK" },
  { name: "Atelier Ngoy", type: "Artisan", city: "Likasi", status: "Vérifié", initials: "AN" },
];

const kpis = [
  { label: "Établissements", value: "1 248", icon: Building2 },
  { label: "Vérifiés", value: "1 032", icon: BadgeCheck },
  { label: "Ce mois-ci", value: "+86", icon: Users },
];

export default function BisoMarketMockup({ accent }: { accent: string }) {
  return (
    <div className="preserve-3d relative h-[460px] w-[600px]">
      <div className="preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Browser url="bisomarket.app/registre" className="w-[540px]">
          <div className="flex h-[330px]">
            {/* Barre latérale */}
            <aside className="flex w-12 flex-col items-center gap-3 border-r border-line bg-surface py-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ background: accent }}>
                B
              </span>
              {[LayoutGrid, Store, Building2, Users].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted"
                  style={i === 1 ? { background: `${accent}1f`, color: accent } : undefined}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              ))}
            </aside>

            <div className="flex-1 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted">BisoMarket</p>
                  <p className="text-[15px] font-semibold tracking-tight text-fg">Registre des établissements</p>
                </div>
                <div className="flex h-7 w-44 items-center gap-1.5 rounded-lg border border-line bg-bg px-2 text-[10px] text-subtle">
                  <Search className="h-3 w-3" /> Rechercher un commerce…
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {kpis.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-xl border border-line bg-surface p-2.5">
                    <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                    <p className="mt-1.5 text-[15px] font-semibold tabular-nums text-fg">{value}</p>
                    <p className="text-[9px] text-muted">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 overflow-hidden rounded-xl border border-line">
                <div className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr] bg-surface px-3 py-1.5 text-[9px] uppercase tracking-wider text-subtle">
                  <span>Nom</span>
                  <span>Type</span>
                  <span>Ville</span>
                  <span>Statut</span>
                </div>
                {rows.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr] items-center border-t border-line px-3 py-2 text-[10.5px]"
                  >
                    <span className="flex items-center gap-2 font-medium text-fg">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-surface-strong text-[8px] font-semibold text-muted">
                        {row.initials}
                      </span>
                      {row.name}
                    </span>
                    <span className="text-muted">{row.type}</span>
                    <span className="text-muted">{row.city}</span>
                    <span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-medium"
                        style={
                          row.status === "Vérifié"
                            ? { background: `${accent}1f`, color: accent }
                            : { background: "rgb(245 165 36 / 0.14)", color: "#d48806" }
                        }
                      >
                        {row.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Browser>
      </div>

      <Depth z={100} className="absolute right-[-6px] top-[28px]">
        <FloatChip>
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: accent }}>
            <BadgeCheck className="h-4 w-4" />
          </span>
          <span>
            <span className="block font-semibold">Nouvel enregistrement</span>
            <span className="block text-[10px] text-muted">Pharmacie Lumière · vérifiée</span>
          </span>
        </FloatChip>
      </Depth>

      <Depth z={70} className="absolute bottom-[14px] left-[-4px]">
        <div
          className="w-[190px] rounded-2xl border border-line-strong bg-bg-elevated p-3.5"
          style={{ boxShadow: "var(--shadow-float), inset 0 1px 0 var(--highlight)" }}
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-subtle">Certificat</p>
          <p className="mt-0.5 text-[13px] font-semibold text-fg">N° BM-2048</p>
          <div className="mt-2.5 flex items-end justify-between">
            <div className="space-y-1">
              <span className="block h-1.5 w-20 rounded bg-surface-strong" />
              <span className="block h-1.5 w-14 rounded bg-surface-strong" />
            </div>
            {/* Mini QR code décoratif */}
            <div className="grid grid-cols-5 gap-[2px]">
              {Array.from({ length: 25 }, (_, i) => (
                <span
                  key={i}
                  className="h-[5px] w-[5px] rounded-[1px]"
                  style={{ background: [0, 1, 3, 5, 6, 8, 12, 14, 16, 18, 19, 21, 23, 24].includes(i) ? "var(--fg)" : "transparent" }}
                />
              ))}
            </div>
          </div>
        </div>
      </Depth>
    </div>
  );
}
