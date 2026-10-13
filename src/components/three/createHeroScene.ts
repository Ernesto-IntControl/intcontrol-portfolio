import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Object3D,
  Path,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Quaternion,
  Scene,
  Shape,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
  type WebGLRenderTarget,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { MotionValue } from "motion/react";
import type { Theme } from "@/src/providers/ThemeProvider";

/*
 * Scène du hero en Three.js « pur » (sans React Three Fiber) : seules les classes
 * utilisées sont embarquées, ce qui allège nettement le téléchargement.
 */

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
    envBackground: "#040506",
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
    envBackground: "#cfd6dd",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Géométries                                                          */
/* ------------------------------------------------------------------ */
const DEG = Math.PI / 180;
// Hexagone « pointe en haut », comme le logo
const HEX_ANGLES = [90, 150, 210, 270, 330, 30].map((d) => d * DEG);
const C_ANGLES = [30, 90, 150, 210, 270, 330].map((d) => d * DEG);

const ring = (r: number, angles = HEX_ANGLES) => angles.map((a) => new Vector2(Math.cos(a) * r, Math.sin(a) * r));

function extrude(shape: Shape, depth: number, bevel: number) {
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.8,
    bevelSegments: 6,
    curveSegments: 1,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function emblemGeometries() {
  const frame = new Shape(ring(1.15));
  frame.holes.push(new Path(ring(0.9).reverse()));
  // Le « C » : anneau hexagonal ouvert sur la droite
  const core = new Shape([...ring(0.62, C_ANGLES), ...ring(0.4, [...C_ANGLES].reverse())]);
  return { frame: extrude(frame, 0.26, 0.05), core: extrude(core, 0.34, 0.045) };
}

function fibonacciSphere(count: number) {
  const points: Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    points.push(new Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r));
  }
  return points;
}

function glowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/**
 * Environnement studio : panneaux lumineux rendus dans une PMREM.
 * Donne les reflets du métal sans charger de fichier HDR.
 */
function studioEnvironment(pmrem: PMREMGenerator, theme: Theme) {
  const palette = palettes[theme];
  const accent = new Color(palette.glow);
  const white = new Color("#ffffff");
  const env = new Scene();
  env.background = new Color(palette.envBackground);

  const disposables: { dispose: () => void }[] = [];
  const plane = new PlaneGeometry(1, 1);
  const torus = new TorusGeometry(1, 0.08, 8, 48);
  disposables.push(plane, torus);

  const panel = (
    geometry: BufferGeometry,
    color: Color,
    intensity: number,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
  ) => {
    const material = new MeshBasicMaterial({ color: color.clone().multiplyScalar(intensity), side: DoubleSide });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.scale.set(...scale);
    env.add(mesh);
    disposables.push(material);
  };

  panel(plane, white, 3, [0, 4, -2], [Math.PI / 2, 0, 0], [10, 1.4, 1]);
  panel(plane, white, 2, [-5, 1, -1], [0, Math.PI / 2, 0], [8, 1, 1]);
  panel(plane, white, 1.5, [5, -1, -1], [0, -Math.PI / 2, 0], [8, 0.6, 1]);
  panel(torus, accent, 5, [2.5, 2, 4], [0, 0, 0], [2.2, 2.2, 2.2]);
  panel(plane, accent, 2, [-3, -3, 2], [0, 0, 0], [4, 0.5, 1]);

  const target = pmrem.fromScene(env, 0.035);
  disposables.forEach((d) => d.dispose());
  return target;
}

/* ------------------------------------------------------------------ */
/* Scène                                                               */
/* ------------------------------------------------------------------ */
export interface HeroSceneOptions {
  theme: Theme;
  reduced: boolean;
  /** Appareil modeste : moins de tuiles et une résolution plus basse. */
  lowEnd: boolean;
  /** Progression du scroll dans le hero (0 → 1). */
  progress: MotionValue<number>;
  /** Appelé quand la première image est affichée (pour le fondu d'entrée). */
  onReady?: () => void;
  /** Appelé si l'appareil n'arrive pas à tenir la scène, même en résolution réduite. */
  onSlow?: () => void;
}

export interface HeroSceneController {
  /** Faux quand le hero est hors écran : la boucle de rendu est suspendue. */
  setActive(active: boolean): void;
  setTheme(theme: Theme): void;
  dispose(): void;
}

export function createHeroScene(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  { theme, reduced, lowEnd, progress, onReady, onSlow }: HeroSceneOptions,
): HeroSceneController {
  const compact = window.innerWidth < 768;
  let maxDpr = lowEnd ? 1.25 : compact ? 1.5 : 1.75;
  const tileCount = lowEnd || compact ? 280 : 460;

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const ambient = new AmbientLight(0xffffff, 1);
  const key = new DirectionalLight(0xffffff, 1);
  key.position.set(4, 5, 6);
  const fill = new PointLight(0xffffff, 8, 12);
  fill.position.set(-3, -1.5, 3);
  scene.add(ambient, key, fill);

  const rig = new Group();
  scene.add(rig);

  // Halo derrière l'emblème
  const glowMap = glowTexture();
  const glowGeometry = new PlaneGeometry(1, 1);
  const glowMaterial = new MeshBasicMaterial({
    map: glowMap,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    toneMapped: false,
  });
  const glow = new Mesh(glowGeometry, glowMaterial);
  glow.position.z = -1.2;
  glow.scale.setScalar(6.5);
  rig.add(glow);

  // Emblème : cadre hexagonal métallique + cœur en « C »
  const { frame, core } = emblemGeometries();
  const frameMaterial = new MeshPhysicalMaterial({
    metalness: 1,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.5,
  });
  const coreMaterial = new MeshPhysicalMaterial({
    emissiveIntensity: 0.85,
    metalness: 0.35,
    roughness: 0.22,
    clearcoat: 1,
    envMapIntensity: 1.2,
  });
  const emblem = new Group();
  const frameMesh = new Mesh(frame, frameMaterial);
  const coreMesh = new Mesh(core, coreMaterial);
  coreMesh.position.z = 0.08;
  emblem.add(frameMesh, coreMesh);
  rig.add(emblem);

  // Globe de tuiles : seul un croissant à gauche est visible, comme le logo ;
  // les tuiles naissent et disparaissent en traversant ce bord.
  const tileGeometry = new RoundedBoxGeometry(0.2, 0.13, 0.04, 2, 0.025);
  const tileMaterial = new MeshPhysicalMaterial({ metalness: 0.55, roughness: 0.28, clearcoat: 0.8, envMapIntensity: 1.1 });
  const tiles = new InstancedMesh(tileGeometry, tileMaterial, tileCount);
  tiles.frustumCulled = false;
  rig.add(tiles);
  const base = fibonacciSphere(tileCount);
  const radius = 1.95;

  const pmrem = new PMREMGenerator(renderer);
  let envTarget: WebGLRenderTarget | null = null;
  let currentTheme: Theme | null = null;

  /* ---------------- Boucle de rendu ---------------- */
  let active = true;
  let compiled = false;
  let frameId = 0;
  let last = 0;
  let frames = 0;
  let settled = false;
  let angle = 0;
  // Mesure par fenêtres d'environ 1,5 s (après 10 images de chauffe) :
  // 1re fenêtre lente → résolution réduite ; 2e encore trop lente → retour à l'emblème statique
  const perf = { warmup: 10, frames: 0, time: 0, stage: 0 };
  const pointer = { x: 0, y: 0 };
  let viewport = { width: 1, height: 1 };
  let wide = false;
  let landscape = false;

  const dummy = new Object3D();
  const v = new Vector3();
  const lookTarget = new Vector3();
  const q = new Quaternion();
  const euler = new Euler();
  const damp = MathUtils.damp;

  function update(delta: number, time: number) {
    const d = Math.min(delta, 0.1);
    const p = progress.get();
    const px = reduced ? 0 : pointer.x;
    const py = reduced ? 0 : pointer.y;

    // Position responsive, réaction souris et scroll amortie
    // Trois mises en page : bureau (à droite), téléphone en paysage (à droite, plus petit), portrait (en haut)
    const tx = wide ? viewport.width * 0.21 : landscape ? viewport.width * 0.24 : 0;
    const ty = (wide ? 0.1 : landscape ? 0 : viewport.height * 0.235) + p * 1.6;
    const ts = (wide ? 1 : landscape ? 0.9 : Math.min(0.72, viewport.width / 5.6)) * (1 - p * 0.18);
    const rx = -py * 0.2 + p * 0.45;
    const ry = px * 0.38 + p * 1.2;

    if (!settled || reduced) {
      // Première image : on part de la position finale (l'emblème statique était déjà là),
      // légèrement réduit et tourné, puis on se pose en douceur pendant le fondu
      rig.position.set(tx, ty, 0);
      rig.scale.setScalar(reduced ? ts : ts * 0.9);
      rig.rotation.set(rx, reduced ? ry : ry - 0.8, 0);
      settled = true;
    } else {
      rig.position.x = damp(rig.position.x, tx, 3.2, d);
      rig.position.y = damp(rig.position.y, ty, 3.2, d);
      rig.scale.setScalar(damp(rig.scale.x, ts, 2.6, d));
      rig.rotation.x = damp(rig.rotation.x, rx, 3, d);
      rig.rotation.y = damp(rig.rotation.y, ry, 3, d);
    }

    if (!reduced) {
      emblem.rotation.y = Math.sin(time * 0.45) * 0.32;
      emblem.position.y = Math.sin(time * 0.8) * 0.06;
      coreMesh.rotation.y = Math.sin(time * 0.6 + 1) * 0.28;
      coreMesh.position.z = 0.08 + Math.sin(time * 0.9) * 0.04;
      angle += Math.min(delta, 0.05) * 0.14;
    }

    q.setFromEuler(euler.set(0.32, angle, 0.12));
    for (let i = 0; i < tileCount; i++) {
      v.copy(base[i]).applyQuaternion(q);
      // Croissant : pleine taille à gauche, disparaît en allant vers la droite
      const visible = 1 - MathUtils.smoothstep(v.x, -0.78, -0.08);
      const depth = 0.55 + 0.45 * MathUtils.smoothstep(v.z, -1, 0.7);
      dummy.position.copy(v).multiplyScalar(radius);
      lookTarget.copy(v).multiplyScalar(radius * 2);
      dummy.lookAt(lookTarget);
      dummy.scale.setScalar(Math.max(visible * depth, 0.0001));
      dummy.updateMatrix();
      tiles.setMatrixAt(i, dummy.matrix);
    }
    tiles.instanceMatrix.needsUpdate = true;
  }

  function render(now: number) {
    frameId = 0;
    const time = now / 1000;
    const delta = last ? time - last : 1 / 60;
    last = time;

    update(delta, time);
    renderer.render(scene, camera);

    frames++;
    if (frames === 1) requestAnimationFrame(() => onReady?.());

    if (perf.warmup > 0) {
      perf.warmup--;
    } else if (perf.stage < 2 && !reduced && delta < 1) {
      // Un écart de plus d'une seconde = onglet en arrière-plan, pas de la lenteur : ignoré
      perf.frames++;
      perf.time += delta;
      if (perf.time >= 1.5 || perf.frames >= 90) {
        const average = perf.time / perf.frames;
        perf.frames = 0;
        perf.time = 0;
        if (perf.stage === 0 && average > 1 / 40 && maxDpr > 1) {
          maxDpr = 1;
          resize();
          perf.stage = 1;
          perf.warmup = 5;
        } else if (average > 1 / 28) {
          perf.stage = 2;
          onSlow?.();
        } else {
          perf.stage = 2;
        }
      }
    }

    if (active && !reduced) frameId = requestAnimationFrame(render);
  }

  function requestRender() {
    if (!frameId && active && compiled) frameId = requestAnimationFrame(render);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const visibleHeight = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    viewport = { width: visibleHeight * camera.aspect, height: visibleHeight };
    wide = width >= 1024;
    landscape = !wide && width > height && height <= 500;
    requestRender();
  }

  function setTheme(next: Theme) {
    if (next === currentTheme) return;
    currentTheme = next;
    const palette = palettes[next];
    ambient.intensity = palette.ambient;
    key.intensity = palette.key;
    fill.color.set(palette.glow);
    glowMaterial.color.set(palette.glow);
    glowMaterial.opacity = palette.glowOpacity;
    frameMaterial.color.set(palette.frame);
    coreMaterial.color.set(palette.core);
    coreMaterial.emissive.set(palette.coreEmissive);
    const main = new Color(palette.tile);
    const alt = new Color(palette.tileAlt);
    for (let i = 0; i < tileCount; i++) tiles.setColorAt(i, i % 9 === 0 ? alt : main);
    if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;

    envTarget?.dispose();
    envTarget = studioEnvironment(pmrem, next);
    scene.environment = envTarget.texture;
    requestRender();
  }

  /* ---------------- Écouteurs ---------------- */
  const onPointerMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // En mode animations réduites, on ne redessine qu'au scroll
  const stopProgress = progress.on("change", () => {
    if (reduced) requestRender();
  });

  const observer = new ResizeObserver(resize);
  observer.observe(container);

  setTheme(theme);
  resize();
  // Compilation des shaders en parallèle (si le GPU le permet) : pas de gel du fil principal
  renderer
    .compileAsync(scene, camera)
    .catch(() => undefined)
    .then(() => {
      compiled = true;
      requestRender();
    });

  return {
    setActive(next) {
      active = next;
      if (next) {
        last = 0;
        requestRender();
      } else if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    },
    setTheme,
    dispose() {
      active = false;
      if (frameId) cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      stopProgress();
      [glowGeometry, frame, core, tileGeometry].forEach((g) => g.dispose());
      [glowMaterial, frameMaterial, coreMaterial, tileMaterial].forEach((m) => m.dispose());
      tiles.dispose();
      glowMap.dispose();
      envTarget?.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
