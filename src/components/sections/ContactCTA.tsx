import { ArrowRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "@/src/data/profile";

/** Invitation à écrire, avec un bouton « copier l'email » pour les gens pressés. */
export default function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="wrap pt-14 sm:pt-16">
      <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-lg font-semibold">Un projet en tête ?</h2>
          <p className="mt-1 text-[13.5px] text-muted">Parlons-en. Je réponds en général sous 24 h.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={copy} className="btn font-mono text-[12px]">
            {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "copié !" : profile.email}
          </button>
          <Link to="/contact" className="btn-solid">
            Écrire <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
