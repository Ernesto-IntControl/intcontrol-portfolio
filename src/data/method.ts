/** Ce que je livre : le développement, et le cadrage produit qui le précède. */
export interface Capability {
  title: string;
  text: string;
  items: string[];
}

export const capabilities: Capability[] = [
  {
    title: "Web fullstack",
    text: "Applications web de bout en bout, de l'interface à l'API.",
    items: ["Next.js · React", "NestJS · Node.js", "GraphQL & API REST", "Prisma · Drizzle"],
  },
  {
    title: "Applications mobiles",
    text: "Apps iOS et Android, publiées sur les stores.",
    items: ["Expo · React Native", "Flutter · Dart", "Capacitor · Ionic"],
  },
  {
    title: "Backends .NET",
    text: "Des API C# robustes quand le projet l'exige.",
    items: ["C# · .NET", "Entity Framework Core", "Authentification JWT"],
  },
  {
    title: "Cadrage & conception",
    text: "Un besoin traduit en parcours clairs et en backlog priorisé, avant la première ligne de code.",
    items: ["Ateliers & user stories", "Prototypes Figma", "Priorisation & roadmap"],
  },
  {
    title: "Direction technique",
    text: "Architecture, qualité du code et accompagnement de l'équipe au quotidien.",
    items: ["Architecture", "Revue de code", "Accompagnement"],
  },
  {
    title: "Qualité & livraison",
    text: "Des versions testées, livrées par incréments et suivies en production.",
    items: ["Tests Vitest", "CI/CD", "Docker · Azure"],
  },
];

export interface Step {
  title: string;
  text: string;
}

export const steps: Step[] = [
  { title: "Cadrer", text: "Objectifs, utilisateurs et contraintes, posés avant la première ligne de code." },
  { title: "Concevoir", text: "Parcours, maquettes et architecture, validés avec les équipes métier." },
  { title: "Développer", text: "Code typé, testé et relu, livré par incréments." },
  { title: "Déployer", text: "Mise en production, suivi de l'usage réel, puis itérations." },
];
