/**
 * Prérendu : à la fin de `vite build` (plugin dans vite.config.ts), écrit un fichier HTML par page (dist/projets/index.html, …)
 * avec son propre <head> (titre, description, canonical, aperçu de partage) et son contenu.
 *
 * Pourquoi : le site est une SPA. Sans cela, les robots qui n'exécutent pas le JS
 * (aperçus WhatsApp / Facebook / LinkedIn, certains moteurs) voient la même page vide partout.
 *
 * Un échec ici ne casse pas le déploiement : le site reste servi en SPA classique.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, ".prerender");

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  if (!re.test(html)) throw new Error(`Balise ${key} absente de index.html`);
  return html.replace(re, `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`);
}

function renderPage(template, { title, description, url, body }) {
  let html = template.replace(/<title>[^<]*<\/title>/, () =>
    [
      `<title>${escapeText(title)}</title>`,
      `<meta name="description" content="${escapeAttr(description)}" data-prerender />`,
      `<link rel="canonical" href="${url}" data-prerender />`,
    ].join("\n  "),
  );
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "twitter:title", title);
  html = setMeta(html, "property", "twitter:description", description);
  if (!html.includes('<div id="root"></div>')) throw new Error("Conteneur #root introuvable dans index.html");
  return html.replace('<div id="root"></div>', () => `<div id="root"><div data-prerendered>${body}</div></div>`);
}

export async function prerender() {
  try {
    const template = await readFile(path.join(dist, "index.html"), "utf8");
    // Coquille sans contenu : sert les adresses inconnues (voir vercel.json), l'app y affiche la page 404
    await writeFile(path.join(dist, "200.html"), template);

    // Ce build serveur recharge vite.config.ts : le drapeau évite que le plugin se relance lui-même
    process.env.PRERENDERING = "1";
    await build({
      root,
      logLevel: "warn",
      build: { ssr: "src/entry-server.tsx", outDir: serverDir, emptyOutDir: true },
      // Tout est embarqué dans le bundle serveur : pas de résolution ESM/CJS à l'exécution
      ssr: { noExternal: true },
    });

    const { render, pageMeta, SITE_URL } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);

    for (const [route, meta] of Object.entries(pageMeta)) {
      const body = render(route)
        // React place les balises <title>/<meta>/<link> de <Seo> en tête du rendu : le <head> est géré ici
        .replace(/^(?:<title>[^<]*<\/title>|<meta [^>]*>|<link [^>]*>)+/, "")
        // Les icônes en ligne pèsent plus de la moitié du HTML et n'apportent rien aux robots
        .replace(/<svg[\s\S]*?<\/svg>/g, "");
      const html = renderPage(template, { ...meta, url: `${SITE_URL}${route}`, body });
      const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, html);
      console.log(`prérendu ${route.padEnd(10)} ${(html.length / 1024).toFixed(1)} Ko`);
    }
  } catch (error) {
    console.warn("\n⚠ Prérendu ignoré, le site reste servi en SPA :", error);
  } finally {
    delete process.env.PRERENDERING;
    await rm(serverDir, { recursive: true, force: true });
  }
}
