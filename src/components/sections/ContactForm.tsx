import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { profile } from "@/src/data/profile";
import { cn } from "@/src/lib/utils";

type Field = "name" | "email" | "subject" | "message";
type FormState = Record<Field, string>;

const empty: FormState = { name: "", email: "", subject: "", message: "" };

const fields: { name: Field; label: string; placeholder: string; type?: string; multiline?: boolean; half?: boolean }[] = [
  { name: "name", label: "Nom", placeholder: "Votre nom", half: true },
  { name: "email", label: "Email", placeholder: "vous@entreprise.com", type: "email", half: true },
  { name: "subject", label: "Sujet", placeholder: "Devis, collaboration…" },
  { name: "message", label: "Message", placeholder: "Parlez-moi de votre projet", multiline: true },
];

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
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message, to_name: profile.name },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key_placeholder",
      );
      setData(empty);
      setStatus("success");
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center p-8 text-center">
        <CheckCircle2 className="h-9 w-9 text-accent" />
        <h3 className="mt-3 text-lg font-semibold">Message envoyé</h3>
        <p className="mt-1 text-[13.5px] text-muted">Merci ! Je reviens vers vous très vite.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn mt-5">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
      {fields.map((field) => {
        const error = errors[field.name];
        const id = `contact-${field.name}`;
        const cls = cn(
          "w-full rounded-lg border bg-bg px-3 py-2.5 text-[15px] text-fg placeholder:text-subtle transition-colors focus:outline-none",
          error ? "border-red-400/70" : "border-line focus:border-accent",
        );
        return (
          <div key={field.name} className={cn("space-y-1.5", !field.half && "sm:col-span-2")}>
            <label htmlFor={id} className="label block">
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
                className={cn(cls, "resize-none")}
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
                className={cls}
              />
            )}
            {error && (
              <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-3.5 w-3.5" /> {error}
              </p>
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-[13px] text-red-500 sm:col-span-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          L'envoi a échoué. Réessayez ou écrivez directement à {profile.email}.
        </p>
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-solid h-10 w-full disabled:opacity-60 sm:w-auto sm:px-5">
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
            </>
          ) : (
            <>
              Envoyer <Send className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
