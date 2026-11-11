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
  company: "Josar Technologie",
  headline: "Développeur fullstack JavaScript & .NET",
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
];
