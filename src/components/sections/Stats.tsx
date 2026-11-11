import { stats } from "@/src/data/profile";

export default function Stats() {
  return (
    <dl className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="card px-4 py-3">
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-xl font-semibold tabular-nums sm:text-2xl">
            {s.prefix}
            {s.value}
            {s.suffix}
          </dd>
          <p className="text-[12.5px] text-muted" aria-hidden>
            {s.label}
          </p>
        </div>
      ))}
    </dl>
  );
}
