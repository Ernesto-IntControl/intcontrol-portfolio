import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { ThemeProvider } from "./providers/ThemeProvider";
import { pageLoaders, setupRoutePrefetch } from "./routes";

const ProjectsPage = lazy(pageLoaders["/projets"]);
const ServicesPage = lazy(pageLoaders["/services"]);
const AboutPage = lazy(pageLoaders["/a-propos"]);
const ContactPage = lazy(pageLoaders["/contact"]);

/** Réserve la hauteur pendant le téléchargement du code de la page (évite un saut de mise en page). */
function Page({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-[70svh]" />}>{children}</Suspense>;
}

/** Nouvelle page : retour en haut, ou jusqu'à l'ancre demandée (#slug). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 60);
      return () => window.clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useEffect(() => setupRoutePrefetch(), []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollManager />
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projets" element={<Page><ProjectsPage /></Page>} />
              <Route path="/services" element={<Page><ServicesPage /></Page>} />
              <Route path="/a-propos" element={<Page><AboutPage /></Page>} />
              <Route path="/contact" element={<Page><ContactPage /></Page>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </Layout>
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  );
}
