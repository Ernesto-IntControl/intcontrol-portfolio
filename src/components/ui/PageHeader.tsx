import type { ReactNode } from "react";

/** En-tête de page : petit repère en monospace, titre sobre, introduction courte. */
export default function PageHeader({ label, title, intro }: { label: string; title: ReactNode; intro?: string }) {
  return (
    <header className="wrap pb-8 pt-12 sm:pt-16">
      <p className="label mb-3 flex items-center gap-2">
        <span className="text-accent">&gt;</span> {label}
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-xl text-muted">{intro}</p>}
    </header>
  );
}
