import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

/** Lien vers un site externe (entreprise, université…), ouvert dans un nouvel onglet. */
export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link-underline pb-0.5 transition-colors hover:text-accent", className)}
    >
      {children}
    </a>
  );
}
