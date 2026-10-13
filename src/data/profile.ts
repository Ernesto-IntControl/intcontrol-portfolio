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
  portrait: {
    /** Fallback et image de partage (og:image). */
    src: "/images/portrait-720.webp",
    width: 896,
    height: 1195,
    avif: "/images/portrait-480.avif 480w, /images/portrait-720.avif 720w, /images/portrait-960.avif 960w",
    webp: "/images/portrait-480.webp 480w, /images/portrait-720.webp 720w, /images/portrait-960.webp 960w",
    /** Aperçu flou de 24×32 px affiché pendant le chargement (connexion lente). */
    placeholder: "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAABwBQCdASoYACAAPslUnkunpSKhsAwA8BkJZwC/83qYtALWNmPdhgM9rjxypAenC6QYolEAAPyZ/KDT0g9MqhbVLD1R/+RUuY+R6zFM3lIqOm9WNgxWKSUsQQJ7qs1z6PDlWMi36vj4R5AIlR/T5WROr2tvhq+tEhycfY04iJPkClmZMWDnGCorVKcv2cLl6IAAAA==",
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
