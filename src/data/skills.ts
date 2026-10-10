export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    description: "APIs robustes, logique métier et sécurité.",
    items: ["C#", ".NET", "Entity Framework", "Node.js", "Express", "API REST"],
  },
  {
    title: "Frontend",
    description: "Interfaces rapides, accessibles et fluides.",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Données",
    description: "Modélisation et performance des requêtes.",
    items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "Outils & cloud",
    description: "Livraison continue et environnements fiables.",
    items: ["Git", "Docker", "Azure", "CI/CD"],
  },
];

/** Bandeau défilant : sous-ensemble représentatif de la stack. */
export const marqueeStack = [
  "C#",
  ".NET",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "SQL Server",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Azure",
  "Git",
];
