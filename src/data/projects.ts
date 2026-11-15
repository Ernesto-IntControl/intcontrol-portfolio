export interface Shot {
  /** Chemin sans extension : les fichiers existent en .avif et .webp. */
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: "phone" | "desktop";
  /** Variante réservée à un thème (ex : tableau de bord clair / sombre). */
  theme?: "dark" | "light";
  /** La capture contient déjà son cadre de téléphone. */
  framed?: boolean;
  caption: string;
}

export interface Feature {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Nom complet quand le titre est un sigle. */
  fullName?: string;
  category: string;
  /** Entreprise qui édite le produit, quand elle est connue. */
  company?: string;
  tagline: string;
  /** Le problème que le produit résout, en une phrase. */
  problem: string;
  /** Présentation du produit en deux phrases. */
  summary: string;
  /** Ce que fait le produit, en quelques points courts (fiches). */
  highlights: string[];
  /** Fonctionnalités détaillées (étude de cas). */
  features: Feature[];
  /** Rôle personnel sur le projet, quand il est connu. */
  role?: string;
  /**
   * Ce que je fais côté produit (casquette Product Owner) et côté code
   * (casquette ingénieur). Laissés vides tant qu'ils ne sont pas confirmés :
   * les fiches affichent alors les points clés du produit à la place.
   */
  product: string[];
  engineering: string[];
  /** Technologies : laissé vide tant qu'elles ne sont pas confirmées. */
  stack: string[];
  links: { demo?: string; github?: string };
  /** Couleur propre au produit (halo, pastilles). */
  accent: string;
  shots: Shot[];
}

const shot = (name: string, width: number, height: number, rest: Omit<Shot, "src" | "width" | "height">): Shot => ({
  src: `/images/projects/${name}`,
  width,
  height,
  ...rest,
});

export const projects: Project[] = [
  {
    slug: "madebocar",
    title: "Madebocar",
    category: "Mobilité · VTC",
    tagline: "L'application VTC pour commander une course en quelques secondes.",
    problem: "Commander une course doit prendre quelques secondes, pas quelques appels.",
    summary:
      "Application de VTC qui met en relation passagers et chauffeurs, de la saisie de l'itinéraire jusqu'à la prise en charge.",
    highlights: [
      "Jusqu'à 8 arrêts et 8 passagers par course",
      "Tarif et moyen de paiement affichés dès la commande",
      "Recherche du chauffeur suivie sur la carte",
    ],
    features: [
      { title: "Itinéraire sur mesure", text: "Lieu de départ géolocalisé, destination et jusqu'à 8 arrêts sur une même course." },
      { title: "Pensée pour les groupes", text: "De 1 à 8 passagers, choisis en un geste avant de commander." },
      { title: "Tarif transparent", text: "Prix en francs congolais, détail du tarif et moyen de paiement visibles pendant la recherche." },
      { title: "Recherche en direct", text: "Le trajet s'affiche sur la carte pendant la recherche du chauffeur, et la course reste annulable." },
    ],
    role: "Product Owner · Développeur front-end",
    product: [
      "Vision produit et priorisation du backlog",
      "Parcours utilisateurs, côté passager comme côté chauffeur",
      "Arbitrages entre besoins métier, design et contraintes techniques",
    ],
    engineering: [
      "Développement du front-end de l'application",
      "Les parcours que je priorise, je les code : aucune perte entre l'intention et l'écran",
    ],
    stack: [],
    links: {},
    accent: "#f68b1f",
    shots: [
      shot("madebocar-commande", 607, 1280, {
        kind: "phone",
        alt: "Madebocar : écran de commande avec départ, destination, arrêts et nombre de passagers",
        caption: "Commande : itinéraire, arrêts et nombre de passagers",
      }),
      shot("madebocar-recherche", 607, 1280, {
        kind: "phone",
        alt: "Madebocar : recherche de chauffeur avec le trajet sur la carte et le tarif",
        caption: "Recherche du chauffeur, trajet et tarif",
      }),
    ],
  },
  {
    slug: "josma",
    title: "JOSMA",
    fullName: "Josar Management",
    category: "Gestion commerciale",
    company: "Josar Technologie",
    tagline: "La gestion d'un commerce au même endroit : caisse, ventes, stock et dépenses, même hors ligne.",
    problem: "Tenir la caisse, le stock et les dépenses d'un commerce sans cahier ni tableur, en francs comme en dollars.",
    summary:
      "Application de gestion pour commerçants éditée par Josar Technologie : caisse, ventes, stock, dépenses, clients et équipe, sur ordinateur comme sur téléphone.",
    highlights: [
      "Caisse, ventes et stock suivis en temps réel",
      "Francs et dollars dans le même tiroir de caisse",
      "Stock à jour, même hors ligne",
    ],
    features: [
      { title: "Tableau de bord du jour", text: "Ventes, bénéfice, dépenses et tickets comparés à la veille, avec les ventes heure par heure." },
      { title: "Caisse en deux devises", text: "Tiroir de caisse en francs et en dollars, et moyens de paiement encaissés dans la journée." },
      { title: "Stock et budgets", text: "Alertes de stock bas, pertes à valider et budgets du mois suivis par poste de dépense." },
      { title: "Équipe et traçabilité", text: "Gestion de l'équipe, journal d'activité et rapports ; le stock reste à jour même hors ligne." },
    ],
    product: [],
    engineering: [],
    stack: [],
    links: {},
    accent: "#4fc4bd",
    shots: [
      shot("josma-dashboard-dark", 1088, 763, {
        kind: "desktop",
        theme: "dark",
        alt: "JOSMA : tableau de bord d'un commerce (thème sombre) avec ventes, bénéfice, dépenses et budgets",
        caption: "Tableau de bord : ventes du jour, budgets et actions à traiter",
      }),
      shot("josma-dashboard-light", 1088, 763, {
        kind: "desktop",
        theme: "light",
        alt: "JOSMA : tableau de bord d'un commerce (thème clair) avec ventes, bénéfice, dépenses et budgets",
        caption: "Tableau de bord : ventes du jour, budgets et actions à traiter",
      }),
      shot("josma-mobile", 304, 641, {
        kind: "phone",
        framed: true,
        alt: "JOSMA : écran de connexion mobile avec les ventes du jour et le stock à jour hors ligne",
        caption: "Application mobile : connexion et ventes du jour",
      }),
    ],
  },
  {
    slug: "ngo-chat",
    title: "Ngo Chat",
    category: "Réseau social",
    tagline: "Le réseau social pour discuter, partager des moments et rester proche de sa communauté.",
    problem: "Discuter, partager et garder le lien avec sa communauté, sans jongler entre plusieurs applications.",
    summary: "Réseau social qui réunit messagerie, contacts et fil de moments, accessible depuis le navigateur.",
    highlights: [
      "Messagerie et contacts",
      "Moments, chaînes et marché dans l'onglet Explorer",
      "QR code personnel et thème personnalisable",
    ],
    features: [
      { title: "Messagerie et contacts", text: "Les discussions et le carnet de contacts, au cœur de l'application." },
      { title: "Explorer", text: "Moments, chaînes, marché et scan réunis dans un même onglet." },
      { title: "Moments", text: "Publier une photo ou une pensée, puis aimer, commenter, republier et partager." },
      { title: "Profil", text: "Profil public, QR code personnel, confidentialité, notifications et thème." },
    ],
    product: [],
    engineering: [],
    stack: [],
    links: { demo: "https://ngochats.com" },
    accent: "#6d5dfc",
    shots: [
      shot("ngo-chat-explorer", 571, 1117, {
        kind: "phone",
        alt: "Ngo Chat : onglet Explorer avec le fil des moments",
        caption: "Explorer : le fil des moments",
      }),
      shot("ngo-chat-profil", 571, 1117, {
        kind: "phone",
        alt: "Ngo Chat : page de profil avec contacts, moments et réglages",
        caption: "Profil : contacts, QR code et réglages",
      }),
    ],
  },
];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
