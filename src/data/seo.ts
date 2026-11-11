import { profile } from "./profile";

export const SITE_URL = "https://intcontrol-portfolio.vercel.app";

export interface PageMeta {
  title: string;
  description: string;
}

/**
 * Titre et description de chaque page : lus par <Seo> dans le navigateur
 * et par le prérendu au build (scripts/prerender.mjs), pour qu'ils ne divergent jamais.
 */
export const pageMeta = {
  "/": {
    title: `${profile.name} — ${profile.alias} | ${profile.role}`,
    description: `${profile.name} (${profile.alias}), ${profile.role} chez ${profile.company}. Développement web et mobile : Next.js, NestJS, Node.js, Expo et .NET.`,
  },
  "/projets": {
    title: `Projets | ${profile.name} — ${profile.alias}`,
    description: `Madebocar, Josar Management, BisoChat, BisoMarket : les produits sur lesquels travaille ${profile.name} (${profile.alias}).`,
  },
  "/services": {
    title: `Services | ${profile.name} — ${profile.alias}`,
    description:
      "Web fullstack JavaScript (Next.js, NestJS, Node.js), applications mobiles Expo, backends .NET et Product Owner : des solutions sur mesure pour vos projets.",
  },
  "/a-propos": {
    title: `À propos | ${profile.name} — ${profile.alias}`,
    description: `Le parcours d'${profile.name} (${profile.alias}), ${profile.role} chez ${profile.company} et Product Owner, développeur web et mobile à Kolwezi.`,
  },
  "/contact": {
    title: `Contact | ${profile.name} — ${profile.alias}`,
    description: `Contactez ${profile.name} (${profile.alias}) pour vos projets de développement web et logiciel.`,
  },
} satisfies Record<string, PageMeta>;

export type PagePath = keyof typeof pageMeta;
