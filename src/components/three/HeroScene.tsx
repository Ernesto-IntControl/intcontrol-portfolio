import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Theme } from "@/src/providers/ThemeProvider";

interface HeroSceneProps {
  theme: Theme;
  /** Faux quand le hero est hors écran : la boucle de rendu est suspendue. */
  active: boolean;
  /** Progression du scroll dans le hero (0 → 1). */
  progress: MotionValue<number>;
  reduced: boolean;
  onReady?: () => void;
}

const palettes = {
  dark: {
    frame: "#2a333e",
    core: "#34d6c8",
    coreEmissive: "#14a89c",
    tile: "#27bfb2",
    tileAlt: "#e6faf8",
    glow: "#20b2aa",
    glowOpacity: 0.55,
    ambient: 0.25,
    key: 1.1,
  },
  light: {
    frame: "#e6eaef",
    core: "#0b8a80",
    coreEmissive: "#000000",
    tile: "#10161d",
    tileAlt: "#0b8a80",
    glow: "#20b2aa",
    glowOpacity: 0.28,
    ambient: 0.7,
    key: 1.6,
  },
} as const;

type Palette = (typeof palettes)[Theme];

/* ------------------------------------------------------------------ */
/* Pointeur global : le canvas est sous le contenu, on écoute la page */
/* ------------------------------------------------------------------ */
const pointer = { x: 0, y: 0 };

function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Géométries                                                          */
/* ------------------------------------------------------------------ */
const DEG = Math.PI / 180;
// Hexagone « pointe en haut », comme le logo
const HEX_ANGLES = [90, 150, 210, 270, 330, 30].map((d) => d * DEG);

const ring = (r: number, angles = HEX_ANGLES) => angles.map((a) => new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));

const extrude = (shape: THREE.Shape, depth: number, bevel: number) => {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.8,
    bevelSegments: 6,
    curveSegments: 1,
  });
  g.center();
  g.computeVertexNormals();
  return g;
};

function useEmblemGeometries() {
  return useMemo(() => {
    const frame = new THREE.Shape(ring(1.15));
    frame.holes.push(new THREE.Path(ring(0.9).reverse()));

    // Le « C » : anneau hexagonal ouvert sur la droite
    const cAngles = [30, 90, 150, 210, 270, 330].map((d) => d * DEG);
    const c = new THREE.Shape([...ring(0.62, cAngles), ...ring(0.4, [...cAngles].reverse())]);

    return { frame: extrude(frame, 0.26, 0.05), core: extrude(c, 0.34, 0.045) };
  }, []);
}

function fibonacciSphere(count: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
  }
  return points;
}

function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ------------------------------------------------------------------ */
/* Emblème : cadre hexagonal métallique + cœur en « C »                */
/* ------------------------------------------------------------------ */
function Emblem({ palette, reduced }: { palette: Palette; reduced: boolean }) {
  const { frame, core } = useEmblemGeometries();
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !group.current || !coreRef.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.45) * 0.32;
    group.current.position.y = Math.sin(t * 0.8) * 0.06;
    coreRef.current.rotation.y = Math.sin(t * 0.6 + 1) * 0.28;
    coreRef.current.position.z = 0.08 + Math.sin(t * 0.9) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh geometry={frame}>
        <meshPhysicalMaterial
          color={palette.frame}
          metalness={1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh ref={coreRef} geometry={core} position-z={0.08}>
        <meshPhysicalMaterial
          color={palette.core}
          emissive={palette.coreEmissive}
          emissiveIntensity={0.85}
          metalness={0.35}
          roughness={0.22}
          clearcoat={1}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Globe de tuiles : seul un croissant à gauche est visible, comme le  */
/* logo ; les tuiles naissent et disparaissent en traversant ce bord.  */
/* ------------------------------------------------------------------ */
function TileGlobe({ count, radius, palette, reduced }: { count: number; radius: number; palette: Palette; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const base = useMemo(() => fibonacciSphere(count), [count]);
  const geometry = useMemo(() => new RoundedBoxGeometry(0.2, 0.13, 0.04, 2, 0.025), []);
  const tmp = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      v: new THREE.Vector3(),
      target: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      e: new THREE.Euler(),
    }),
    [],
  );
  const angle = useRef(0);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const main = new THREE.Color(palette.tile);
    const alt = new THREE.Color(palette.tileAlt);
    for (let i = 0; i < count; i++) m.setColorAt(i, i % 9 === 0 ? alt : main);
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [palette, count]);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    if (!reduced) angle.current += Math.min(delta, 0.05) * 0.14;
    const { dummy, v, target, q, e } = tmp;
    q.setFromEuler(e.set(0.32, angle.current, 0.12));

    for (let i = 0; i < count; i++) {
      v.copy(base[i]).applyQuaternion(q);
      // Croissant : pleine taille à gauche, disparaît en allant vers la droite
      const visible = 1 - THREE.MathUtils.smoothstep(v.x, -0.78, -0.08);
      const depth = 0.55 + 0.45 * THREE.MathUtils.smoothstep(v.z, -1, 0.7);
      dummy.position.copy(v).multiplyScalar(radius);
      target.copy(v).multiplyScalar(radius * 2);
      dummy.lookAt(target);
      dummy.scale.setScalar(Math.max(visible * depth, 0.0001));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshPhysicalMaterial metalness={0.55} roughness={0.28} clearcoat={0.8} envMapIntensity={1.1} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Rig : position responsive, réaction souris et scroll amortie        */
/* ------------------------------------------------------------------ */
function Rig({ children, progress, reduced }: { children: ReactNode; progress: MotionValue<number>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const first = useRef(true);
  const wide = size.width >= 1024;

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.get();
    const px = reduced ? 0 : pointer.x;
    const py = reduced ? 0 : pointer.y;

    const tx = wide ? viewport.width * 0.21 : 0;
    const ty = (wide ? 0.1 : viewport.height * 0.235) + p * 1.6;
    const ts = (wide ? 1 : Math.min(0.72, viewport.width / 5.6)) * (1 - p * 0.18);
    const rx = -py * 0.2 + p * 0.45;
    const ry = px * 0.38 + p * 1.2;

    if (first.current && reduced) {
      g.position.set(tx, ty, 0);
      g.scale.setScalar(ts);
      g.rotation.set(rx, ry, 0);
    }
    first.current = false;

    const d = Math.min(delta, 0.1);
    const damp = THREE.MathUtils.damp;
    g.position.x = damp(g.position.x, tx, 3.2, d);
    g.position.y = damp(g.position.y, ty, 3.2, d);
    g.scale.setScalar(damp(g.scale.x, ts, 2.6, d));
    g.rotation.x = damp(g.rotation.x, rx, 3, d);
    g.rotation.y = damp(g.rotation.y, ry, 3, d);
  });

  // État initial : petit et tourné, pour une entrée en rotation amortie
  return (
    <group ref={group} scale={0.001} rotation={[0.4, -1.4, 0]}>
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Environnement studio : panneaux lumineux rendus dans une PMREM.     */
/* Donne les reflets du métal sans charger de fichier HDR.             */
/* ------------------------------------------------------------------ */
function StudioEnvironment({ theme }: { theme: Theme }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    const accent = new THREE.Color(palettes[theme].glow);
    const env = new THREE.Scene();
    env.background = new THREE.Color(theme === "dark" ? "#040506" : "#cfd6dd");

    const disposables: { dispose: () => void }[] = [];
    const panel = (
      geometry: THREE.BufferGeometry,
      color: THREE.Color,
      intensity: number,
      position: [number, number, number],
      rotation: [number, number, number] = [0, 0, 0],
      scale: [number, number, number] = [1, 1, 1],
    ) => {
      const material = new THREE.MeshBasicMaterial({ color: color.clone().multiplyScalar(intensity), side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.scale.set(...scale);
      env.add(mesh);
      disposables.push(material);
    };

    const plane = new THREE.PlaneGeometry(1, 1);
    const torus = new THREE.TorusGeometry(1, 0.08, 8, 48);
    disposables.push(plane, torus);
    const white = new THREE.Color("#ffffff");

    panel(plane, white, 3, [0, 4, -2], [Math.PI / 2, 0, 0], [10, 1.4, 1]);
    panel(plane, white, 2, [-5, 1, -1], [0, Math.PI / 2, 0], [8, 1, 1]);
    panel(plane, white, 1.5, [5, -1, -1], [0, -Math.PI / 2, 0], [8, 0.6, 1]);
    panel(torus, accent, 5, [2.5, 2, 4], [0, 0, 0], [2.2, 2.2, 2.2]);
    panel(plane, accent, 2, [-3, -3, 2], [0, 0, 0], [4, 0.5, 1]);

    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(env, 0.035);
    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      disposables.forEach((d) => d.dispose());
    };
  }, [gl, scene, theme]);

  return null;
}

/** Baisse la résolution si l'appareil peine à tenir le rythme. */
function AdaptiveDpr({ onDecline }: { onDecline: () => void }) {
  const samples = useRef({ frames: 0, time: 0, done: false });
  useFrame((_, delta) => {
    const s = samples.current;
    if (s.done) return;
    s.frames++;
    s.time += delta;
    if (s.frames >= 90) {
      s.done = true;
      if (s.time / s.frames > 1 / 40) onDecline();
    }
  });
  return null;
}

function Glow({ palette }: { palette: Palette }) {
  const texture = useGlowTexture();
  return (
    <mesh position-z={-1.2} scale={6.5}>
      <planeGeometry />
      <meshBasicMaterial
        map={texture}
        color={palette.glow}
        transparent
        opacity={palette.glowOpacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * R3F mesure son conteneur via react-use-measure, qui peut rater la première
 * mesure quand la scène est révélée par Suspense : le canvas reste alors vide
 * jusqu'au prochain scroll. Un resize synthétique après le montage le débloque.
 */
function useInitialMeasure() {
  useEffect(() => {
    const kick = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(kick);
    const timeout = window.setTimeout(kick, 600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, []);
}

export default function HeroScene({ theme, active, progress, reduced, onReady }: HeroSceneProps) {
  usePointerTracking();
  useInitialMeasure();
  const palette = palettes[theme];
  const [dpr, setDpr] = useState(1.75);
  const compact = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, compact ? Math.min(dpr, 1.5) : dpr]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? (reduced ? "demand" : "always") : "never"}
      onCreated={() => onReady?.()}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[4, 5, 6]} intensity={palette.key} />
      <pointLight position={[-3, -1.5, 3]} intensity={8} distance={12} color={palette.glow} />

      <Rig progress={progress} reduced={reduced}>
        <Glow palette={palette} />
        <Emblem palette={palette} reduced={reduced} />
        <TileGlobe count={compact ? 300 : 460} radius={1.95} palette={palette} reduced={reduced} />
      </Rig>

      <StudioEnvironment theme={theme} />
      <AdaptiveDpr onDecline={() => setDpr(1)} />
    </Canvas>
  );
}
