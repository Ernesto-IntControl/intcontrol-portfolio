/**
 * Pages secondaires chargées à la demande. Connexion instable : un téléchargement
 * qui échoue est retenté (après 0,8 s puis 2 s) avant d'afficher une erreur.
 */
function withRetry<T>(load: () => Promise<T>, delays = [800, 2000]): () => Promise<T> {
  return () =>
    delays.reduce(
      (attempt, delay) => attempt.catch(() => new Promise<void>((resolve) => setTimeout(resolve, delay)).then(load)),
      load(),
    );
}

export const pageLoaders = {
  "/projets": withRetry(() => import("./pages/ProjectsPage")),
  "/services": withRetry(() => import("./pages/ServicesPage")),
  "/a-propos": withRetry(() => import("./pages/AboutPage")),
  "/contact": withRetry(() => import("./pages/ContactPage")),
} as const;

type RoutePath = keyof typeof pageLoaders;
const requested = new Set<string>();

function prefetchRoute(href: string | null) {
  if (!href?.startsWith("/")) return;
  const path = href.split(/[?#]/)[0] as RoutePath;
  if (!(path in pageLoaders) || requested.has(path)) return;
  requested.add(path);
  pageLoaders[path]().catch(() => requested.delete(path));
}

/** Précharge une page dès l'intention de navigation (survol, focus, toucher). */
export function setupRoutePrefetch() {
  const onIntent = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.("a[href]");
    if (link) prefetchRoute(link.getAttribute("href"));
  };
  const types = ["pointerover", "focusin", "touchstart"] as const;
  types.forEach((t) => document.addEventListener(t, onIntent, { passive: true }));
  return () => types.forEach((t) => document.removeEventListener(t, onIntent));
}
