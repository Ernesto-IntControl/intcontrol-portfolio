export type MockupKind = "madebocar" | "bisomarket" | "bisochat";

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  /** Le problème que le produit résout, en une phrase. */
  problem: string;
  /** Ce que fait le produit, en quelques points. */
  highlights: string[];
  /** Rôle personnel sur le projet, quand il est connu. */
  role?: string;
  /**
   * Ce que je fais côté produit (casquette Product Owner) et côté code
   * (casquette ingénieur). Laissés vides tant qu'ils ne sont pas confirmés :
   * la fiche affiche alors les points clés du produit à la place.
   */
  product: string[];
  engineering: string[];
  /** Technologies : laissé vide tant qu'elles ne sont pas confirmées. */
  stack: string[];
  links: { demo?: string; github?: string };
  /** Couleur d'accent propre au produit (maquette + détails). */
  accent: string;
  mockup: MockupKind;
}

export const projects: Project[] = [
  {
    slug: "madebocar",
    title: "Madebocar",
    category: "Mobilité · VTC",
    tagline: "L'application VTC pour commander une course en quelques secondes.",
    problem: "Commander une course doit prendre quelques secondes, pas quelques appels.",
    highlights: ["Mise en relation passagers et chauffeurs", "Commande d'une course en quelques secondes"],
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
    accent: "#f5a524",
    mockup: "madebocar",
  },
  {
    slug: "bisomarket",
    title: "BisoMarket",
    category: "Registre numérique",
    tagline: "Le registre numérique des commerçants, cabinets et entreprises.",
    problem: "Des informations sur les commerçants, cabinets et entreprises éparpillées, et rarement à jour.",
    highlights: [
      "Enregistrer commerçants, cabinets et entreprises",
      "Retrouver une structure en quelques recherches",
      "Tenir ses informations à jour",
    ],
    product: [],
    engineering: [],
    stack: [],
    links: {},
    accent: "#10b981",
    mockup: "bisomarket",
  },
  {
    slug: "bisochat",
    title: "BisoChat",
    category: "Réseau social",
    tagline: "Un réseau social pour échanger, partager et rester connecté.",
    problem: "Discuter, partager et garder le lien avec sa communauté, au même endroit.",
    highlights: ["Discussions", "Partage de contenu", "Lien avec sa communauté"],
    product: [],
    engineering: [],
    stack: [],
    links: {},
    accent: "#8b5cf6",
    mockup: "bisochat",
  },
];
