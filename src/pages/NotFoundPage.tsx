import { ArrowLeft, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageTransition from "@/src/components/layout/PageTransition";
import Magnetic from "@/src/components/ui/Magnetic";
import TiltCard, { Depth } from "@/src/components/ui/TiltCard";

export default function NotFoundPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>404 — Page introuvable | INTCONTROL</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="container-x flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-32 text-center">
        <TiltCard className="w-full max-w-xl rounded-[40px]" max={14}>
          <div className="relative px-6 py-14 sm:py-20">
            <div className="absolute inset-0 rounded-[inherit] bg-grid opacity-50 mask-radial" aria-hidden />
            <Depth z={20}>
              <p className="text-outline text-[9rem] font-semibold leading-none tracking-[-0.08em] sm:text-[13rem]" aria-hidden>
                404
              </p>
            </Depth>
            <Depth z={80} className="-mt-12 sm:-mt-20">
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Page <span className="serif-accent text-accent">égarée.</span>
              </h1>
            </Depth>
          </div>
        </TiltCard>
        <p className="mt-10 max-w-md text-muted">
          Cette page n'existe pas ou a été déplacée. Revenons sur le bon chemin.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" /> Retour à l'accueil
            </Link>
          </Magnetic>
          <button type="button" onClick={() => window.history.back()} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Page précédente
          </button>
        </div>
      </section>
    </PageTransition>
  );
}
