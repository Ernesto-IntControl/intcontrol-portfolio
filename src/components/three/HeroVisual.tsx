import { useInView, useReducedMotion, type MotionValue } from "motion/react";
import { lazy, Suspense, useRef, useState } from "react";
import LogoMark from "@/src/components/ui/LogoMark";
import { useTheme } from "@/src/providers/ThemeProvider";
import { cn } from "@/src/lib/utils";

// Three.js est chargé à part : le texte du hero s'affiche sans attendre la 3D
const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroVisual({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const [supported] = useState(hasWebGL);
  const [ready, setReady] = useState(false);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      {supported ? (
        <Suspense fallback={null}>
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-out-expo",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <HeroScene
              theme={theme}
              active={inView}
              progress={progress}
              reduced={reduced}
              onReady={() => setReady(true)}
            />
          </div>
        </Suspense>
      ) : (
        <div className="absolute inset-x-0 top-[12%] flex justify-center lg:inset-y-0 lg:left-auto lg:right-[12%] lg:top-0 lg:items-center">
          <div className="relative">
            <div className="absolute inset-0 scale-[2.2] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_25%,transparent),transparent)]" />
            <LogoMark className="relative h-44 w-44 text-fg/80 lg:h-64 lg:w-64" />
          </div>
        </div>
      )}
    </div>
  );
}
