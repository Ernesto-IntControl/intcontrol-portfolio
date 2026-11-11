import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/src/components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="404 — Page introuvable | INTCONTROL" description="Cette page n'existe pas ou plus." noindex />
      <section className="wrap py-20 sm:py-28">
        <div className="card overflow-hidden font-mono text-[13px]">
          <div className="border-b border-line bg-surface-2 px-3 py-2 text-[11px] text-subtle">~/intcontrol</div>
          <div className="space-y-1 p-4">
            <p>
              <span className="text-accent">$</span> cat {typeof window === "undefined" ? "page" : window.location.pathname}
            </p>
            <p className="text-red-500">cat : fichier introuvable (404)</p>
            <p className="text-muted">La page a peut-être déménagé, ou n'a jamais existé.</p>
            <p>
              <span className="text-accent">$</span> <span className="caret" />
            </p>
          </div>
        </div>
        <Link to="/" className="btn mt-5">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à l'accueil
        </Link>
      </section>
    </>
  );
}
