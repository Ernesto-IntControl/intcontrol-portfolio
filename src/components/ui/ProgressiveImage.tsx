import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  avif?: string;
  webp?: string;
  sizes: string;
  /** Petite image (data URI) affichée floue tant que la vraie n'est pas chargée. */
  placeholder?: string;
  className?: string;
}

/**
 * Image responsive (AVIF puis WebP) avec aperçu flou : sur une connexion lente,
 * on voit tout de suite une silhouette, puis l'image nette apparaît en fondu.
 */
export default function ProgressiveImage({
  src,
  alt,
  width,
  height,
  avif,
  webp,
  sizes,
  placeholder,
  className,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={placeholder ? { backgroundImage: `url(${placeholder})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <picture>
        {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
        {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          // Si l'image est déjà en cache, onLoad peut partir avant l'hydratation : on vérifie aussi `complete`
          ref={(img) => {
            if (img?.complete && img.naturalWidth > 0) setLoaded(true);
          }}
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </picture>
    </div>
  );
}
