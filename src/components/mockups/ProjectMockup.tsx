import type { Project } from "@/src/data/projects";
import BisoChatMockup from "./BisoChatMockup";
import BisoMarketMockup from "./BisoMarketMockup";
import MadebocarMockup from "./MadebocarMockup";

export default function ProjectMockup({ project }: { project: Project }) {
  switch (project.mockup) {
    case "madebocar":
      return <MadebocarMockup accent={project.accent} />;
    case "bisomarket":
      return <BisoMarketMockup accent={project.accent} />;
    case "bisochat":
      return <BisoChatMockup accent={project.accent} />;
  }
}
