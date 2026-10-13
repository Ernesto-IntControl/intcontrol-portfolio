# Portfolio — INTCONTROL

Portfolio d'**Ernest Katumbi**, alias **INTCONTROL** : Lead Software Engineer chez Josar Technologie et Product Owner. Web et mobile en **JavaScript** (Next.js, NestJS, Node.js, Expo), et **.NET** en complément.

## Aperçu

- Hero en **WebGL** (Three.js) : l'emblème hexagonal du logo entouré d'un globe de tuiles, qui réagit à la souris et au scroll
- Thème **sombre / clair** avec transition circulaire (View Transitions API), choix mémorisé
- **Scroll inertiel** (Lenis), animations liées au scroll, cartes projets empilées
- Composants **3D** : cartes inclinables avec profondeur, boutons magnétiques, maquettes de produits codées en CSS
- Logotype **INTCONTROL** animé en fin de page (lettres qui se dressent et se remplissent, vague, survol)
- Pages : accueil, projets, services, à propos, contact (EmailJS), 404

## Projets présentés

- **[Madebocar](https://www.madebocar.com)** — application VTC (Product Owner & développeur front-end)
- **[BisoMarket](https://www.bisomarket.com)** — registre numérique pour commerçants, cabinets et entreprises
- **[BisoChat](https://www.bisochat.com)** — réseau social
- **[Cap Lualaba](https://cap-lualaba.onrender.com)** — découverte touristique du Lualaba : sites, lieux à proximité et itinéraires

Le contenu (profil, projets, compétences, services) est centralisé dans `src/data/`.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS 4
- Motion (animations), Lenis (scroll)
- Three.js (sans surcouche, pour un chunk plus léger)
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

Le site est pensé pour rester fluide sur une connexion lente :

- Écran d'attente léger intégré au HTML, affiché seulement si le démarrage dépasse 350 ms
- Polices critiques préchargées ; les animations d'intro attendent les polices (1,8 s max) pour ne jamais être coupées
- Pages secondaires découpées et préchargées à l'intention (survol, focus, toucher)
- Portrait en AVIF/WebP responsive (19 à 60 Ko au lieu de 515 Ko) avec aperçu flou intégré
- Scène 3D (~145 Ko gzip) chargée après l'intro, quand le navigateur est libre ; remplacée par un emblème SVG en mode économie de données, en 2G ou sous 1 Mbit/s, et si l'appareil n'arrive pas à la faire tourner
- Animations limitées aux propriétés composées par le GPU (transform, opacity), `prefers-reduced-motion` respecté
- `vercel.json` : cache long sur les fichiers versionnés et redirection des routes vers l'application
