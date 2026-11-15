import { ArrowLeft, Home } from "lucide-react";
import Seo from "@/src/components/Seo";
import Scramble from "@/src/components/ui/Scramble";

export default function NotFoundPage() {
  return (
    <section className="container-x flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-32 text-center">
      <Seo title="404 — Page introuvable | INTCONTROL" description="Cette page n'existe pas ou plus." noindex />
      <p className="font-mono text-[clamp(5rem,18vw,11rem)] font-medium leading-none tracking-[-0.08em] text-fg/15">
        <Scramble trigger="mount" text="404" />
      </p>
      <h1 className="mt-6 text-3xl font-semibold sm:text-5xl">
        Page <span className="serif-accent text-accent">égarée.</span>
      </h1>
      <p className="mt-5 max-w-md text-muted">Cette page n'existe pas ou a été déplacée. Revenons sur le bon chemin.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="/" className="btn-primary">
          <Home className="h-4 w-4" /> Retour à l'accueil
        </a>
        <button type="button" onClick={() => window.history.back()} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Page précédente
        </button>
      </div>
    </section>
  );
}
