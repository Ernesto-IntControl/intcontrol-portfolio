/**
 * Les deux casquettes : Product Owner et ingénieur logiciel.
 * Le côté produit s'écrit en serif italique, le côté code en mono, partout sur le site.
 */
export type Side = "produit" | "code";

export interface Hat {
  side: Side;
  label: string;
  role: string;
  summary: string;
  items: string[];
}

export const hats: Hat[] = [
  {
    side: "produit",
    label: "Côté produit",
    role: "Product Owner",
    summary: "Je décide quoi construire, pour qui, et dans quel ordre.",
    items: ["Vision & roadmap produit", "User stories & backlog", "Prototypes Figma", "Priorisation", "Coordination métier / tech"],
  },
  {
    side: "code",
    label: "Côté code",
    role: "Lead Software Engineer",
    summary: "Je le construis, et je m'assure que ça tient en production.",
    items: [
      "Architecture & qualité du code",
      "Web : Next.js, React, NestJS, Node.js",
      "Mobile : Expo, React Native, Flutter",
      ".NET quand le projet l'exige",
      "Accompagnement de l'équipe",
    ],
  },
];

export interface Step {
  side: Side;
  title: string;
  text: string;
}

export const steps: Step[] = [
  { side: "produit", title: "Comprendre", text: "Quel problème résout-on, et pour qui ? Tout part de cette question." },
  { side: "produit", title: "Prioriser", text: "Écouter, trancher, oser dire non. Un backlog raconte une histoire, pas une liste de souhaits." },
  { side: "code", title: "Construire", text: "Une architecture claire, du code lisible et testé, des interfaces ultra-fluides." },
  { side: "code", title: "Livrer", text: "Mettre en production, observer l'usage réel, puis recommencer." },
];
