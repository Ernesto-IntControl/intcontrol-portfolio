/** Image responsive (AVIF puis WebP) avec son aperçu flou de 24 px. */
export interface ImageSet {
  src: string;
  width: number;
  height: number;
  avif: string;
  webp: string;
  placeholder: string;
}

export type ProjectVisual =
  /** Planche de présentation réelle du produit : un recadrage pour les cartes, la planche entière pour la fiche. */
  | {
      kind: "board";
      cover: ImageSet;
      board: ImageSet;
      background: string;
      alt: string;
      /** Côté du recadrage à garder visible quand la carte est plus étroite que l'image. */
      coverFocus?: "object-left" | "object-right";
    }
  /** Capture d'écran réelle, présentée dans un téléphone. */
  | { kind: "phone"; screen: ImageSet; screenBackground: string; alt: string }
  /** Maquette illustrative dessinée en CSS, en attendant de vrais visuels. */
  | { kind: "mockup" };

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  /** Rôle personnel sur le projet, quand il est connu. */
  role?: string;
  /** Ce que fait le produit, en quelques mots. */
  highlights: string[];
  /** Technologies : laissé vide tant qu'elles ne sont pas confirmées. */
  stack: string[];
  links: { demo?: string; github?: string };
  /** Couleur d'accent propre au produit (visuel + détails). */
  accent: string;
  visual: ProjectVisual;
}

const madebocarCover: ImageSet = {
  src: "/images/projects/madebocar-cover-850.webp",
  width: 850,
  height: 940,
  avif: "/images/projects/madebocar-cover-480.avif 480w, /images/projects/madebocar-cover-850.avif 850w",
  webp: "/images/projects/madebocar-cover-480.webp 480w, /images/projects/madebocar-cover-850.webp 850w",
  placeholder: "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAAAwBQCdASoYABsAPu1qrlCppaQiqAqpMB2JZQC/7BEKNcJ04QjjENdBFf/nkJQ8eumE8AD+53m4YoIM7U2XLrjo4BaKln5DOdPmfDDBwzaevUec+mYXyd8WrDHoevoKxC51GMbNH6wIvQUUPVlFE1AiAAFjPJo9uYkq31SjGKHO39261yAbl2VY+7Xe5GJs9GTSIAQ2g2UTr107HrW6+ccZGK+a/C4iluh727MzQkf1t5uOEcCbqECAAAA=",
};

const madebocarBoard: ImageSet = {
  src: "/images/projects/madebocar-board-2000.webp",
  width: 2000,
  height: 1250,
  avif: "/images/projects/madebocar-board-800.avif 800w, /images/projects/madebocar-board-1400.avif 1400w, /images/projects/madebocar-board-2000.avif 2000w",
  webp: "/images/projects/madebocar-board-800.webp 800w, /images/projects/madebocar-board-1400.webp 1400w, /images/projects/madebocar-board-2000.webp 2000w",
  placeholder: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoYAA8APu1iqU2ppaOiMAgBMB2JYwDCgCHfg7+i/N/gytNgAP7v8BhAQ8qrtF3/5E0QB4r96dXBNHwsNeXge1fJiFjrFY9vco5L+VKvIRRIaXiYh401KhyzfVj4ABr3RgAAAA==",
};

const josarCover: ImageSet = {
  src: "/images/projects/josar-cover-1220.webp",
  width: 1220,
  height: 1030,
  avif: "/images/projects/josar-cover-480.avif 480w, /images/projects/josar-cover-800.avif 800w, /images/projects/josar-cover-1220.avif 1220w",
  webp: "/images/projects/josar-cover-480.webp 480w, /images/projects/josar-cover-800.webp 800w, /images/projects/josar-cover-1220.webp 1220w",
  placeholder: "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAAAQBQCdASoYABQAPu1qrVCppaQiqAqpMB2JYwC4MBEvtE8U1yPvP4t+fcn8phTNhzZAAPl5sY2sUc5CkJTfHMEipAJSyNqyKONgdwvXN7CdIerSyhCihPnkPTUxiv7IFIwPr5My9fXIrjqiur6jhb24JE6Lj/iXOUi8bZiFNM7OjPIB8dTks1SmTyeAQvTAHhfAAA==",
};

const josarBoard: ImageSet = {
  src: "/images/projects/josar-board-2000.webp",
  width: 2000,
  height: 1250,
  avif: "/images/projects/josar-board-800.avif 800w, /images/projects/josar-board-1400.avif 1400w, /images/projects/josar-board-2000.avif 2000w",
  webp: "/images/projects/josar-board-800.webp 800w, /images/projects/josar-board-1400.webp 1400w, /images/projects/josar-board-2000.webp 2000w",
  placeholder: "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAABwBACdASoYAA8APu1iqU2ppaOiMAgBMB2JQBOmUGUgB38M4c3p2sDky0c1AAD+7E3ojxw24BNaI0mo2OvBVp6NOpwqPkKmZ+M330Bn9JlEdV0as9m6aOR0czX8+scfvqlYENzUHs9CHggoqtSt+yiQjC3KBc9p1aLlngT5GMmSYsYAAAA=",
};

const bisochatScreen: ImageSet = {
  src: "/images/projects/bisochat-profil-310.webp",
  width: 310,
  height: 608,
  avif: "/images/projects/bisochat-profil-310.avif 310w",
  webp: "/images/projects/bisochat-profil-310.webp 310w",
  placeholder: "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAADQBACdASoYAC8APu1oqE8ppiOiKqwBMB2JZwAAUwWEKIT1bgv8sYXKwTm42b6IAAD+8DLufUL9soBkSM2Jm6fTX2rgE+sbYaAqdIYqOktiLQGzzL5xK5KfPzkuqUQEqfg1/JTYmV+Q2MpVeLkk1TlZ66Qmp4oQB2C9k34aPaWrJlbRYgOWwAAA",
};

export const projects: Project[] = [
  {
    slug: "madebocar",
    title: "Madebocar",
    category: "Mobilité · VTC",
    tagline: "L'application VTC pour commander une course en quelques secondes.",
    description:
      "Application de VTC qui met en relation passagers et chauffeurs à Kolwezi. J'y porte la vision produit en tant que Product Owner (priorisation, parcours utilisateurs, arbitrages) et je développe le front-end.",
    role: "Product Owner · Développeur front-end",
    highlights: ["Commande en quelques secondes", "4 catégories, prix affiché", "Chauffeur suivi sur la carte", "Notes et badges"],
    stack: [],
    links: {},
    accent: "#f5a524",
    visual: {
      kind: "board",
      cover: madebocarCover,
      board: madebocarBoard,
      background: "#f9ece0",
      alt: "Écrans de Madebocar : choix du véhicule avec prix affiché, puis suivi du chauffeur sur la carte de Kolwezi",
    },
  },
  {
    slug: "josar-management",
    title: "Josar Management",
    category: "Point de vente · Gestion",
    tagline: "La caisse, le stock et le crédit client des commerces, même sans réseau.",
    description:
      "Point de vente et gestion pour les commerces de Kolwezi : caisse, stock et péremption, crédit clients, en francs et en dollars, sur mobile comme sur le web, même sans réseau.",
    highlights: ["Caisse hors ligne", "Stock et péremption", "Francs et dollars", "Mobile et web"],
    stack: [],
    links: {},
    accent: "#14b8a6",
    visual: {
      kind: "board",
      cover: josarCover,
      board: josarBoard,
      background: "#04213e",
      coverFocus: "object-left",
      alt: "Josar Management : l'application mobile de caisse devant le tableau de bord web (ventes, bénéfice, dépenses, budgets)",
    },
  },
  {
    slug: "bisochat",
    title: "BisoChat",
    category: "Réseau social",
    tagline: "Un réseau social pour échanger, partager et rester connecté.",
    description:
      "Réseau social pour discuter, partager des moments et garder le lien avec sa communauté : messagerie, contacts, chaînes, marché et profil avec QR code.",
    highlights: ["Messagerie", "Moments", "Chaînes", "Marché", "QR code"],
    stack: [],
    links: { demo: "https://ngochats.com" },
    accent: "#8b5cf6",
    visual: {
      kind: "phone",
      screen: bisochatScreen,
      screenBackground: "#ecebfc",
      alt: "Écran de profil de BisoChat, avec ses onglets Chat, Contacts, Explorer et Moi",
    },
  },
  {
    slug: "bisomarket",
    title: "BisoMarket",
    category: "Registre numérique",
    tagline: "Le registre numérique des commerçants, cabinets et entreprises.",
    description:
      "Registre numérique destiné aux commerçants, cabinets et autres structures : un espace unique pour les enregistrer, les retrouver et tenir leurs informations à jour.",
    highlights: [],
    stack: [],
    links: {},
    accent: "#10b981",
    visual: { kind: "mockup" },
  },
];
