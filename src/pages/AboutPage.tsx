import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Code2, Cpu, Globe, Rocket, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const stats = [
    { label: "Expérience", value: "+1 An", icon: <Award className="w-5 h-5" /> },
    { label: "Projets", value: "+20", icon: <Rocket className="w-5 h-5" /> },
    { label: "Clients", value: "+10", icon: <Users className="w-5 h-5" /> },
    { label: "Disponibilité", value: "Temps plein", icon: <Globe className="w-5 h-5" /> },
  ];

  const skills = [
    { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },
    { name: "Backend", items: ["C# .NET", "Node.js", "Express", "Entity Framework"] },
    { name: "Base de données", items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"] },
    { name: "Outils", items: ["Git", "Docker", "Azure", "CI/CD"] },
  ];

  return (
    <div id="about" className="pt-32 pb-24">
      <Helmet>
        <title>À Propos | Intcontrol - Développeur Fullstack</title>
        <meta name="description" content="Découvrez le parcours de Ernest Katumbu (Intcontrol), développeur passionné par .NET et les technologies web modernes." />
      </Helmet>
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white/60 shadow-2xl shadow-brand-teal/10">
              <img
                src="./src/assets/images/intcontrol.png"
                alt="Ernest Katumbu"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-teal/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-dark/10 rounded-full blur-3xl -z-10" />

            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl border-white/40 z-20 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Spécialité</p>
                  <p className="text-brand-dark font-bold">Fullstack Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-8 text-brand-dark">À propos de <span className="text-gradient">moi</span></h1>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Je suis <span className="font-bold text-brand-dark">Ernest Katumbu</span>, un développeur logiciel passionné basé en République Démocratique du Congo. Mon parcours est guidé par une curiosité insatiable pour la technologie et un désir constant de résoudre des problèmes complexes par le code.
              </p>
              <p>
                Spécialisé dans l'écosystème <span className="font-bold text-brand-teal">.NET</span> et les technologies web modernes comme <span className="font-bold text-brand-teal">React</span> et <span className="font-bold text-brand-teal">Next.js</span>, je conçois des applications qui allient performance backend et élégance frontend.
              </p>
              <p>
                En tant que co-fondateur et CEO d'Intglobal Services, je travaille sur des projets innovants qui transforment les idées en réalités numériques tangibles, tout en maintenant les plus hauts standards de qualité et de sécurité.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="glass p-6 rounded-2xl border-white/40 hover:border-brand-teal/20 transition-all group">
                  <div className="text-brand-teal mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center text-brand-dark">Mes <span className="text-gradient">Compétences</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-3xl border-brand-teal/5"
              >
                <h3 className="text-brand-teal font-bold mb-6 uppercase text-xs tracking-widest">{skillGroup.name}</h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-teal/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass p-12 rounded-[40px] text-center relative overflow-hidden border-white/40">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-brand-dark">Travaillons ensemble</h2>
            <p className="text-slate-600 mb-10 max-w-xl mx-auto">
              Vous avez un projet passionnant ou vous cherchez un collaborateur talentueux ? Je suis prêt à relever de nouveaux défis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal transition-all shadow-lg shadow-brand-dark/20">
                Me contacter
              </Link>
              <a href="#" className="px-8 py-4 bg-white/60 border border-white/60 text-brand-dark font-bold rounded-xl hover:bg-white/80 transition-all">
                Télécharger mon CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
