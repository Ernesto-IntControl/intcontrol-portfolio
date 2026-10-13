import type { IconType } from "react-icons";
import {
  SiDocker,
  SiDotnet,
  SiExpo,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbBrandAzure } from "react-icons/tb";

/** Icônes de la stack actuelle (les icônes non utilisées alourdiraient le bundle). */
export const techIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Node.js": SiNodedotjs,
  NestJS: SiNestjs,
  "Tailwind CSS": SiTailwindcss,
  Expo: SiExpo,
  "React Native": SiReact,
  "C#": SiSharp,
  ".NET": SiDotnet,
  "API REST": TbApi,
  Git: SiGit,
  Docker: SiDocker,
  Azure: TbBrandAzure,
  "CI/CD": SiGithubactions,
};
