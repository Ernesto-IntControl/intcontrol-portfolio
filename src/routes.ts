import { getDeviceProfile, whenIdle } from "./lib/boot";

/**
 * Pages secondaires chargées à la demande. L'accueil reste dans le bundle principal
 * (page d'arrivée la plus fréquente, sans aller-retour réseau supplémentaire).
 */
export const pageLoaders = {
  "/projets": () => import("./pages/ProjectsPage"),
  "/services": () => import("./pages/ServicesPage"),
  "/a-propos": () => import("./pages/AboutPage"),
  "/contact": () => import("./pages/ContactPage"),
} as const;

type RoutePath = keyof typeof pageLoaders;

const requested = new Set<string>();

export function prefetchRoute(href: string | null) {
  if (!href || !href.startsWith("/")) return;
  const path = href.split(/[?#]/)[0] as RoutePath;
  if (!(path in pageLoaders) || requested.has(path)) return;
  requested.add(path);
  pageLoaders[path]().catch(() => requested.delete(path));
}

/**
 * Précharge une page dès l'intention de navigation (survol, focus, toucher),
 * et toutes les pages pendant l'inactivité si la connexion est bonne.
 */
export function setupRoutePrefetch() {
  const onIntent = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.("a[href]");
    if (link) prefetchRoute(link.getAttribute("href"));
  };
  document.addEventListener("pointerover", onIntent, { passive: true });
  document.addEventListener("focusin", onIntent);
  document.addEventListener("touchstart", onIntent, { passive: true });

  let cancelIdle = () => {};
  const timer = window.setTimeout(() => {
    if (!getDeviceProfile().fastNetwork) return;
    cancelIdle = whenIdle(() => Object.keys(pageLoaders).forEach(prefetchRoute), 4000);
  }, 3500);

  return () => {
    document.removeEventListener("pointerover", onIntent);
    document.removeEventListener("focusin", onIntent);
    document.removeEventListener("touchstart", onIntent);
    window.clearTimeout(timer);
    cancelIdle();
  };
}
