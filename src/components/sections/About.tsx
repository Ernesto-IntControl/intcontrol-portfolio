import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import Layer from "@/src/components/ui/IllustrationLayer";
import Reveal from "@/src/components/ui/Reveal";
import { experience, profile, stats, type Stat } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

const strong = "font-medium text-fg";

export default function About({ className }: { className?: string }) {
  const time = useLocalTime(profile.timeZone);

  return (
    <div className={cn("grid items-start gap-12 lg:grid-cols-12 lg:gap-14", className)}>
      <Reveal className="lg:sticky lg:top-28 lg:col-span-4">
        <figure className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-surface-strong">
          {/* Décor du hero : forme douce et trame de points derrière le personnage */}
          <span aria-hidden className="hero-blob pointer-events-none absolute left-[4%] top-[14%] h-[72%] w-[92%]" />
          <span
            aria-hidden
            className="pointer-events-none absolute right-[7%] top-[15%] h-[18%] w-[28%] bg-[radial-gradient(var(--dot)_1.4px,transparent_1.6px)] [background-size:14px_14px]"
          />

          {/* Le personnage, coupé à la taille par le bas de la carte ; la couronne se soulève au survol */}
          <div className="absolute inset-x-0 bottom-0 flex h-[91%] justify-center">
            <div className="relative aspect-[540/748] h-full origin-bottom transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.03]">
              <Layer
                name="body-color"
                alt={`Illustration de ${profile.name}, en costume, qui pointe du doigt`}
                className="absolute inset-0 h-full w-full"
              />
              <div className="hero-crown absolute left-[33.7%] top-[0.4%] w-[27.4%] group-hover:-translate-y-[10%]">
                <Layer name="crown-color" className="block h-auto w-full" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/65 via-black/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur">
            Kolwezi · {time}
          </span>
          <figcaption className="absolute bottom-4 left-5 right-5 text-white">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              {profile.alias}
            </span>
            <span className="block text-xl font-semibold tracking-tight">{profile.name}</span>
          </figcaption>
        </figure>
      </Reveal>

      <div className="lg:col-span-7 lg:col-start-6">
        <Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
            <p>
              Je suis <span className={strong}>{profile.name}</span>, plus connu sous le nom d'
              <span className={strong}>{profile.alias}</span>. Je code depuis Kolwezi, en République Démocratique du
              Congo, avec une conviction : des produits de niveau mondial peuvent naître d'ici.
            </p>
            <p>
              Aujourd'hui <span className={strong}>{profile.role}</span> chez{" "}
              <span className="font-medium text-accent">{profile.company}</span>, je pilote la partie technique des
              produits, de l'architecture jusqu'à la qualité du code livré. Mon terrain de jeu : le web moderne en
              JavaScript (<span className={strong}>Next.js</span>, <span className={strong}>NestJS</span>,{" "}
              <span className={strong}>GraphQL</span>), le mobile avec <span className={strong}>Expo</span> ou{" "}
              <span className={strong}>Flutter</span>, et <span className={strong}>.NET</span> quand un projet l'exige.
            </p>
            <p>
              Chaque projet commence au plus près du besoin : le problème à résoudre, les personnes qui utiliseront le
              produit, les priorités. Cadrage, parcours utilisateurs et backlog font partie de mon quotidien, au même
              titre que l'architecture et le code :{" "}
              <span className="serif-accent text-[1.15em] text-fg">des produits pensés avant d'être construits.</span>
            </p>
          </div>
        </Reveal>

        <dl className="mt-12 grid grid-cols-3 border-y border-line">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="border-line py-6 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-6"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <Counter stat={stat} />
                <span className="mt-1 block text-xs text-muted sm:text-sm">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-12">
          <h2 className="eyebrow">Parcours</h2>
          <ol className="mt-4 border-t border-line">
            {experience.map((item, i) => (
              <li key={item.company} className="border-b border-line">
                <Reveal delay={i * 0.08} y={12} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.role} <span className="font-normal text-accent">· {item.company}</span>
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                  <span className="chip h-fit self-start">
                    {item.current && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />}
                    {item.period}
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Message à la nouvelle génération */}
        <Reveal delay={0.1}>
          <figure className="mt-12 border-l-2 border-accent pl-6 sm:pl-8">
            <p className="eyebrow text-accent">À la nouvelle génération</p>
            <blockquote className="mt-4 text-[clamp(1.3rem,2.6vw,1.75rem)] leading-snug tracking-[-0.02em] text-fg">
              Vous n'avez pas besoin d'attendre la permission pour commencer. Un ordinateur, de la curiosité et de la
              constance suffisent pour bâtir des choses qui comptent.{" "}
              <span className="serif-accent text-accent">Le futur du numérique s'écrit aussi depuis chez nous</span>, et
              il a besoin de vous.
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              — {profile.name}, {profile.alias}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}

/** Chiffre qui défile jusqu'à sa valeur à l'entrée dans le viewport (écrit dans le DOM, sans rendu React). */
export function Counter({ stat, className }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const format = (v: number) => `${stat.prefix ?? ""}${Math.round(v)}${stat.suffix ?? ""}`;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span
      ref={ref}
      className={cn("block whitespace-nowrap text-3xl font-semibold tabular-nums tracking-[-0.05em] text-fg sm:text-5xl", className)}
    >
      {format(stat.value)}
    </span>
  );
}
