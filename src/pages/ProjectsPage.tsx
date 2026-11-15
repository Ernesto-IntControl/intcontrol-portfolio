import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "@/src/components/layout/PageTransition";
import CaseStudy from "@/src/components/sections/CaseStudy";
import ContactCTA from "@/src/components/sections/ContactCTA";
import OtherWorkGrid from "@/src/components/sections/OtherWork";
import ProjectCard from "@/src/components/sections/ProjectCard";
import Seo from "@/src/components/Seo";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { ongoing, projects, showcases } from "@/src/data/projects";
import NotFoundPage from "./NotFoundPage";

/**
 * Les projets. Une étude de cas s'ouvre sur place (/projets/:slug) : les autres cartes
 * s'effacent, celle du projet se réduit en bandeau et l'étude se déploie dessous.
 */
export default function ProjectsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const selected = projects.find((p) => p.slug === slug);
  /** Projet en cours d'ouverture : les autres cartes s'effacent avant la transformation. */
  const [leaving, setLeaving] = useState<string | null>(null);

  /** Ramène le haut de la liste sous la navigation, puis exécute `then` une fois le défilement fini. */
  const bringListIntoView = (then?: () => void) => {
    const el = listRef.current;
    const top = el ? el.getBoundingClientRect().top + window.scrollY - 104 : window.scrollY;
    if (!el || Math.abs(window.scrollY - top) < 8) {
      then?.();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", finish);
      then?.();
    };
    window.addEventListener("scrollend", finish, { once: true });
    window.setTimeout(finish, 700); // navigateurs sans « scrollend »
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Arrivée directe sur une étude (/projets/:slug) : on la rejoint
  useEffect(() => {
    if (!slug) return;
    const id = window.setTimeout(() => bringListIntoView(), 120);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (slug && !selected) return <NotFoundPage />;

  // Trois temps : la liste remonte sous la navigation, les autres cartes s'effacent,
  // puis la carte choisie se réduit en bandeau et l'étude se déploie dessous
  const open = (s: string) =>
    bringListIntoView(() => {
      if (selected) {
        navigate(`/projets/${s}`);
        return;
      }
      setLeaving(s);
      window.setTimeout(() => {
        navigate(`/projets/${s}`);
        setLeaving(null);
      }, 320);
    });
  const close = () => navigate("/projets");
  const visible = selected ? [selected] : projects;

  return (
    <PageTransition>
      <Seo
        title={selected ? `${selected.title} — Étude de cas | Ernest Katumbi — INTCONTROL` : "Projets | Ernest Katumbi — INTCONTROL"}
        description={
          selected
            ? `${selected.title}${selected.fullName ? ` (${selected.fullName})` : ""} : ${selected.tagline}`
            : "Madebocar, Josma, Ngo Chat, et les projets en cours (Intflow, Helpy, IntSchool, Simara) d'Ernest Katumbi (INTCONTROL), Product Owner et Lead Software Engineer."
        }
        path={selected ? `/projets/${selected.slug}` : "/projets"}
      />

      <section className="container-x pt-36 sm:pt-44">
        <SectionHeading
          as="h1"
          index="02"
          label="Projets"
          title={[{ text: "Des produits " }, { text: "en mouvement.", className: "serif-accent text-accent" }]}
          intro="Mobilité, gestion commerciale, réseau social : chaque étude de cas raconte le problème, le produit et mon rôle, de la vision jusqu'au code."
        />

        <div ref={listRef} className="mt-14 scroll-mt-28 sm:mt-20">
          <LayoutGroup>
            <div className={selected ? "" : "grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3"}>
              {visible.map((project) => (
                <motion.div
                  key={project.slug}
                  animate={leaving && leaving !== project.slug ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <ProjectCard
                    project={project}
                    index={projects.indexOf(project)}
                    total={projects.length}
                    variant={selected ? "header" : "card"}
                    onOpen={() => open(project.slug)}
                    onClose={close}
                  />
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {selected && <CaseStudy key={selected.slug} project={selected} onOpen={open} />}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>

      <section className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="02.1"
          label="En cours"
          title={[{ text: "Sur l'établi, " }, { text: "en ce moment.", className: "serif-accent text-accent" }]}
          intro="Des produits en cours de développement, dont certains ont déjà leur site."
        />
        <OtherWorkGrid items={ongoing} className="mt-12 sm:mt-16" />
      </section>

      <section className="container-x pt-24 sm:pt-32">
        <SectionHeading
          index="02.2"
          label="Sites vitrines"
          title={[{ text: "Présenter, " }, { text: "convaincre.", className: "serif-accent text-accent" }]}
          intro="Des sites qui présentent une entreprise, ses produits et ses services."
        />
        <OtherWorkGrid items={showcases} wide className="mt-12 sm:mt-16" />
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
