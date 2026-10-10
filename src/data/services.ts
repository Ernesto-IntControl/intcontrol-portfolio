import type { LucideIcon } from "lucide-react";
import { Compass, Database, Layers, ServerCog } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Développement web fullstack",
    description: "Applications web modernes, réactives et performantes avec Next.js, React et Tailwind CSS.",
    features: ["Interfaces SPA / SSR", "Optimisation SEO", "Design responsive", "Intégration d'API"],
    icon: Layers,
  },
  {
    title: "Solutions backend .NET",
    description: "Architectures backend robustes et sécurisées en C# et .NET pour vos besoins métiers.",
    features: ["API RESTful", "Microservices", "Authentification JWT", "Logique métier complexe"],
    icon: ServerCog,
  },
  {
    title: "Bases de données",
    description: "Modélisation et optimisation de bases relationnelles et non relationnelles.",
    features: ["SQL Server", "PostgreSQL", "MySQL", "Optimisation de requêtes"],
    icon: Database,
  },
  {
    title: "Produit & lead technique",
    description: "Du cadrage à la mise en production : vision produit, priorisation et pilotage d'équipe.",
    features: ["Product ownership", "Architecture & revues de code", "Priorisation du backlog", "Accompagnement d'équipe"],
    icon: Compass,
  },
];
