/**
 * Démarrage maîtrisé : on attend les polices critiques (avec un plafond) avant
 * d'afficher le site, pour que les animations d'entrée ne soient jamais coupées
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
  const splash = document.getElementById("boot");
  document.documentElement.classList.add("booted");
  if (splash) window.setTimeout(() => splash.remove(), 700);
}
