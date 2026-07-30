import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise z-0" />
      
      {/* Background Halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-brand-teal/5 rounded-full blur-[80px] md:blur-[120px] z-0" />
      <div className="absolute top-1/3 left-1/3 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] bg-slate-200/20 rounded-full blur-[70px] md:blur-[100px] z-0" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            scale: {
              type: "spring",
              damping: 25,
              stiffness: 90,
              restDelta: 0.001
            }
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight px-2">
            Développeur Fullstack <br />
            <span className="text-gradient">C# (.NET) & Next.js</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="max-w-xl mx-auto text-base sm:text-lg text-slate-600 mb-10 px-2"
          >
            Conception d'architectures robustes et d'interfaces ultra-fluides pour des solutions digitales innovantes.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.55,
                type: "spring",
                stiffness: 160,
                damping: 18
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(32, 178, 170, 0.2)",
                borderColor: "rgba(32, 178, 170, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 glass rounded-xl font-bold text-brand-dark transition-all border-white/40 shadow-lg"
            >
              Voir mes projets
            </motion.button>
            
            <Link
              to="/contact"
              className="no-underline"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.65,
                  type: "spring",
                  stiffness: 160,
                  damping: 18
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(32, 178, 170, 0.4)",
                  backgroundColor: "rgba(32, 178, 170, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-brand-teal/20 rounded-xl font-bold text-slate-700 hover:bg-white/50 transition-all shadow-sm text-center"
              >
                Me contacter
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
