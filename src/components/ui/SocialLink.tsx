import type { ReactNode } from "react";
import type { Social } from "@/src/data/profile";
import { cn } from "@/src/lib/utils";

/** Lien vers un réseau ; tant que l'adresse n'est pas connue, l'icône reste visible mais inactive. */
export default function SocialLink({
  social,
  className,
  children,
}: {
  social: Social;
  className?: string;
  children: ReactNode;
}) {
  const label = social.handle ? `${social.label} (${social.handle})` : social.label;

  if (!social.href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${social.label} : lien bientôt disponible`}
        title="Lien bientôt disponible"
        className={cn(className, "cursor-default opacity-40")}
      >
        {children}
      </span>
    );
  }

  return (
    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {children}
    </a>
  );
}
