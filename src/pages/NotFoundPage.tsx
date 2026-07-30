import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-24 px-6 relative overflow-hidden">
      <Helmet>
        <title>404 - Page non trouvée | Intcontrol</title>
      </Helmet>

      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-brand-teal/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />

      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-brand-dark opacity-10 mb-[-1.25rem] sm:mb-[-1.75rem] md:mb-[-2rem]">404</h1>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-brand-dark">Oups ! Page égarée</h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 leading-relaxed">
            La page que vous recherchez semble s'être envolée ou n'a jamais existé. Pas d'inquiétude, revenons sur le bon chemin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-8 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal transition-all shadow-lg shadow-brand-dark/20 group w-full sm:w-auto"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-white/60 border border-white/60 text-brand-dark font-bold rounded-xl hover:bg-white/80 transition-all w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
