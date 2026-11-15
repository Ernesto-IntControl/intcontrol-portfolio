# Portfolio — INTCONTROL

Portfolio d'**Ernest Katumbi**, alias **INTCONTROL** : Product Owner et Lead Software Engineer chez Josar Technologie. Web et mobile en **JavaScript** (Next.js, NestJS, Node.js, Expo), et **.NET** en complément.

> Je pense le *produit*. J'écris le `code`.

## Parti pris

Une seule page, sobre, centrée sur les projets, avec une signature qui court sur tout le site :
**le côté produit s'écrit en serif italique, le côté code en mono**.

- **Hero typographique** : « produit » se souligne d'un trait tracé à la main, « code » se tape lettre à lettre suivi d'un curseur. Au survol, le trait se redessine et le mot se retape.
- **Trame en nid d'abeille** (clin d'œil à l'emblème hexagonal) : une lumière la balaie à l'arrivée, puis suit la souris.
- **Projets mis en avant** juste après le hero : pour chacun, le problème, puis ce que je fais *côté produit* et `côté code`, avec une maquette du produit codée en CSS.
- **Méthode** : les deux casquettes (Product Owner / Lead Software Engineer) et quatre étapes reliées par un fil qui se remplit au scroll.
- Repères de section qui se « décodent », filets qui se tracent, chiffres qui défilent, emblème qui se dessine dans la navigation.
- Thème **sombre / clair** avec transition circulaire (View Transitions API), choix mémorisé.

Sections : Projets, Méthode, À propos, Stack, Contact (EmailJS). Les anciennes URL (`/projets`, `/services`, `/a-propos`, `/contact`) renvoient vers la section correspondante.

## Contenu

Tout le contenu est centralisé dans `src/data/` :

- `projects.ts` : les projets. Les champs `product` et `engineering` décrivent ce que je fais côté produit et côté code ; laissés vides, la fiche affiche les points clés du produit (`highlights`). `stack` et `links` s'affichent dès qu'ils sont renseignés.
- `method.ts` : les deux casquettes et les étapes de la méthode.
- `profile.ts`, `skills.ts` : profil, parcours, chiffres, stack.

## Stack

- React 19, TypeScript, Vite
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

- Aucune scène 3D ni bibliothèque de scroll : le site est nettement plus léger qu'avant
- Écran d'attente léger intégré au HTML, affiché seulement si le démarrage dépasse 350 ms ; les animations d'entrée attendent les polices (1,8 s max)
- Trame en nid d'abeille sur un seul canvas, redessiné uniquement quand la lumière bouge et que le hero est visible
- Portrait en AVIF/WebP responsive avec aperçu flou intégré
- Animations limitées à transform et opacity ; `prefers-reduced-motion` respecté (texte affiché directement, pas de balayage)
- `vercel.json` : cache long sur les fichiers versionnés et redirection des routes vers l'application
