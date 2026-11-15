/**
 * Animation du hero : une user story (côté produit) devient une branche et des
 * commits (côté code), passe les vérifications, puis part en production.
 * Exemples illustratifs, tirés des fonctionnalités visibles des projets.
 */
export interface FlowStory {
  product: string;
  accent: string;
  story: string;
  branch: string;
  commits: string[];
}

export const flowStories: FlowStory[] = [
  {
    product: "Madebocar",
    accent: "#f68b1f",
    story: "En tant que passager, je veux connaître le tarif avant de commander ma course.",
    branch: "feat/estimation-tarif",
    commits: ["feat(course): itinéraire avec arrêts", "feat(course): estimation du tarif", "test(course): commande de bout en bout"],
  },
  {
    product: "JOSMA",
    accent: "#4fc4bd",
    story: "En tant que commerçant, je veux suivre mes ventes du jour, même hors ligne.",
    branch: "feat/ventes-du-jour",
    commits: ["feat(caisse): synthèse des ventes du jour", "feat(sync): file d'attente hors ligne", "test(caisse): tiroir en francs et dollars"],
  },
  {
    product: "Ngo Chat",
    accent: "#6d5dfc",
    story: "En tant que membre, je veux partager un moment avec ma communauté.",
    branch: "feat/moments",
    commits: ["feat(explorer): publication de moments", "feat(moments): j'aime et commentaires", "test(explorer): fil des moments"],
  },
];

export const flowChecks = ["Tests", "Build", "Revue"];
