import type { LucideIcon } from "lucide-react";
import { Compass, Layers, ServerCog, Smartphone } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

/** Le web moderne en tête, .NET en second, puis le mobile et le rôle de Product Owner. */
export const services: Service[] = [
  {
    title: "Web fullstack JavaScript",
    description: "Applications web modernes de bout en bout : interfaces Next.js et React, APIs Node.js et NestJS.",
    features: ["Next.js · React", "NestJS · Node.js", "GraphQL & API REST", "Prisma · Drizzle", "Tests Vitest"],
    icon: Layers,
  },
  {
    title: "Backends .NET",
    description: "Architectures C# et .NET robustes et sécurisées, quand le projet l'exige.",
    features: ["API RESTful", "Microservices", "Authentification JWT", "Logique métier complexe"],
    icon: ServerCog,
  },
  {
    title: "Applications mobiles",
    description: "Apps iOS et Android avec Expo, React Native, Capacitor / Ionic ou Flutter, selon le projet.",
    features: ["Expo · React Native", "Capacitor · Ionic", "Flutter · Dart", "iOS & Android"],
    icon: Smartphone,
  },
  {
    title: "Product Owner",
    description: "Je porte la vision produit, du cadrage au lancement, en faisant le lien entre le métier, le design et l'équipe technique.",
    features: ["Vision & roadmap produit", "User stories & backlog", "Prototypes Figma", "Priorisation", "Coordination métier / tech"],
    icon: Compass,
  },
];
