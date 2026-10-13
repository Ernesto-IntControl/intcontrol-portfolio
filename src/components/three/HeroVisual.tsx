import { motion, useInView, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import HeroEmblemStatic from "./HeroEmblemStatic";
import { getDeviceProfile, whenIdle } from "@/src/lib/boot";
import { useIntro } from "@/src/providers/IntroProvider";
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

/**
 * L'emblème SVG s'affiche immédiatement. La scène 3D est téléchargée seulement
 * quand le navigateur est libre (après l'intro), puis remplace l'emblème en fondu.
 * En mode économie de données, sur réseau 2G ou appareil très limité, on garde le SVG.
 */
export default function HeroVisual({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const { done: introDone } = useIntro();
  const [device] = useState(() => ({ ...getDeviceProfile(), webgl: hasWebGL() }));
  const use3D = device.webgl && !device.slowNetwork && !device.lowMemory;
  const [load3D, setLoad3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [tooSlow, setTooSlow] = useState(false);
  const [staticGone, setStaticGone] = useState(false);
  const showScene = ready && !tooSlow;

  const staticY = useTransform(progress, [0, 1], ["0%", "-20%"]);
  const staticOpacity = useTransform(progress, [0, 0.8], [1, 0]);

  // On laisse l'intro puis l'entrée du hero se jouer (~2 s) avant de télécharger et d'initialiser la 3D
  useEffect(() => {
    if (!use3D || !introDone) return;
    let cancelIdle = () => {};
    const timer = window.setTimeout(() => {
      cancelIdle = whenIdle(() => setLoad3D(true), 1500);
    }, 2200);
    return () => {
      window.clearTimeout(timer);
      cancelIdle();
    };
  }, [use3D, introDone]);

  // Une fois le fondu terminé, l'emblème statique est retiré du DOM
  useEffect(() => {
    if (!showScene) return;
    const id = window.setTimeout(() => setStaticGone(true), 1400);
    return () => window.clearTimeout(id);
  }, [showScene]);

  // Appareil trop juste pour la 3D : retour à l'emblème statique, scène libérée
  useEffect(() => {
    if (!tooSlow) return;
    setStaticGone(false);
    const id = window.setTimeout(() => setLoad3D(false), 1100);
    return () => window.clearTimeout(id);
  }, [tooSlow]);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      {!staticGone && (
        <motion.div
          style={{ y: staticY, opacity: staticOpacity }}
          className="absolute inset-0"
        >
          <div className={cn("absolute inset-0 transition-opacity duration-1000 ease-out", showScene ? "opacity-0" : "opacity-100")}>
            <HeroEmblemStatic theme={theme} />
          </div>
        </motion.div>
      )}
      {load3D && (
        <Suspense fallback={null}>
          <div className={cn("absolute inset-0 transition-opacity duration-1000 ease-out", showScene ? "opacity-100" : "opacity-0")}>
            <HeroScene
              theme={theme}
              active={inView}
              progress={progress}
              reduced={reduced}
              lowEnd={device.lowEnd}
              onReady={() => setReady(true)}
              onSlow={() => setTooSlow(true)}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
