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
    items: ["JavaScript", "TypeScript", "Next.js", "React", "Node.js", "NestJS", "Tailwind CSS"],
  },
  {
    title: ".NET",
    description: "Des backends C# robustes quand le projet l'exige.",
    items: ["C#", ".NET", "API REST"],
  },
  {
    title: "Mobile",
    description: "Apps iOS et Android avec le même savoir-faire JavaScript.",
    items: ["Expo", "React Native"],
  },
  {
    title: "Outils & cloud",
    description: "Livraison continue et environnements fiables.",
    items: ["Git", "Docker", "Azure", "CI/CD"],
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
  "Expo",
  "Tailwind CSS",
  "C#",
  ".NET",
  "Docker",
  "Git",
];
