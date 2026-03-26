import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Expérience", value: "+1 An" },
    { label: "Clients Satisfaits", value: "+10" },
    { label: "Cofondateur", value: "Intglobal", link: "https://intglobal.services" },
  ];

  return (
    <section id="about" className="py-24 bg-white/60">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-brand-dark">À Propos</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Passionné par le développement logiciel, je me spécialise dans la création d'applications performantes et scalables. Mon expertise s'étend du backend robuste en C# .NET aux interfaces modernes et réactives avec Next.js.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              En tant que cofondateur d'Intglobal Services, je m'efforce d'apporter des solutions technologiques de pointe aux entreprises locales et internationales, en mettant l'accent sur la qualité du code et l'expérience utilisateur.
            </p>
            <Link 
              to="/a-propos" 
              className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand-teal transition-colors group underline underline-offset-4 decoration-brand-teal/40"
            >
              En savoir plus sur mon parcours
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={index === 2 ? "sm:col-span-2" : ""}
              >
                <div className="glass p-8 rounded-2xl group hover:border-brand-teal/50 transition-all border-white/40">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold text-brand-dark">
                    {stat.link ? (
                      <a href={stat.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors">
                        {stat.value}
                      </a>
                    ) : (
                      stat.value
                    )}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
