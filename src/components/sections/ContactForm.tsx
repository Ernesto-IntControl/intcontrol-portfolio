import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { profile } from "@/src/data/profile";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

type Field = "name" | "email" | "subject" | "message";
type FormState = Record<Field, string>;

const empty: FormState = { name: "", email: "", subject: "", message: "" };

const fields: { name: Field; label: string; placeholder: string; type?: string; multiline?: boolean; half?: boolean }[] = [
  { name: "name", label: "Nom complet", placeholder: "Votre nom", half: true },
  { name: "email", label: "Email", placeholder: "vous@entreprise.com", type: "email", half: true },
  { name: "subject", label: "Sujet", placeholder: "Demande de devis, collaboration…" },
  { name: "message", label: "Message", placeholder: "Le problème à résoudre, pour qui, et pour quand", multiline: true },
];

/**
 * Variables envoyées au modèle EmailJS. Le modèle « Contact Us » par défaut lit
 * `name` (nom de l'expéditeur affiché dans Gmail), `email` (adresse de réponse),
 * `title` (objet), `message` et `time`, une ligne grise sous le nom : on y met
 * l'adresse du visiteur et la date, pour voir d'un coup d'œil qui a écrit.
 * Les anciens noms (`from_name`…) restent envoyés pour un modèle personnalisé.
 */
function templateParams(data: FormState) {
  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const date = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: profile.timeZone,
  }).format(new Date());

  return {
    name,
    email,
    title: subject,
    message: data.message.trim(),
    time: `${email} · ${date} (heure de Kolwezi)`,
    from_name: name,
    from_email: email,
    reply_to: email,
    subject,
    to_name: profile.name,
  };
}

/** Raison d'un échec d'envoi, telle que renvoyée par EmailJS (code HTTP et message), pour pouvoir la diagnostiquer. */
function describeError(error: unknown) {
  const unreachable = "EmailJS injoignable (connexion, pare-feu ou bloqueur de publicité)";
  if (error instanceof EmailJSResponseStatus) return error.status ? `${error.status} · ${error.text}` : unreachable;
  // fetch() rejette avec une TypeError quand la requête n'a pas pu partir
  if (error instanceof TypeError) return unreachable;
  if (error instanceof Error) return error.message;
  return String(error);
}

function validate(data: FormState) {
  const errors: Partial<Record<Field, string>> = {};
  if (!data.name.trim()) errors.name = "Le nom est requis";
  if (!data.email.trim()) errors.email = "L'email est requis";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Format d'email invalide";
  if (!data.subject.trim()) errors.subject = "Le sujet est requis";
  if (!data.message.trim()) errors.message = "Le message est requis";
  return errors;
}

export default function ContactForm() {
  const [data, setData] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setData((d) => ({ ...d, [name]: e.target.value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_placeholder",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_placeholder",
        templateParams(data),
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key_placeholder",
      );
      setData(empty);
      setStatus("success");
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      setErrorDetail(describeError(error));
      setStatus("error");
    }
  };

  return (
    <div className="panel relative overflow-hidden rounded-[28px] p-6 sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <svg viewBox="0 0 52 52" className="h-16 w-16 text-accent" aria-hidden>
              <motion.path
                d="M26 3 46 14.5v23L26 49 6 37.5v-23Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
              <motion.path
                d="M17 27l6 6 12-13"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_EXPO }}
              />
            </svg>
            <h3 className="mt-6 text-2xl font-semibold">Message envoyé</h3>
            <p className="mt-2 max-w-sm text-muted">Merci ! Je reviens vers vous très prochainement.</p>
            <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-8">
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-x-6 gap-y-7 sm:grid-cols-2"
          >
            {fields.map((field) => {
              const error = errors[field.name];
              const id = `contact-${field.name}`;
              // Champ minimaliste : un simple filet qui passe à l'accent au focus
              const inputClass = cn(
                "w-full border-0 border-b bg-transparent px-0 py-2.5 text-base text-fg placeholder:text-subtle transition-colors duration-300 focus:outline-none focus-visible:outline-none",
                error ? "border-red-400/70" : "border-line-strong focus:border-accent",
              );
              return (
                <div key={field.name} className={cn("space-y-1.5", !field.half && "sm:col-span-2")}>
                  <label htmlFor={id} className="eyebrow block">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      id={id}
                      name={field.name}
                      rows={5}
                      value={data[field.name]}
                      onChange={onChange}
                      placeholder={field.placeholder}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-error` : undefined}
                      className={cn(inputClass, "resize-none")}
                    />
                  ) : (
                    <input
                      id={id}
                      name={field.name}
                      type={field.type ?? "text"}
                      value={data[field.name]}
                      onChange={onChange}
                      placeholder={field.placeholder}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-error` : undefined}
                      autoComplete={field.name === "email" ? "email" : field.name === "name" ? "name" : "off"}
                      className={inputClass}
                    />
                  )}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        id={`${id}-error`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5" /> {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {status === "error" && (
              <div
                role="alert"
                className="flex gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400 sm:col-span-2"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <p>L'envoi a échoué. Réessayez ou écrivez directement à {profile.email}.</p>
                  {errorDetail && (
                    <p className="mt-1 break-words font-mono text-[11px] text-red-400/80">Détail : {errorDetail}</p>
                  )}
                </div>
              </div>
            )}

            <div className="sm:col-span-2">
              <button type="submit" disabled={status === "sending"} className="btn-primary group w-full disabled:opacity-60">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
