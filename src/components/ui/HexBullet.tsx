import { cn } from "@/src/lib/utils";

/** Puce hexagonale, reprise de l'emblème. */
export default function HexBullet({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 10 10" className={cn("h-2 w-2 shrink-0 text-accent", className)} aria-hidden>
      <path
        d="M5 .9 8.6 3v4L5 9.1 1.4 7V3Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
