export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

/** Ordre volontaire : le web moderne en premier, .NET en second. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Web moderne",
    description: "JavaScript de bout en bout, de l'interface à l'API.",
    items: ["JavaScript", "TypeScript", "Next.js", "React", "Node.js", "NestJS", "GraphQL", "Prisma", "Drizzle", "Tailwind CSS"],
  },
  {
    title: ".NET",
    description: "Des backends C# robustes quand le projet l'exige.",
    items: ["C#", ".NET", "API REST"],
  },
  {
    title: "Mobile",
    description: "Apps iOS et Android, en JavaScript ou en Dart.",
    items: ["Expo", "React Native", "Capacitor", "Ionic", "Flutter", "Dart"],
  },
  {
    title: "Qualité & outils",
    description: "Tests, design et livraison continue.",
    items: ["Vitest", "Postman", "Figma", "Git", "Docker", "Azure", "CI/CD"],
  },
];

/** Bandeau défilant : sous-ensemble représentatif de la stack. */
export const marqueeStack = [
  "JavaScript",
  "TypeScript",
  "Next.js",
  "NestJS",
  "Node.js",
  "React",
  "GraphQL",
  "Prisma",
  "Expo",
  "Flutter",
  "Ionic",
  "Figma",
  "C#",
  ".NET",
];
