import { Linkedin, Github, Twitter, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const socialBaseClass = "w-10 h-10 rounded-full bg-brand-teal/5 flex items-center justify-center text-slate-600 transition-all duration-300";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-24 pb-12 border-t border-white/40 bg-white/40 backdrop-blur-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-brand-teal/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-1">
              <span className="font-titles font-bold text-xl tracking-widest text-brand-dark">
                INTCONTROL
              </span>
              <div className="w-2 h-2 rounded-full bg-brand-teal" />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Développeur Fullstack passionné par la création d'expériences numériques exceptionnelles et d'architectures logicielles robustes.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/ernest-katumbu-b87aa7265"
                className={cn(socialBaseClass, "hover:bg-brand-teal/10 hover:text-brand-teal")}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Ernesto-IntControl"
                className={cn(socialBaseClass, "hover:bg-brand-dark/10 hover:text-brand-dark")}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/Intcontrol1"
                className={cn(socialBaseClass, "hover:bg-sky-500/10 hover:text-sky-500")}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase text-[10px] tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Accueil", href: isHome ? "#" : "/" },
                { name: "À propos", href: isHome ? "#about" : "/a-propos#about" },
                { name: "Services", href: isHome ? "#services" : "/services#services" },
                { name: "Projets", href: isHome ? "#projects" : "/projets#projects" },
                { name: "Contact", href: isHome ? "#contact" : "/#contact" }
              ].map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase text-[10px] tracking-widest">Services</h4>
            <ul className="space-y-4">
              {[
                "Développement Web",
                "Applications .NET",
                "Architecture Cloud",
                "Consulting Tech",
                "UI/UX Design"
              ].map((item) => (
                <li key={item} className="text-slate-600 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase text-[10px] tracking-widest">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span>Kolwezi, Lualaba, République Démocratique du Congo</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-800 shrink-0" />
                <span><a href="tel:+243843351254">+243 843351254</a></span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-800 shrink-0" />
                <span><a href="mailto:katumbuernest@gmail.com">katumbuernest@gmail.com</a></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Intcontrol. Tous droits réservés. <br className="md:hidden" />
            Conçu avec passion par Intcontrol.
          </p>

          <motion.button
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-bold text-brand-dark uppercase tracking-widest hover:text-brand-teal transition-colors group"
          >
            Retour en haut
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-brand-dark transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
