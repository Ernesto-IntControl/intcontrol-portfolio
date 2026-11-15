import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import { hideSplash, waitForBoot } from "./lib/boot";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { ThemeProvider } from "./providers/ThemeProvider";
import { pageLoaders, setupRoutePrefetch } from "./routes";

const ProjectsPage = lazy(pageLoaders["/projets"]);
const ProjectPage = lazy(pageLoaders["/projets/:slug"]);
const ExpertisePage = lazy(pageLoaders["/expertise"]);
const AboutPage = lazy(pageLoaders["/a-propos"]);
const ContactPage = lazy(pageLoaders["/contact"]);

/** Réserve la hauteur de la page pendant le téléchargement de son code. */
function Page({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-[100svh]" />}>{children}</Suspense>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      // La nouvelle page démarre en haut, une fois l'ancienne sortie
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Page><ProjectsPage /></Page>} />
        <Route path="/projets/:slug" element={<Page><ProjectPage /></Page>} />
        <Route path="/expertise" element={<Page><ExpertisePage /></Page>} />
        <Route path="/a-propos" element={<Page><AboutPage /></Page>} />
        <Route path="/contact" element={<Page><ContactPage /></Page>} />
        {/* Ancienne page Services, devenue Expertise */}
        <Route path="/services" element={<Navigate to="/expertise" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    waitForBoot().then(() => {
      if (!alive) return;
      setReady(true);
      hideSplash();
    });
    const stopPrefetch = setupRoutePrefetch();
    return () => {
      alive = false;
      stopPrefetch();
    };
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        {/* Rien n'est monté avant les polices : les animations d'entrée partent proprement */}
        {ready && (
          <BrowserRouter>
            <ScrollProgress />
            <Navbar />
            <main className="relative">
              <ErrorBoundary>
                <AnimatedRoutes />
              </ErrorBoundary>
            </main>
            <Footer />
          </BrowserRouter>
        )}
        <Analytics />
      </MotionConfig>
    </ThemeProvider>
  );
}
