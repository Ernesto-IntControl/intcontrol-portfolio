import { motion, useScroll, useTransform } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Magnetic from "@/src/components/ui/Magnetic";
import RevealText from "@/src/components/ui/RevealText";
import Reveal from "@/src/components/ui/Reveal";
import { profile } from "@/src/data/profile";

export default function ContactCTA({ index = "04" }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section ref={ref} className="relative py-16 sm:py-24">
      <div className="container-x">
        <div className="panel relative overflow-hidden rounded-[32px] px-6 py-20 text-center sm:rounded-[44px] sm:px-16 sm:py-28">
          <div className="absolute inset-0 bg-grid opacity-50 mask-radial" aria-hidden />
          <motion.div
            aria-hidden
            style={{ y: orbY }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_26%,transparent),transparent)]"
          />

          <div className="relative">
            <p className="eyebrow mb-6">
              <span className="text-accent">({index})</span> — Contact
            </p>
            <RevealText
              as="h2"
              className="mx-auto max-w-6xl text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
              text={[{ text: "Un projet en tête ? \n " }, { text: "Parlons-en.", className: "serif-accent text-accent" }]}
            />
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-md text-muted">
                {profile.availability} : je sélectionne les collaborations sur lesquelles je peux vraiment apporter de la valeur.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              <Magnetic strength={0.4}>
                <motion.div style={{ rotate }}>
                  <Link
                    to="/contact"
                    data-cursor="Go"
                    className="orb-button group relative flex h-36 w-36 items-center justify-center rounded-full text-sm font-semibold text-accent-fg sm:h-44 sm:w-44"
                  >
                    <span className="relative z-10 transition-transform duration-500 ease-out-expo group-hover:scale-110">
                      Écrivez-moi
                    </span>
                  </Link>
                </motion.div>
              </Magnetic>

              <button
                type="button"
                onClick={copyEmail}
                className="group flex items-center gap-3 rounded-full border border-line-strong bg-bg/50 py-2 pl-5 pr-2 text-sm text-fg backdrop-blur transition-colors hover:bg-fg/5"
              >
                <span className="font-mono">{profile.email}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fg text-bg">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </span>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Adresse copiée" : ""}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
