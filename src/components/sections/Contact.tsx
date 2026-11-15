import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "@/src/components/ui/Reveal";
import SocialLink from "@/src/components/ui/SocialLink";
import { profile, socials } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import ContactForm from "./ContactForm";

export default function Contact() {
  const time = useLocalTime(profile.timeZone);

  const channels = [
    { label: "Téléphone", value: profile.phone, href: profile.phoneHref },
    { label: "Localisation", value: profile.location },
    { label: "Heure locale", value: `${time} · UTC+2` },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {profile.availability}
          </span>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">
            {profile.role} chez {profile.company}, je garde du temps pour quelques collaborations ciblées.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <p className="eyebrow">Email</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline break-all pb-1 text-[clamp(1.3rem,2.2vw,1.75rem)] font-semibold tracking-[-0.03em] text-fg"
            >
              {profile.email}
            </a>
            <CopyButton value={profile.email} />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="mt-10 border-t border-line">
            {channels.map((c) => (
              <div
                key={c.label}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4 text-sm"
              >
                <dt className="eyebrow">{c.label}</dt>
                <dd className="text-right text-fg">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                    >
                      {c.value}
                      <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-2">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <SocialLink
                key={social.label}
                social={social}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-[color,border-color,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
              >
                <Icon className="h-4 w-4" />
              </SocialLink>
            );
          })}
        </Reveal>
      </div>

      <Reveal delay={0.1} className="lg:col-span-7">
        <ContactForm />
      </Reveal>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(
          () => setCopied(true),
          () => undefined,
        );
      }}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
      aria-label={copied ? "Adresse copiée" : "Copier l'adresse email"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "ok" : "copy"}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copié" : "Copier"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
