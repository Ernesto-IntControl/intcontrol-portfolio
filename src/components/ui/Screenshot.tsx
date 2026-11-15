import { useState } from "react";
import type { Shot } from "@/src/data/projects";
import { cn } from "@/src/lib/utils";

/**
 * Capture d'écran responsive (AVIF puis WebP) qui apparaît en fondu une fois chargée.
 * Une capture liée à un thème n'est affichée que dans ce thème (display: none sinon :
 * le navigateur ne télécharge pas une image paresseuse masquée).
 */
export default function Screenshot({
  shot,
  className,
  sizes,
  eager,
}: {
  shot: Shot;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <picture className={cn(shot.theme === "dark" && "hidden dark:contents", shot.theme === "light" && "contents dark:hidden", !shot.theme && "contents")}>
      <source type="image/avif" srcSet={`${shot.src}.avif`} sizes={sizes} />
      <source type="image/webp" srcSet={`${shot.src}.webp`} sizes={sizes} />
      <img
        src={`${shot.src}.webp`}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={cn("block transition-opacity duration-700 ease-out", loaded ? "opacity-100" : "opacity-0", className)}
      />
    </picture>
  );
}

/** Cadre de téléphone minimal autour d'une capture (sauf si elle contient déjà le sien). */
export function PhoneShot({ shot, className, sizes }: { shot: Shot; className?: string; sizes?: string }) {
  if (shot.framed) {
    return (
      <div className={cn("drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]", className)}>
        <Screenshot shot={shot} sizes={sizes} className="h-full w-auto" />
      </div>
    );
  }
  return (
    <div
      className={cn("rounded-[2rem] bg-[#0a0c10] p-[5px] ring-1 ring-white/10", className)}
      style={{ boxShadow: "0 40px 70px -30px rgb(0 0 0 / 0.55), 0 18px 36px -18px rgb(0 0 0 / 0.4)" }}
    >
      <div className="h-full overflow-hidden rounded-[1.7rem] bg-surface-strong">
        <Screenshot shot={shot} sizes={sizes} className="h-full w-auto object-cover object-top" />
      </div>
    </div>
  );
}

/** Fenêtre d'application minimale autour d'une capture d'écran d'ordinateur. */
export function DesktopShot({ shots, title, className, sizes }: { shots: Shot[]; title: string; className?: string; sizes?: string }) {
  return (
    <div
      className={cn("overflow-hidden rounded-[14px] border border-line-strong bg-bg-elevated", className)}
      style={{ boxShadow: "0 50px 90px -40px rgb(0 0 0 / 0.55), 0 20px 40px -20px rgb(0 0 0 / 0.3)" }}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface px-3.5 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="mx-auto truncate font-mono text-[10px] text-subtle">{title}</span>
        <span className="w-8" />
      </div>
      {shots.map((shot) => (
        <Screenshot key={shot.src} shot={shot} sizes={sizes} className="h-auto w-full" />
      ))}
    </div>
  );
}
