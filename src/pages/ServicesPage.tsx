import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Code2, Layout, Database, Cloud, Smartphone, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const services = [
    {
      title: "Développement Web Fullstack",
      icon: <Layout className="w-8 h-8 text-brand-teal" />,
      description: "Création d'applications web modernes, réactives et performantes en utilisant Next.js, React et Tailwind CSS.",
      features: ["Interfaces SPA/SSR", "Optimisation SEO", "Design Responsive", "Intégration API"],
      mastery: 95
    },
    {
      title: "Solutions Backend .NET",
      icon: <Code2 className="w-8 h-8 text-brand-dark" />,
      description: "Conception d'architectures backend robustes et sécurisées avec C# et .NET Core pour vos besoins métiers.",
      features: ["API RESTful", "Microservices", "Authentification JWT", "Logique Métier Complexe"],
      mastery: 90
    },
    {
      title: "Gestion de Bases de Données",
      icon: <Database className="w-8 h-8 text-brand-teal" />,
      description: "Modélisation et optimisation de bases de données relationnelles et non-relationnelles.",
      features: ["SQL Server", "PostgreSQL", "MySQL", "Optimisation de Requêtes"],
      mastery: 85
    },
    {
      title: "Architecture Cloud & DevOps",
      icon: <Cloud className="w-8 h-8 text-brand-dark" />,
      description: "Déploiement et gestion d'infrastructures cloud pour garantir la scalabilité de vos projets.",
      features: ["Azure / AWS", "Docker & CI/CD", "Monitoring", "Sécurité Cloud"],
      mastery: 80
    },
    {
      title: "Développement Mobile",
      icon: <Smartphone className="w-8 h-8 text-brand-teal" />,
      description: "Création d'expériences mobiles fluides pour iOS et Android.",
      features: ["React Native", "PWA", "UI Native", "Performance Mobile"],
      mastery: 75
    },
    {
      title: "Consulting & Audit Tech",
      icon: <Search className="w-8 h-8 text-brand-dark" />,
      description: "Accompagnement stratégique et audit de vos systèmes existants pour une meilleure efficacité.",
      features: ["Audit de Code", "Conseil Architecture", "Formation Tech", "Planification Digitale"],
      mastery: 90
    }
  ];

  return (
    <div id="services" className="pt-32 pb-24">
      <Helmet>
        <title>Mes Services | Intcontrol - Expertise Fullstack</title>
        <meta name="description" content="Développement Web Fullstack, Backend .NET, Cloud et Consulting. Des solutions sur mesure pour vos projets digitaux." />
      </Helmet>
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
        
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6 text-brand-dark">Mes <span className="text-gradient">Services</span></h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Des solutions technologiques sur mesure pour propulser votre entreprise dans l'ère digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(32, 178, 170, 0.1)" }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl transition-all duration-300 group border-white/40"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-8 transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">{service.title}</h3>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Maîtrise de l'expertise</span>
                  <span className="text-xs font-bold text-brand-dark">{service.mastery}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${service.mastery}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-brand-teal relative"
                  >
                    <motion.div 
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-white/20" 
                    />
                  </motion.div>
                </div>
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 glass p-12 rounded-[40px] text-center relative overflow-hidden border-white/40">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-brand-dark">Besoin d'un service spécifique ?</h2>
                <p className="text-slate-600 mb-10 max-w-xl mx-auto">
                    Chaque projet est unique. Contactez-moi pour discuter de vos besoins particuliers et obtenir un devis personnalisé.
                </p>
                <Link to="/contact" className="px-8 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal transition-all inline-block shadow-lg shadow-brand-dark/20">
                    Discutons de votre projet
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
