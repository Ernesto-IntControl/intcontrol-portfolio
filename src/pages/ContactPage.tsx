import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/src/components/sections/ContactForm";
import Seo from "@/src/components/Seo";
import PageHeader from "@/src/components/ui/PageHeader";
import SocialLink from "@/src/components/ui/SocialLink";
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
    <>
      <Seo path="/contact" />
      <PageHeader label="contact" title="Parlons de votre projet." intro="Décrivez votre besoin en quelques lignes, je vous réponds rapidement." />

      <div className="wrap grid items-start gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="min-w-0 space-y-3">
          <ul className="card divide-y divide-line">
            {channels.map(({ label, value, href, icon: Icon }) => {
              const body = (
                <>
                  <Icon className="h-4 w-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="label block">{label}</span>
                    <span className="block truncate text-[14px]">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-wrap gap-1.5">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <SocialLink social={s} className="btn !h-8 !px-2.5">
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </SocialLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="min-w-0">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
