export type ProjectStatus = "Completed" | "In Progress";

export interface Project {
  title: string;
  badge: string;
  status: ProjectStatus;
  stack: string[];
  description: string;
  image: string;
  github: string;
  demo: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "Helzor Business",
    badge: "Site Vitrine",
    status: "Completed",
    stack: ["Next.js", "Tailwind"],
    description: "Interface ultra-rapide et optimisée pour la conversion client. Design minimaliste et performances SEO.",
    image: "/images/helzor.png",
    github: "https://github.com/intglobal-services/helzor-business",
    demo: "https://www.helzorbusiness.com",
    featured: true,
  },
  {
    title: "IntFlow",
    badge: "Fintech / Académique",
    status: "In Progress",
    stack: [".NET Core", "React", "MySQL"],
    description: "Architecture robuste pour la gestion et suivi des paiements des frais academiques.",
    image: "/images/intflow.png",
    github: "https://github.com/intglobal-services/intflow",
    demo: "https://www.intflow.com",
    featured: true,
  },
  {
    title: "Intglobal Services",
    badge: "Corporate",
    status: "Completed",
    stack: ["Next.js", "Vite", "Tailwind"],
    description: "Plateforme officielle de notre agence de services digitaux. Vitrine de nos réalisations et services.",
    image: "/images/intglobal.png",
    github: "https://github.com/intglobal-services/intglobal-services",
    demo: "https://www.intglobalservices.com",
    featured: true,
  },
  {
    title: "Muna Learn",
    badge: "Education",
    status: "In Progress",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    description: "Plateforme d'apprentissage en ligne pour etudiant en informatique.",
    image: "/images/munalean.png",
    github: "https://github.com/Ernesto-IntControl/muna-learn",
    demo: "#",
    featured: false,
  },
  {
    title: "Tracify",
    badge: "Productivity",
    status: "In Progress",
    stack: ["React", "Firebase", "Tailwind"],
    description: "Plateforme de gestion Administrative et financiere pour PME.",
    image: "/images/tracify.png",
    github: "https://github.com/Ernesto-IntControl/tracify",
    demo: "#",
    featured: false,
  },
];
