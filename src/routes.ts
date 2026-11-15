/**
 * Pages secondaires chargées à la demande. L'accueil reste dans le bundle principal
 * (page d'arrivée la plus fréquente, sans aller-retour réseau supplémentaire).
 */
export const pageLoaders = {
  "/projets": () => import("./pages/ProjectsPage"),
  "/expertise": () => import("./pages/ExpertisePage"),
  "/a-propos": () => import("./pages/AboutPage"),
  "/contact": () => import("./pages/ContactPage"),
} as const;

type RoutePath = keyof typeof pageLoaders;

const requested = new Set<string>();

function routeFor(path: string): RoutePath | null {
  if (path in pageLoaders) return path as RoutePath;
  // Une étude de cas s'affiche sur la page Projets
  if (/^\/projets\/[^/]+$/.test(path)) return "/projets";
  return null;
}

export function prefetchRoute(href: string | null) {
  if (!href || !href.startsWith("/")) return;
  const route = routeFor(href.split(/[?#]/)[0]);
  if (!route || requested.has(route)) return;
  requested.add(route);
  pageLoaders[route]().catch(() => requested.delete(route));
}

/** Précharge une page dès l'intention de navigation (survol, focus, toucher), puis toutes pendant l'inactivité. */
export function setupRoutePrefetch() {
  const onIntent = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.("a[href]");
    if (link) prefetchRoute(link.getAttribute("href"));
  };
  document.addEventListener("pointerover", onIntent, { passive: true });
  document.addEventListener("focusin", onIntent);
  document.addEventListener("touchstart", onIntent, { passive: true });

  const idle = window.setTimeout(() => Object.keys(pageLoaders).forEach(prefetchRoute), 3500);

  return () => {
    document.removeEventListener("pointerover", onIntent);
    document.removeEventListener("focusin", onIntent);
    document.removeEventListener("touchstart", onIntent);
    window.clearTimeout(idle);
  };
}
