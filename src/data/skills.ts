export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

/** Ordre volontaire : le web moderne en premier, .NET en second, puis le mobile et le pilotage produit. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Web moderne",
    description: "JavaScript de bout en bout, de l'interface à l'API.",
    items: ["JavaScript", "TypeScript", "Next.js", "React", "Node.js", "NestJS", "GraphQL", "Prisma", "Drizzle", "Tailwind CSS"],
  },
  {
    title: ".NET",
    description: "Des backends C# robustes quand le projet l'exige.",
    items: ["C#", ".NET", "Entity Framework Core", "API REST"],
  },
  {
    title: "Mobile",
    description: "Apps iOS et Android, en JavaScript ou en Dart.",
    items: ["Expo", "React Native", "Capacitor", "Ionic", "Flutter", "Dart"],
  },
  {
    title: "Gestion de projet",
    description: "Cadrer, prioriser et suivre la livraison avec l'équipe.",
    items: ["Jira", "Trello", "Notion", "Scrum", "Kanban", "Figma"],
  },
  {
    title: "Qualité & outils",
    description: "Tests, versionnement et livraison continue.",
    items: ["Vitest", "Postman", "Git", "Docker", "Azure", "CI/CD"],
  },
];
