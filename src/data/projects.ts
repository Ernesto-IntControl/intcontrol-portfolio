export type MockupKind = "madebocar" | "bisomarket" | "bisochat" | "caplualaba";

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  /** Rôle personnel sur le projet, quand il est connu. */
  role?: string;
  /** Technologies : laissé vide tant qu'elles ne sont pas confirmées. */
  stack: string[];
  links: { demo?: string; github?: string };
  /** Couleur d'accent propre au produit (maquette + détails). */
  accent: string;
  mockup: MockupKind;
}

/** Adresse lisible d'un lien (sans protocole ni « www. »). */
export const displayUrl = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export const projects: Project[] = [
  {
    slug: "madebocar",
    title: "Madebocar",
    category: "Mobilité · VTC",
    tagline: "L'application VTC pour commander une course en quelques secondes.",
    description:
      "Application de VTC qui met en relation passagers et chauffeurs. J'y porte la vision produit en tant que Product Owner (priorisation, parcours utilisateurs, arbitrages) et je développe le front-end.",
    role: "Product Owner · Développeur front-end",
    stack: [],
    links: { demo: "https://www.madebocar.com" },
    accent: "#f5a524",
    mockup: "madebocar",
  },
  {
    slug: "bisomarket",
    title: "BisoMarket",
    category: "Registre numérique",
    tagline: "Le registre numérique des commerçants, cabinets et entreprises.",
    description:
      "Registre numérique destiné aux commerçants, cabinets et autres structures : un espace unique pour les enregistrer, les retrouver et tenir leurs informations à jour.",
    stack: [],
    links: { demo: "https://www.bisomarket.com" },
    accent: "#10b981",
    mockup: "bisomarket",
  },
  {
    slug: "bisochat",
    title: "BisoChat",
    category: "Réseau social",
    tagline: "Un réseau social pour échanger, partager et rester connecté.",
    description:
      "Réseau social pour discuter, partager du contenu et garder le lien avec sa communauté.",
    stack: [],
    links: { demo: "https://www.bisochat.com" },
    accent: "#8b5cf6",
    mockup: "bisochat",
  },
  {
    slug: "cap-lualaba",
    title: "Cap Lualaba",
    category: "Tourisme · Géolocalisation",
    tagline: "Le Lualaba à portée de main\u00a0: visiter la province depuis son téléphone.",
    description:
      "Application de découverte touristique du Lualaba\u00a0: on y explore les sites à visiter, on repère les lieux à proximité et on trace l'itinéraire pour s'y rendre, directement depuis son téléphone.",
    stack: [],
    links: { demo: "https://cap-lualaba.onrender.com" },
    accent: "#f43f5e",
    mockup: "caplualaba",
  },
];
