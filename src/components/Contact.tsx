import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Linkedin, Github, Twitter } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.subject.trim()) newErrors.subject = "Le sujet est requis";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Ernest Katumbu",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
      );

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="glass p-8 md:p-12 lg:p-20 rounded-[32px] md:rounded-[40px] relative overflow-hidden border-white/40">
          {/* Background Glows */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-teal/20 rounded-full blur-[100px]" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-slate-200/30 rounded-full blur-[100px]" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-brand-dark">Un projet en tête ?</h2>
              <p className="text-slate-600 text-base md:text-lg mb-8 md:mb-12 max-w-md">
                Je suis toujours ouvert à de nouvelles opportunités et collaborations. Discutons de la manière dont je peux vous aider.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-teal/20 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                    <Phone className="w-5 h-5 md:w-7 md:h-7 text-brand-dark group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-0.5 md:mb-1">Téléphone</p>
                    <a href="tel:+243843351254" className="text-brand-dark font-bold text-lg md:text-xl hover:text-brand-teal transition-colors break-all">+243 843351254</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-teal/20 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all duration-500 group-hover:-rotate-6 shadow-sm">
                    <Mail className="w-5 h-5 md:w-7 md:h-7 text-brand-dark group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-0.5 md:mb-1">Email</p>
                    <a href="mailto:katumbuernest@gmail.com" className="text-brand-dark font-bold text-lg md:text-xl hover:text-brand-teal transition-colors break-all">katumbuernest@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-teal/20 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                    <MapPin className="w-5 h-5 md:w-7 md:h-7 text-brand-dark group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-0.5 md:mb-1">Localisation</p>
                    <p className="text-brand-dark font-bold text-lg md:text-xl">Kolwezi, Lualaba, RDC</p>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Suivez-moi</p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", color: "hover:bg-brand-teal/20 hover:text-brand-dark", href: "https://www.linkedin.com/in/ernest-katumbu-b87aa7265" },
                      { icon: <Github className="w-5 h-5" />, label: "GitHub", color: "hover:bg-brand-dark/20 hover:text-brand-dark", href: "https://github.com/Ernesto-IntControl" },
                      { icon: <Twitter className="w-5 h-5" />, label: "Twitter", color: "hover:bg-sky-500/20 hover:text-sky-500", href: "https://twitter.com/Intcontrol1" }
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/40 flex items-center justify-center text-slate-600 transition-all duration-300 ${social.color} border border-white/60 hover:border-transparent shadow-sm`}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50/50 backdrop-blur-sm border border-green-200 p-8 md:p-10 rounded-[24px] md:rounded-[32px] text-center shadow-xl"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-3">Message envoyé !</h3>
                    <p className="text-green-700 text-lg">Merci pour votre message. Je vous recontacterai très prochainement.</p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nom complet</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ex: intcontrol"
                          className={`w-full bg-white/60 backdrop-blur-sm border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-brand-dark placeholder:text-slate-400 focus:outline-none transition-all ${errors.name ? "border-red-400 bg-red-50/50 focus:ring-2 ring-red-100" : "border-slate-200 focus:border-brand-teal focus:ring-4 ring-brand-teal/5 shadow-sm"
                            }`}
                        />
                        {errors.name && (
                          <p className="text-[10px] text-red-500 font-bold flex items-center gap-1.5 px-2">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email professionnel</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: int@exemple.com"
                          className={`w-full bg-white/60 backdrop-blur-sm border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-brand-dark placeholder:text-slate-400 focus:outline-none transition-all ${errors.email ? "border-red-400 bg-red-50/50 focus:ring-2 ring-red-100" : "border-slate-200 focus:border-brand-teal focus:ring-4 ring-brand-teal/5 shadow-sm"
                            }`}
                        />
                        {errors.email && (
                          <p className="text-[10px] text-red-500 font-bold flex items-center gap-1.5 px-2">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Sujet</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Ex: Demande de devis / Collaboration"
                        className={`w-full bg-white/60 backdrop-blur-sm border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-brand-dark placeholder:text-slate-400 focus:outline-none transition-all ${errors.subject ? "border-red-400 bg-red-50/50 focus:ring-2 ring-red-100" : "border-slate-200 focus:border-brand-teal focus:ring-4 ring-brand-teal/5 shadow-sm"
                          }`}
                      />
                      {errors.subject && (
                        <p className="text-[10px] text-red-500 font-bold flex items-center gap-1.5 px-2">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Comment puis-je vous aider ?"
                        rows={5}
                        className={`w-full bg-white/60 backdrop-blur-sm border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-brand-dark placeholder:text-slate-400 focus:outline-none transition-all resize-none ${errors.message ? "border-red-400 bg-red-50/50 focus:ring-2 ring-red-100" : "border-slate-200 focus:border-brand-teal focus:ring-4 ring-brand-teal/5 shadow-sm"
                          }`}
                      ></textarea>
                      {errors.message && (
                        <p className="text-[10px] text-red-500 font-bold flex items-center gap-1.5 px-2">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      disabled={isSubmitting}
                      className="w-full py-4 md:py-5 bg-brand-dark text-white font-bold rounded-xl md:rounded-2xl hover:bg-brand-teal transition-all shadow-xl shadow-brand-dark/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base md:text-lg group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </motion.div>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
