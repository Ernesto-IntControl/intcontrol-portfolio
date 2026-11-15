import { useEffect } from "react";
import About from "@/src/components/sections/About";
import Contact from "@/src/components/sections/Contact";
import Hero from "@/src/components/sections/Hero";
import Method from "@/src/components/sections/Method";
import Projects from "@/src/components/sections/Projects";
import Stack from "@/src/components/sections/Stack";
import Seo from "@/src/components/Seo";
import { profile } from "@/src/data/profile";

export default function Home() {
  // Arrivée avec une ancre (/#projets, ancienne URL /projets…) : le contenu est rendu
  // après le chargement des polices, donc on rejoint la section nous-mêmes.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Seo
        title={`${profile.name} — ${profile.alias} | Product Owner & ${profile.role}`}
        description={`${profile.name} (${profile.alias}), Product Owner et ${profile.role} chez ${profile.company}. Je pense le produit et j'écris le code : web et mobile avec Next.js, NestJS, Expo et .NET.`}
      />
      <Hero />
      <Projects />
      <Method />
      <About />
      <Stack />
      <Contact />
    </>
  );
}
