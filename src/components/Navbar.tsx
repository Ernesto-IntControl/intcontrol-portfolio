import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, Github } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { name: "Accueil", href: isHome ? "#" : "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Projets", href: "/projets" },


  ];

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isOpen ? -100 : 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="IntGlobal Services Logo" className="h-8 md:h-10 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isAnchor = link.href.includes("#");

              if (isAnchor && isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-brand-teal transition-colors"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === link.href ? "text-brand-dark font-bold" : "text-slate-600 hover:text-brand-teal"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-5 py-2 bg-brand-dark text-white text-xs font-bold rounded-full hover:bg-brand-teal hover:text-brand-dark transition-all shadow-lg shadow-brand-dark/10"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-dark p-1 hover:text-brand-teal transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-white/40 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative h-full flex flex-col items-center justify-center gap-6 p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 flex justify-center w-full"
              >
                <img src="/logo.png" alt="IntGlobal Services Logo" className="h-12 md:h-14 w-auto object-contain" />
              </motion.div>

              {navLinks.map((link, index) => {
                const isAnchor = link.href.includes("#");

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isAnchor && isHome ? (
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-bold text-slate-700 hover:text-brand-teal transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-xl font-bold transition-colors",
                          location.pathname === link.href ? "text-brand-dark" : "text-slate-700 hover:text-brand-teal"
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="px-8 py-4 bg-brand-dark text-white font-bold rounded-2xl hover:bg-brand-teal hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/10 text-center"
              >
                Démarrer un projet
              </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex gap-6"
              >
                {/* Social links in mobile menu */}
                <a
                  href="https://www.linkedin.com/in/ernest-katumbu-b87aa7265"
                  className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center text-slate-600 hover:text-brand-teal transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Ernesto-IntControl"
                  className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center text-slate-600 hover:text-brand-teal transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </motion.div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-10 right-10 text-brand-dark p-2 hover:text-brand-teal transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
