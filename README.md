# Portfolio — INTCONTROL

Portfolio d'**Ernest Katumbi**, alias **INTCONTROL** : développeur fullstack et Lead Software Engineer chez Josar Technologie. Web et mobile en **JavaScript** (Next.js, NestJS, Node.js, Expo), et **.NET** en complément.

> Des produits *pensés* pour vos utilisateurs, `construits` pour durer.

## Parti pris

Un site sobre de plusieurs pages, centré sur les projets, avec une signature qui court partout :
**le côté produit s'écrit en serif italique, le côté code en mono**.

- **Hero** : « pensés » se souligne d'un trait tracé à la main, « construits » se pose sur un fond de code. À droite, mon portrait **dessiné au stylo** (traits et hachures générés à partir de la photo : encre noire en thème clair, stylo blanc sur papier noir en thème sombre) se trace de haut en bas, suit un peu la souris et s'efface au scroll ; par-dessus, une trame en nid d'abeille balayée par une lumière qui suit la souris.
- **Accueil en bref** : à propos, projets, expertise et contact en version courte, le détail sur chaque page.
- **Projets** illustrés par les **vraies captures** (le tableau de bord Josma suit le thème clair ou sombre du site). L'**étude de cas s'ouvre sur place** (`/projets/madebocar`, `/projets/josma`, `/projets/ngo-chat`) : les autres cartes s'effacent, la carte choisie se réduit en bandeau, puis l'étude se déploie dessous (problème, fonctionnalités, rôle, écrans).
- **En cours** (Intflow, Helpy, IntSchool, Simara) et **sites vitrines** (INT Global Services, Helzor) sur la page Projets.
- **Expertise** : savoir-faire (web fullstack, mobile, .NET, cadrage & conception, direction technique, qualité & livraison), la méthode en quatre étapes reliées par un fil qui se remplit au scroll, et les outils (dont .NET avec Entity Framework Core et la gestion de projet).
- **Navigation dans les pages** : un sommaire flottant suit la section en cours (accueil, projets, expertise) et un lien « Page suivante » enchaîne les pages.
- **Maquettes de téléphone** homogènes : cadre, barre d'état et barre d'accueil, au style de celle de Josma.
- Repères de section qui se « décodent », filets qui se tracent, chiffres qui défilent, emblème qui se dessine dans la navigation, transitions entre pages.
- Thème **sombre / clair** avec transition circulaire (View Transitions API), choix mémorisé.

Pages : accueil, à propos, projets (et leurs études de cas), expertise (`/services` y redirige), contact (EmailJS), 404.

## Contenu

Tout le contenu est centralisé dans `src/data/` :

- `projects.ts` : les études de cas et leurs captures (`public/images/projects/`, en AVIF et WebP), puis les projets en cours (`ongoing`) et les sites vitrines (`showcases`). Les champs `product` et `engineering` décrivent ce que je fais côté produit et côté code ; laissés vides, l'étude affiche les fonctionnalités seules. `stack` et `links` s'affichent dès qu'ils sont renseignés.
- `method.ts` : savoir-faire et étapes de la méthode.
- `profile.ts`, `skills.ts` : profil, parcours, chiffres, outils.

## Stack

- React 19, TypeScript, Vite, React Router
- Tailwind CSS 4
- Motion (animations)
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

- Aucune scène 3D ni bibliothèque de scroll ; pages secondaires découpées et préchargées à l'intention (survol, focus, toucher)
- Captures en AVIF/WebP (12 à 46 Ko), chargées à la demande ; celle du thème inactif n'est jamais téléchargée
- Écran d'attente léger intégré au HTML, affiché seulement si le démarrage dépasse 350 ms ; les animations d'entrée attendent les polices (1,8 s max)
- Trame en nid d'abeille sur un seul canvas, redessiné uniquement quand la lumière bouge et que le hero est visible
- Portrait en AVIF/WebP responsive avec aperçu flou intégré ; portrait au stylo en niveaux de gris (54 à 70 Ko en AVIF), affiché par mode de fusion
- Animations limitées à transform et opacity ; `prefers-reduced-motion` respecté (texte affiché directement, pas de balayage)
- `vercel.json` : cache long sur les fichiers versionnés et redirection des routes vers l'application
