import type { Theme } from "@/src/providers/ThemeProvider";

/*
 * Version SVG de la scène 3D : même cadre hexagonal, même « C », même croissant
 * de tuiles. Affichée tout de suite (le temps que Three.js arrive) et gardée
 * telle quelle si la connexion ou l'appareil ne permettent pas la 3D.
 */

const DEG = Math.PI / 180;
const hex = (r: number, angles: number[]) =>
  angles.map((a) => `${(Math.cos(a * DEG) * r).toFixed(2)},${(-Math.sin(a * DEG) * r).toFixed(2)}`).join(" ");

const HEX = [90, 150, 210, 270, 330, 30];
const C_ANGLES = [30, 90, 150, 210, 270, 330];
const FRAME = `M${hex(59, HEX)}Z M${hex(46, HEX)}Z`;
const CORE = `M${hex(32, C_ANGLES)} ${hex(20.5, [...C_ANGLES].reverse())}Z`;

const smoothstep = (x: number, a: number, b: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// Mêmes calculs que la scène 3D (sphère de Fibonacci, croissant à gauche), figés une fois pour toutes
const TILES = (() => {
  const count = 240;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const [rx, ry] = [0.32, 0.6];
  const tiles: { x: number; y: number; s: number; o: number; alt: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    const y0 = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y0 * y0);
    const x0 = Math.cos(golden * i) * r;
    const z0 = Math.sin(golden * i) * r;
    // rotation Y puis X
    const x1 = x0 * Math.cos(ry) + z0 * Math.sin(ry);
    const z1 = -x0 * Math.sin(ry) + z0 * Math.cos(ry);
    const y2 = y0 * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = y0 * Math.sin(rx) + z1 * Math.cos(rx);
    const visible = 1 - smoothstep(x1, -0.78, -0.08);
    if (visible < 0.05) continue;
    const depth = 0.55 + 0.45 * smoothstep(z2, -1, 0.7);
    tiles.push({ x: x1 * 100, y: -y2 * 100, s: visible * depth, o: 0.35 + 0.65 * depth, alt: i % 9 === 0 });
  }
  return tiles;
})();

const palettes = {
  dark: { frame: ["#46515e", "#141a21"], core: "#34d6c8", tile: "#27bfb2", alt: "#e6faf8", glow: "rgb(32 178 170 / 0.35)" },
  light: { frame: ["#ffffff", "#c3ccd6"], core: "#0b8a80", tile: "#10161d", alt: "#0b8a80", glow: "rgb(32 178 170 / 0.18)" },
} as const;

export default function HeroEmblemStatic({ theme }: { theme: Theme }) {
  const p = palettes[theme];
  return (
    <div className="absolute left-1/2 top-[26.5%] aspect-square w-[min(63.7svh,69.6vw)] -translate-x-1/2 -translate-y-1/2 lg:left-[71%] lg:top-[47.7%] lg:w-[88svh]">
      <svg viewBox="-110 -110 220 220" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="hero-glow">
            <stop offset="0" stopColor={p.glow} />
            <stop offset="1" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-frame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.frame[0]} />
            <stop offset="1" stopColor={p.frame[1]} />
          </linearGradient>
        </defs>
        <circle r="110" fill="url(#hero-glow)" />
        {TILES.map((t, i) => (
          <rect
            key={i}
            x={t.x - 5 * t.s}
            y={t.y - 3.3 * t.s}
            width={10 * t.s}
            height={6.6 * t.s}
            rx={1.4 * t.s}
            fill={t.alt ? p.alt : p.tile}
            opacity={t.o}
          />
        ))}
        <path d={FRAME} fill="url(#hero-frame)" fillRule="evenodd" />
        <path d={CORE} fill={p.core} />
      </svg>
    </div>
  );
}
