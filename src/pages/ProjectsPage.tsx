import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Github, ArrowLeft, Filter, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { projects as allProjects } from "@/src/data/projects";
import { techIcons } from "@/src/lib/techIcons";

export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const activeFilterCount = [selectedTech, selectedBadge].filter(Boolean).length;

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    allProjects.forEach(p => p.stack.forEach(s => techs.add(s)));
    return Array.from(techs).sort();
  }, []);

  const allBadges = useMemo(() => {
    const badges = new Set<string>();
    allProjects.forEach(p => badges.add(p.badge));
    return Array.from(badges).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchTech = !selectedTech || p.stack.includes(selectedTech);
      const matchBadge = !selectedBadge || p.badge === selectedBadge;
      return matchTech && matchBadge;
    });
  }, [selectedTech, selectedBadge]);

  const resetFilters = () => {
    setSelectedTech(null);
    setSelectedBadge(null);
  };

  return (
    <div id="projects" className="pt-24 md:pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Mes Projets | Intcontrol - Portfolio</title>
        <meta name="description" content="Découvrez mes réalisations en développement web et logiciel. Applications Next.js, .NET Core et plus." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-dark">Tous mes <span className="text-gradient">Projets</span></h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
            Découvrez l'ensemble de mes réalisations, des sites vitrines aux applications web complexes.
          </p>
        </div>

        {/* Filters Section */}
        <div className="glass rounded-[20px] sm:rounded-[24px] mb-8 border-white/40 overflow-hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center gap-3 p-4 sm:p-5"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center shrink-0">
              <Filter className="w-4 h-4 text-brand-teal" />
            </div>
            <span className="font-bold text-brand-dark text-sm">Filtrer les projets</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-brand-teal text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
            <div className="ml-auto flex items-center gap-3">
              {activeFilterCount > 0 && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFilters();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      resetFilters();
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors uppercase tracking-widest"
                >
                  Réinitialiser <X className="w-3 h-3" />
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-5 pb-5 space-y-5">
                  {/* Badge Filter */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Par Type de Projet</p>
                    <div className="flex flex-wrap gap-1.5">
                      {allBadges.map(badge => (
                        <button
                          key={badge}
                          onClick={() => setSelectedBadge(selectedBadge === badge ? null : badge)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedBadge === badge
                            ? "bg-brand-dark border-brand-dark text-white shadow-lg shadow-brand-dark/20"
                            : "bg-white/40 border-white/60 text-slate-600 hover:border-brand-teal hover:text-brand-teal"
                            }`}
                        >
                          {badge}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tech Filter */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Par Technologie</p>
                    <div className="flex flex-wrap gap-1.5">
                      {allTechs.map(tech => (
                        <button
                          key={tech}
                          onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedTech === tech
                            ? "bg-brand-teal border-brand-teal text-white shadow-lg shadow-brand-teal/20"
                            : "bg-white/40 border-white/60 text-slate-600 hover:border-brand-teal hover:text-brand-teal"
                            }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass rounded-3xl overflow-hidden group flex flex-col h-full border-white/40 hover:shadow-2xl hover:shadow-brand-teal/20 transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-slate-50/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={192}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/logo.png";
                      e.currentTarget.className = "w-full h-full object-contain p-10 opacity-30";
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-teal/5 group-hover:bg-brand-teal/0 transition-colors" />
                  {project.status === "In Progress" && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="w-8 h-8 border border-white/20 border-t-white/80 rounded-full"
                      />
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal text-[10px] font-bold uppercase tracking-widest">
                      {project.badge}
                    </span>
                    {project.status && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${project.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                        }`}>
                        {project.status === "In Progress" && (
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1.5 h-1.5 rounded-full bg-amber-500"
                          />
                        )}
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-brand-dark">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => {
                        const Icon = techIcons[tech];
                        return (
                          <span key={tech} className="flex items-center gap-1.5 text-[10px] font-bold text-brand-dark bg-white/40 px-2.5 py-1.5 rounded-lg border border-white/60">
                            {Icon && <Icon size={12} />}
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand-dark text-white text-xs font-bold rounded-xl hover:bg-brand-teal hover:text-brand-dark transition-all shadow-lg shadow-brand-dark/10 group"
                      >
                        {project.status === "Completed" ? "Voir le projet" : "Demo Live"}
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-brand-dark/10 text-brand-dark text-xs font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all group"
                      >
                        Code Source
                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-600 text-lg">Aucun projet ne correspond à vos critères de recherche.</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-brand-teal font-bold hover:underline"
            >
              Voir tous les projets
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
