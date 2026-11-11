import { Depth } from "@/src/components/ui/TiltCard";
import type { Project } from "@/src/data/projects";
import BisoMarketMockup from "./BisoMarketMockup";
import { FloatChip, Phone } from "./Devices";

/** Contenu de la scène 3D : capture réelle dans un téléphone, ou maquette illustrative. */
export default function ProjectMockup({ project }: { project: Project }) {
  const { visual } = project;
  if (visual.kind !== "phone") return <BisoMarketMockup accent={project.accent} />;

  const { screen } = visual;
  return (
    <div className="preserve-3d relative h-[560px] w-[440px]">
      <div className="preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Phone light>
          {/* La capture démarre sous la barre d'état, sur la couleur d'en-tête de l'app */}
          <div className="absolute inset-0 bg-white" style={{ borderTop: `34px solid ${visual.screenBackground}` }}>
            <picture>
              <source type="image/avif" srcSet={screen.avif} />
              <img
                src={screen.src}
                alt={visual.alt}
                width={screen.width}
                height={screen.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
                style={{ backgroundImage: `url(${screen.placeholder})`, backgroundSize: "cover" }}
              />
            </picture>
          </div>
        </Phone>
      </div>
      {project.links.demo && (
        <Depth z={90} className="absolute bottom-[92px] right-0">
          <FloatChip>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
            <span className="font-mono text-[11px]">{new URL(project.links.demo).hostname}</span>
          </FloatChip>
        </Depth>
      )}
    </div>
  );
}
