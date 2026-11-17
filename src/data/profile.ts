import type { IconType } from "react-icons";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export interface Social {
  label: string;
  handle: string;
  /** Sans lien, l'icône s'affiche atténuée et non cliquable. */
  href?: string;
  icon: IconType;
}

export const profile = {
  name: "Ernest Katumbi",
  alias: "INTCONTROL",
  role: "Lead Software Engineer",
  company: "Josart Technology",
  companyUrl: "https://groupjosar.com/",
  headline: "Développeur fullstack & Lead Software Engineer",
  location: "Kolwezi, Lualaba, RDC",
  timeZone: "Africa/Lubumbashi",
  availability: "Disponibilité limitée",
  availabilityDetail: "Collaborations ciblées uniquement",
  email: "katumbuernest@gmail.com",
  phone: "+243 843 351 254",
  phoneHref: "tel:+243843351254",
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
  {
    label: "Facebook",
    handle: "",
    href: "https://www.facebook.com/profile.php?id=61586551582374",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    handle: "@int_control",
    href: "https://www.instagram.com/int_control/",
    icon: FaInstagram,
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
  { value: 15, prefix: "+", label: "projets livrés" },
  { value: 10, prefix: "+", label: "clients satisfaits" },
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
    company: "Josart Technology",
    url: "https://groupjosar.com/",
    role: "Lead Software Engineer",
    period: "Actuellement",
    current: true,
    description:
      "Responsable de l'ingénierie logicielle : architecture, qualité du code et accompagnement de l'équipe sur les produits de l'entreprise.",
  },
  {
    company: "Madebocar",
    role: "Pilotage produit · Développeur front-end",
    period: "Actuellement",
    current: true,
    description:
      "Cadrage, priorisation et parcours utilisateurs d'une application VTC, et développement de son front-end.",
  },
];

export interface Education {
  school: string;
  url: string;
  degree: string;
  level: string;
  period: string;
  current?: boolean;
  description: string;
}

export const education: Education[] = [
  {
    school: "Université Jean XXIII de Kolwezi",
    url: "https://ujkol-ofm.org/",
    degree: "Licence en Génie logiciel",
    level: "L4 · Bac+4",
    period: "En cours",
    current: true,
    description:
      "Des études menées en parallèle de mon poste : la théorie nourrit ce que je pratique chaque jour en entreprise, et la pratique donne du sens aux cours.",
  },
];
