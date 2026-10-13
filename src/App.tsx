import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Cursor from "./components/layout/Cursor";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import { hideSplash, waitForBoot } from "./lib/boot";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { IntroProvider, shouldPlayIntro } from "./providers/IntroProvider";
import { SmoothScroll, useLenis } from "./providers/SmoothScroll";
import { ThemeProvider } from "./providers/ThemeProvider";
import { pageLoaders, setupRoutePrefetch } from "./routes";

const ProjectsPage = lazy(pageLoaders["/projets"]);
const ServicesPage = lazy(pageLoaders["/services"]);
const AboutPage = lazy(pageLoaders["/a-propos"]);
const ContactPage = lazy(pageLoaders["/contact"]);

/** Réserve la hauteur de la page pendant le téléchargement de son code. */
function Page({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-[100svh]" />}>{children}</Suspense>;
}

function AnimatedRoutes() {
  const location = useLocation();
  const lenis = useLenis();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // La nouvelle page démarre en haut, une fois l'ancienne sortie
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Page><ProjectsPage /></Page>} />
        <Route path="/services" element={<Page><ServicesPage /></Page>} />
        <Route path="/a-propos" element={<Page><AboutPage /></Page>} />
        <Route path="/contact" element={<Page><ContactPage /></Page>} />
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
      hideSplash(shouldPlayIntro());
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
        <SmoothScroll>
          {/* Rien n'est monté avant les polices : les animations d'entrée partent proprement */}
          {ready && (
            <BrowserRouter>
              <IntroProvider>
                <ScrollProgress />
                <Cursor />
                <Navbar />
                <main className="relative">
                  <ErrorBoundary>
                    <AnimatedRoutes />
                  </ErrorBoundary>
                </main>
                <Footer />
                <div className="grain" aria-hidden />
              </IntroProvider>
            </BrowserRouter>
          )}
          <Analytics />
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
