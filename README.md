# Portfolio — INTCONTROL

Portfolio d'**Ernest Katumbi**, alias **INTCONTROL** : Product Owner et Lead Software Engineer chez Josar Technologie. Web et mobile en **JavaScript** (Next.js, NestJS, Node.js, Expo), et **.NET** en complément.

> Des produits *pensés* pour vos utilisateurs, `construits` pour durer.

## Parti pris

Un site sobre de plusieurs pages, centré sur les projets, avec une signature qui court partout :
**le côté produit s'écrit en serif italique, le côté code en mono**.

- **Hero** : « pensés » se souligne d'un trait tracé à la main, « construits » se pose sur un fond de code. À droite, une carte animée montre le chemin **de l'idée à la production** : une user story devient une branche et des commits, passe les tests, le build et la revue, puis part en production, sur trois exemples tirés des projets (pause au survol).
- **Trame en nid d'abeille** (clin d'œil à l'emblème hexagonal) : une lumière la balaie à l'arrivée, puis suit la souris.
- **Projets** illustrés par les **vraies captures** des applications (le tableau de bord JOSMA suit le thème clair ou sombre du site), avec une **étude de cas** par projet : problème, fonctionnalités, rôle côté produit et côté code, écrans.
- **Expertise** : les deux casquettes (Product Owner / Lead Software Engineer), la méthode en quatre étapes reliées par un fil qui se remplit au scroll, et les outils (dont .NET avec Entity Framework Core et la gestion de projet).
- Repères de section qui se « décodent », filets qui se tracent, chiffres qui défilent, emblème qui se dessine dans la navigation, transitions entre pages.
- Thème **sombre / clair** avec transition circulaire (View Transitions API), choix mémorisé.

Pages : accueil, projets, une étude de cas par projet (`/projets/madebocar`, `/projets/josma`, `/projets/ngo-chat`), expertise (`/services` y redirige), à propos, contact (EmailJS), 404.

## Contenu

Tout le contenu est centralisé dans `src/data/` :

- `projects.ts` : les projets et leurs captures (`public/images/projects/`, en AVIF et WebP). Les champs `product` et `engineering` décrivent ce que je fais côté produit et côté code ; laissés vides, les fiches affichent les points clés du produit (`highlights`). `stack` et `links` s'affichent dès qu'ils sont renseignés.
- `heroFlow.ts` : les exemples de la carte animée du hero.
- `method.ts` : les deux casquettes et les étapes de la méthode.
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
- Portrait en AVIF/WebP responsive avec aperçu flou intégré
- Animations limitées à transform et opacity ; `prefers-reduced-motion` respecté (texte affiché directement, pas de balayage)
- `vercel.json` : cache long sur les fichiers versionnés et redirection des routes vers l'application
