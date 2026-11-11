import { pageMeta, SITE_URL, type PagePath } from "@/src/data/seo";

type SeoProps = { path: PagePath } | { title: string; description: string; noindex: true };

/**
 * React 19 hisse les balises title/meta/link rendues n'importe où dans l'arbre
 * vers le <head> : un composant par page suffit, pas de librairie dédiée.
 *
 * Les balises og:* et twitter:* ne sont pas gérées ici : les robots de partage
 * (Facebook, LinkedIn, WhatsApp...) n'exécutent pas le JS. Elles sont écrites
 * dans le HTML de chaque page par le prérendu, au build.
 */
export default function Seo(props: SeoProps) {
  if ("noindex" in props) {
    return (
      <>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="robots" content="noindex" />
      </>
    );
  }

  const { title, description } = pageMeta[props.path];
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}${props.path === "/" ? "/" : props.path}`} />
    </>
  );
}
