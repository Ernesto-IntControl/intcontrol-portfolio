import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: IconType;
}

export const profile = {
  name: "Ernest Katumbi",
  alias: "INTCONTROL",
  role: "Lead Software Engineer",
  company: "Josar Technologie",
  headline: "Développeur fullstack C# .NET & Next.js",
  location: "Kolwezi, Lualaba, RDC",
  timeZone: "Africa/Lubumbashi",
  availability: "Disponibilité limitée",
  availabilityDetail: "Collaborations ciblées uniquement",
  email: "katumbuernest@gmail.com",
  phone: "+243 843 351 254",
  phoneHref: "tel:+243843351254",
  portrait: "/images/intcontrol.png",
  venture: {
    name: "INT GLOBAL SERVICES",
    role: "Fondateur & CEO",
    url: "https://intglobalservice.com",
  },
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    handle: "ernest-katumbu",
    href: "https://www.linkedin.com/in/ernest-katumbu-b87aa7265",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    handle: "Ernesto-IntControl",
    href: "https://github.com/Ernesto-IntControl",
    icon: FaGithub,
  },
  {
    label: "X",
    handle: "@Intcontrol1",
    href: "https://twitter.com/Intcontrol1",
    icon: FaXTwitter,
  },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 2, prefix: "+", suffix: " ans", label: "d'expérience" },
  { value: 20, prefix: "+", label: "projets livrés" },
  { value: 10, prefix: "+", label: "clients accompagnés" },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  description: string;
  url?: string;
}

export const experience: Experience[] = [
  {
    company: "Josar Technologie",
    role: "Lead Software Engineer",
    period: "Actuellement",
    current: true,
    description:
      "Responsable de l'ingénierie logicielle : architecture, qualité du code et accompagnement de l'équipe sur les produits de l'entreprise.",
  },
  {
    company: "INT GLOBAL SERVICES",
    role: "Fondateur & CEO",
    period: "Fondateur",
    description:
      "Agence de services digitaux : sites, applications et solutions sur mesure pour des entreprises locales et internationales.",
    url: "https://intglobalservice.com",
  },
];
