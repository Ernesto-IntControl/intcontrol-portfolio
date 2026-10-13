import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { createHeroScene, type HeroSceneController } from "./createHeroScene";
import type { Theme } from "@/src/providers/ThemeProvider";

interface HeroSceneProps {
  theme: Theme;
  /** Faux quand le hero est hors écran : la boucle de rendu est suspendue. */
  active: boolean;
  progress: MotionValue<number>;
  reduced: boolean;
  lowEnd?: boolean;
  onReady?: () => void;
  onSlow?: () => void;
}

/** Enveloppe React de la scène Three.js (chargée à part, voir HeroVisual). */
export default function HeroScene({ theme, active, progress, reduced, lowEnd = false, onReady, onSlow }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controller = useRef<HeroSceneController | null>(null);
  // Options figées à la création ; thème et activité sont mis à jour ensuite
  const initial = useRef({ theme, reduced, lowEnd, progress, onReady, onSlow });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const scene = createHeroScene(canvasRef.current, containerRef.current, initial.current);
    controller.current = scene;
    return () => {
      scene.dispose();
      controller.current = null;
    };
  }, []);

  useEffect(() => {
    controller.current?.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    controller.current?.setActive(active);
  }, [active]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
