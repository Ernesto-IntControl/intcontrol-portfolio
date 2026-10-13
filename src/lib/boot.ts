/**
 * Démarrage maîtrisé : on attend les polices critiques (avec un plafond) avant
 * d'afficher le site, pour que les animations d'intro ne soient jamais coupées
 * par un changement de police. Pendant ce temps, l'écran d'attente de index.html
 * reste visible (il n'apparaît que si le chargement dépasse 350 ms).
 */
const CRITICAL_FONTS = ['600 1em "Geist Variable"', '500 1em "Geist Mono Variable"', 'italic 400 1em "Instrument Serif"'];

export function waitForBoot(maxWait = 1800): Promise<void> {
  const fonts =
    "fonts" in document
      ? Promise.all(CRITICAL_FONTS.map((font) => document.fonts.load(font))).then(
          () => undefined,
          () => undefined,
        )
      : Promise.resolve();
  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, maxWait));
  return Promise.race([fonts, timeout]);
}

export function hideSplash() {
  document.documentElement.classList.add("booted");
  const splash = document.getElementById("boot");
  if (splash) window.setTimeout(() => splash.remove(), 700);
}

type NetworkInfo = { saveData?: boolean; effectiveType?: string; downlink?: number };

/** Infos réseau et matériel quand le navigateur les expose (Chrome, Android). */
export function getDeviceProfile() {
  const nav = navigator as Navigator & { connection?: NetworkInfo; deviceMemory?: number };
  const connection = nav.connection;
  // Économie de données, 2G, ou débit estimé sous 1 Mbit/s (3G lente)
  const slowNetwork =
    !!connection?.saveData ||
    ["slow-2g", "2g"].includes(connection?.effectiveType ?? "") ||
    (connection?.downlink !== undefined && connection.downlink > 0 && connection.downlink < 1);
  const fastNetwork = !connection?.saveData && (connection?.effectiveType ?? "4g") === "4g";
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 2;
  const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory !== undefined && nav.deviceMemory <= 4);
  return { slowNetwork, fastNetwork, lowMemory, lowEnd };
}

/** Exécute une tâche quand le navigateur est inactif (avec repli). */
export function whenIdle(task: () => void, timeout = 1500) {
  // Safari ne connaît pas requestIdleCallback
  const ric = (window as Partial<Window>).requestIdleCallback;
  if (typeof ric === "function") {
    const id = window.requestIdleCallback(task, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(task, 300);
  return () => window.clearTimeout(id);
}
