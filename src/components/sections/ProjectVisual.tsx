import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import ProgressiveImage from "@/src/components/ui/ProgressiveImage";
import type { ImageSet, Project } from "@/src/data/projects";
import { cn } from "@/src/lib/utils";
import MockupStage from "./MockupStage";

/**
 * Visuel d'un projet dans une carte : recadrage de la planche réelle (avec un léger
 * dézoom lié au scroll), ou scène 3D pour une capture en téléphone / une maquette.
 */
export default function ProjectVisual({
  project,
  progress,
  scrollRotate,
  className,
  sizes = "(min-width: 1024px) 45vw, 92vw",
  natural = false,
}: {
  project: Project;
  /** Progression d'entrée de la carte (0 → 1), quand le parent la connaît déjà. */
  progress?: MotionValue<number>;
  scrollRotate?: MotionValue<number>;
  className?: string;
  sizes?: string;
  /** La hauteur suit les proportions de l'image (carte en colonne) au lieu de remplir le parent. */
  natural?: boolean;
}) {
  const { visual } = project;
  if (visual.kind !== "board") {
    return <MockupStage project={project} scrollRotate={scrollRotate} className={className} />;
  }
  return (
    <div className={cn("p-2 sm:p-3", className)}>
      <ZoomImage
        image={visual.cover}
        alt={visual.alt}
        background={visual.background}
        progress={progress}
        sizes={sizes}
        aspect={natural ? visual.cover.width / visual.cover.height : undefined}
        className={cn("w-full rounded-[20px] sm:rounded-[26px]", !natural && "h-full")}
        imgClassName={visual.coverFocus}
      />
    </div>
  );
}

/** Image qui se pose en douceur : légèrement agrandie à l'entrée, à sa taille une fois en place. */
export function ZoomImage({
  image,
  alt,
  background,
  progress,
  sizes,
  className,
  imgClassName,
  aspect,
}: {
  image: ImageSet;
  alt: string;
  background: string;
  progress?: MotionValue<number>;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Rapport largeur / hauteur imposé au cadre. */
  aspect?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(progress ?? scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <div ref={ref} className={cn("group/visual relative overflow-hidden", className)} style={{ background, aspectRatio: aspect }}>
      <motion.div style={{ scale }} className="h-full w-full">
        <ProgressiveImage
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          avif={image.avif}
          webp={image.webp}
          sizes={sizes}
          placeholder={image.placeholder}
          className="h-full w-full transition-transform duration-[1400ms] ease-out-expo group-hover/visual:scale-[1.035]"
          imgClassName={imgClassName}
        />
      </motion.div>
    </div>
  );
}
