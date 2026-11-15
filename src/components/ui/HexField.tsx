import { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

/** Écart entre deux points, et rayon de la lumière qui suit le pointeur (px). */
const GAP = 28;
const RADIUS = 170;
const SWEEP_MS = 2600;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Trame de points en nid d'abeille (clin d'œil à l'emblème hexagonal).
 * À l'arrivée, une lumière la balaie une fois ; ensuite, sur souris ou trackpad,
 * les points proches du pointeur s'allument à la couleur d'accent.
 * Un seul canvas, redessiné uniquement quand la lumière bouge et que la trame est visible.
 */
export default function HexField({ className, delay = 500 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let points: number[] = [];
    let dot = "";
    let accent = "";
    let raf = 0;
    let visible = true;
    let sweepStart = -1;
    const light = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, power: 0, target: 0 };

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      dot = styles.getPropertyValue("--dot").trim();
      accent = styles.getPropertyValue("--accent").trim();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = dot;
      ctx.beginPath();
      for (let i = 0; i < points.length; i += 2) {
        ctx.moveTo(points[i] + 1, points[i + 1]);
        ctx.arc(points[i], points[i + 1], 1, 0, Math.PI * 2);
      }
      ctx.fill();

      if (light.power < 0.01) return;
      ctx.fillStyle = accent;
      for (let i = 0; i < points.length; i += 2) {
        const dx = points[i] - light.x;
        const dy = points[i + 1] - light.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > RADIUS * RADIUS) continue;
        const t = (1 - Math.sqrt(d2) / RADIUS) * light.power;
        ctx.globalAlpha = Math.min(t * 1.1, 1);
        ctx.beginPath();
        ctx.arc(points[i], points[i + 1], 1 + t * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = [];
      const rowHeight = (GAP * Math.sqrt(3)) / 2;
      for (let row = 0, y = GAP / 2; y < height + GAP; row++, y += rowHeight) {
        for (let x = row % 2 ? GAP / 2 : 0; x < width + GAP; x += GAP) points.push(x, y);
      }
      draw();
    };

    const loop = (now: number) => {
      raf = 0;
      if (sweepStart >= 0) {
        const p = Math.min(Math.max((now - sweepStart) / SWEEP_MS, 0), 1);
        light.x = light.tx = -RADIUS + (width + RADIUS * 2) * easeInOut(p);
        light.y = light.ty = height * 0.38;
        light.target = p < 0.8 ? 0.7 : 0;
        if (p >= 1) sweepStart = -1;
      } else {
        light.x += (light.tx - light.x) * 0.16;
        light.y += (light.ty - light.y) * 0.16;
      }
      light.power += (light.target - light.power) * 0.08;
      draw();
      const moving =
        sweepStart >= 0 ||
        Math.abs(light.tx - light.x) > 0.5 ||
        Math.abs(light.ty - light.y) > 0.5 ||
        Math.abs(light.target - light.power) > 0.005;
      if (moving && visible) raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (!inside) {
        if (sweepStart < 0) light.target = 0;
        kick();
        return;
      }
      sweepStart = -1;
      // Lumière éteinte : elle apparaît sous le pointeur au lieu de glisser depuis loin
      if (light.power < 0.05) {
        light.x = x;
        light.y = y;
      }
      light.tx = x;
      light.ty = y;
      light.target = 1;
      kick();
    };

    const onLeave = (e: PointerEvent) => {
      if (e.relatedTarget) return;
      light.target = 0;
      kick();
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Le thème change les couleurs des points
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    visibility.observe(canvas);

    if (reduce) {
      return () => {
        resizeObserver.disconnect();
        themeObserver.disconnect();
        visibility.disconnect();
      };
    }

    const sweepTimer = window.setTimeout(() => {
      sweepStart = performance.now();
      kick();
    }, delay);

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onLeave);
    }

    return () => {
      window.clearTimeout(sweepTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibility.disconnect();
    };
  }, [delay]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none block h-full w-full", className)} />;
}
