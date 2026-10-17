const SITE_URL = "https://intcontrol-portfolio.vercel.app";

interface SeoProps {
  title: string;
  description: string;
  /** Chemin de la page, ex. "/projets". Vide pour l'accueil. */
  path?: string;
  noindex?: boolean;
}

/**
 * React 19 hisse les balises title/meta/link rendues n'importe où dans l'arbre
 * vers le <head> : un composant par page suffit, pas de librairie dédiée.
 *
 * Les balises og:* et twitter:* restent statiques dans index.html : ce site
 * est une SPA sans rendu serveur, donc les robots qui ne lisent pas le DOM
 * après exécution du JS (Facebook, LinkedIn, Slack...) ne verront jamais ce
 * que React injecte ici. Seuls title/description/canonical, lus par
 * Googlebot après exécution du JS, ont un intérêt à varier par page.
 */
export default function Seo({ title, description, path = "", noindex }: SeoProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
    </>
  );
}

