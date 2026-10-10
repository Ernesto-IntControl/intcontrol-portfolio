# Portfolio — INTCONTROL

Portfolio d'**Ernest Katumbi**, alias **INTCONTROL** : Lead Software Engineer chez Josar Technologie, fondateur d'INT GLOBAL SERVICES, développeur fullstack **C# (.NET)** et **Next.js**.

## Aperçu

- Hero en **WebGL** (Three.js / React Three Fiber) : l'emblème hexagonal du logo entouré d'un globe de tuiles, qui réagit à la souris et au scroll
- Thème **sombre / clair** avec transition circulaire (View Transitions API), choix mémorisé
- **Scroll inertiel** (Lenis), animations liées au scroll, cartes projets empilées
- Composants **3D** : cartes inclinables avec profondeur, boutons magnétiques, maquettes de produits codées en CSS
- Pages : accueil, projets, services, à propos, contact (EmailJS), 404

## Projets présentés

- **Madebocar** — application VTC (Product Owner & développeur front-end)
- **BisoMarket** — registre numérique pour commerçants, cabinets et entreprises
- **BisoChat** — réseau social

Le contenu (profil, projets, compétences, services) est centralisé dans `src/data/`.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS 4
- Motion (animations), Lenis (scroll)
- Three.js, React Three Fiber
- EmailJS, Vercel Analytics

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # vérification TypeScript
npm run build    # build de production dans dist/
```

### Variables d'environnement (formulaire de contact)

```bash
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Accessibilité et performances

- Animations désactivées ou simplifiées avec `prefers-reduced-motion`
- La scène 3D est chargée à part, mise en pause hors écran, et remplacée par un visuel statique sans WebGL
- Animations limitées aux propriétés composées par le GPU (transform, opacity)
