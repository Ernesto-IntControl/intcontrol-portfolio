import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Cursor from "./components/layout/Cursor";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import ServicesPage from "./pages/ServicesPage";
import { SmoothScroll, useLenis } from "./providers/SmoothScroll";
import { ThemeProvider } from "./providers/ThemeProvider";

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
        <Route path="/projets" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <BrowserRouter>
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
            <Analytics />
          </BrowserRouter>
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
