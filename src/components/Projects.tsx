import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white/40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-dark">Projets Récents</h2>
            <p className="text-slate-600">Une sélection de mes travaux les plus significatifs.</p>
          </div>
          <button className="text-brand-dark font-bold flex items-center gap-2 hover:text-brand-teal transition-colors">
            Voir tout sur GitHub <a href="#"><Github className="w-5 h-5" /></a>
          </button>
        </div>

        <div className="space-y-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              variants={{
                hover: {
                  y: -10,
                  boxShadow: "0 30px 60px rgba(32, 178, 170, 0.1)"
                }
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl overflow-hidden group transition-all duration-300 border-white/40"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative overflow-hidden h-64 md:h-auto bg-slate-50/50">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    className="absolute inset-0 w-full h-full object-contain p-6"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/logo.png";
                      e.currentTarget.className = "absolute inset-0 w-full h-full object-contain p-16 opacity-30";
                    }}
                    variants={{
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-brand-teal/5 pointer-events-none"
                    variants={{
                      hover: { opacity: 0 }
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-teal/20 text-brand-dark text-xs font-bold uppercase tracking-widest">
                      {project.badge}
                    </span>
                    {project.status && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${project.status === "Completed"
                        ? "bg-brand-dark/10 text-brand-dark"
                        : "bg-brand-teal/20 text-brand-teal"
                        }`}>
                        {project.status === "In Progress" && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                          </span>
                        )}
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-brand-dark">{project.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <span key={tech} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-white/40 px-2.5 py-1.5 rounded-lg border border-white/60 shadow-sm">
                          {Icon && <Icon size={12} />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-dark text-white text-xs font-bold rounded-xl hover:bg-brand-teal hover:text-brand-dark transition-all shadow-lg shadow-brand-dark/10 group"
                    >
                      {project.status === "Completed" ? "Voir le projet" : "Demo Live"}
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-brand-dark/10 text-brand-dark text-xs font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all group"
                    >
                      Code Source
                      <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
