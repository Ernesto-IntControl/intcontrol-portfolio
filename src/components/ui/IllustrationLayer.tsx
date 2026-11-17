/**
 * Un calque de l'illustration (AVIF puis WebP), partagé par le hero et la page À propos.
 * Sans `alt`, le calque est décoratif.
 */
export default function IllustrationLayer({
  name,
  alt = "",
  className,
}: {
  name: "body-color" | "body-sketch" | "crown-color" | "crown-sketch";
  alt?: string;
  className?: string;
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/images/hero/${name}.avif`} />
      <img src={`/images/hero/${name}.webp`} alt={alt} decoding="async" draggable={false} className={className} />
    </picture>
  );
}
