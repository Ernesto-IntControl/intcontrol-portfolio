import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen">
      <Helmet>
        <title>Contact | Intcontrol - Développeur Fullstack</title>
        <meta name="description" content="Contactez Ernest Katumbu (Intcontrol) pour vos projets de développement web et logiciel." />
      </Helmet>
      <div className="container mx-auto px-4 md:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
        <Contact />
      </div>
    </div>
  );
}
