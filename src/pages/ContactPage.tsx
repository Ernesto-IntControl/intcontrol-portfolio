import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import PageTransition from "@/src/components/layout/PageTransition";
import ContactForm from "@/src/components/sections/ContactForm";
import Reveal from "@/src/components/ui/Reveal";
import SectionHeading from "@/src/components/ui/SectionHeading";
import SocialLink from "@/src/components/ui/SocialLink";
import TiltCard, { Depth } from "@/src/components/ui/TiltCard";
import { profile, socials } from "@/src/data/profile";
import { useLocalTime } from "@/src/hooks/useLocalTime";

export default function ContactPage() {
  const time = useLocalTime(profile.timeZone);

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: "Téléphone", value: profile.phone, href: profile.phoneHref, icon: Phone },
    { label: "Localisation", value: profile.location, icon: MapPin },
    { label: "Heure locale", value: `${time} · UTC+2`, icon: Clock3 },
  ];

  return (
    <PageTransition>
      {/* React 19 place <title> et <meta> dans le <head> */}
      <title>Contact | Ernest Katumbi — INTCONTROL</title>
      <meta name="description" content={`Contactez ${profile.name} (${profile.alias}) pour vos projets de développement web et logiciel.`} />

      <section className="container-x pb-24 pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="04"
          label="Contact"
          title={[{ text: "Parlons de " }, { text: "votre projet.", className: "serif-accent text-accent" }]}
          intro="Décrivez-moi votre besoin en quelques lignes, je vous réponds rapidement."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal>
              <TiltCard className="rounded-[28px]" max={6}>
                <div className="p-7">
                  <Depth z={30}>
                    <span className="chip">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {profile.availability}
                    </span>
                    <p className="mt-4 text-lg font-medium leading-snug text-fg">
                      {profile.role} chez {profile.company}, je garde du temps pour quelques collaborations ciblées.
                    </p>
                  </Depth>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="panel divide-y divide-line overflow-hidden rounded-[28px]">
                {channels.map(({ label, value, href, icon: Icon }) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg/50 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block">{label}</span>
                        <span className="block truncate text-[15px] text-fg">{value}</span>
                      </span>
                      {href && (
                        <ArrowUpRight className="h-4 w-4 text-subtle transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                      )}
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-fg/[0.03]">
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-5 py-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <SocialLink
                      key={social.label}
                      social={social}
                      className="panel flex min-h-12 items-center justify-center gap-2 rounded-2xl py-4 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </SocialLink>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
