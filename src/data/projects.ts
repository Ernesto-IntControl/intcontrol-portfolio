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
  /** Titre affiché dans la fenêtre d'une capture d'ordinateur (ex : l'adresse du site). */
  label?: string;
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
      "Service de VTC et de taxi à Kolwezi, avec sa propre flotte et ses propres chauffeurs : une application Android et iOS, et la réservation depuis le site madebocar.com.",
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
      { title: "Partout où est le client", text: "Application sur Google Play et l'App Store, ou réservation directement depuis le site." },
      { title: "Prix fixe", text: "Le montant est connu avant la commande et ne change pas en route." },
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
    links: { demo: "https://www.madebocar.com" },
    accent: "#f68b1f",
    shots: [
      shot("madebocar-site", 1280, 800, {
        kind: "desktop",
        label: "madebocar.com",
        alt: "Site madebocar.com : commander une course à Kolwezi, application sur Google Play et l'App Store",
        caption: "Le site madebocar.com : réservation et téléchargement de l'application",
      }),
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
    title: "Josma",
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
        alt: "Josma : tableau de bord d'un commerce (thème sombre) avec ventes, bénéfice, dépenses et budgets",
        caption: "Tableau de bord : ventes du jour, budgets et actions à traiter",
      }),
      shot("josma-dashboard-light", 1088, 763, {
        kind: "desktop",
        theme: "light",
        alt: "Josma : tableau de bord d'un commerce (thème clair) avec ventes, bénéfice, dépenses et budgets",
        caption: "Tableau de bord : ventes du jour, budgets et actions à traiter",
      }),
      shot("josma-mobile", 304, 641, {
        kind: "phone",
        framed: true,
        alt: "Josma : écran de connexion mobile avec les ventes du jour et le stock à jour hors ligne",
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

/** Autres réalisations : produits en cours de développement et sites vitrines. */
export interface OtherWork {
  name: string;
  kind: "en-cours" | "vitrine";
  /** Laissée vide tant qu'elle n'est pas confirmée. */
  description?: string;
  url?: string;
  /** Entreprise qui porte le produit, quand elle est connue. */
  by?: string;
  shot?: Shot;
}

export const ongoing: OtherWork[] = [
  { name: "Intflow", kind: "en-cours" },
  { name: "Helpy", kind: "en-cours" },
  {
    name: "IntSchool",
    kind: "en-cours",
    by: "INT Global Services",
    description: "Logiciel de gestion scolaire pensé pour l'Afrique : inscriptions, frais, bulletins, présences et suivi des parents.",
    url: "https://intschool-site.vercel.app",
    shot: shot("intschool-site", 1280, 800, {
      kind: "desktop",
      alt: "Site d'IntSchool : « Toute votre école, sous contrôle »",
      caption: "Site d'IntSchool",
    }),
  },
  {
    name: "Simara",
    kind: "en-cours",
    by: "INT Global Services",
    description: "Supervision multi-sites des équipes, chantiers, actifs et finances, pour les PME du BTP, de la logistique et au-delà.",
    url: "https://simara-website.vercel.app",
    shot: shot("simara-site", 1280, 800, {
      kind: "desktop",
      alt: "Site de Simara : « Sachez qui travaille où, sur quel projet, avec quelles ressources et à quel coût »",
      caption: "Site de Simara",
    }),
  },
];

export const showcases: OtherWork[] = [
  {
    name: "INT Global Services",
    kind: "vitrine",
    description: "Site vitrine d'une entreprise technologique basée en RDC : produits, services et réalisations.",
    url: "https://intglobalservice-website.vercel.app",
    shot: shot("intglobalservice-site", 1280, 800, {
      kind: "desktop",
      alt: "Site vitrine d'INT Global Services : « Des solutions numériques qui structurent le fonctionnement de votre organisation »",
      caption: "Site vitrine d'INT Global Services",
    }),
  },
  { name: "Helzor", kind: "vitrine", description: "Site vitrine de Helzor Business." },
];
