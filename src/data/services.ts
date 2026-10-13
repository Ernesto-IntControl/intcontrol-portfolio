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
    features: ["Next.js · React", "NestJS · Node.js", "SSR & SEO", "Design responsive"],
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
    description: "Apps iOS et Android avec Expo et React Native, dans la continuité du web.",
    features: ["Expo", "React Native", "iOS & Android", "Expérience native fluide"],
    icon: Smartphone,
  },
  {
    title: "Product Owner",
    description: "Je porte la vision produit, du cadrage au lancement, en faisant le lien entre le métier, le design et l'équipe technique.",
    features: ["Vision & roadmap produit", "User stories & backlog", "Priorisation", "Coordination métier / tech"],
    icon: Compass,
  },
];
