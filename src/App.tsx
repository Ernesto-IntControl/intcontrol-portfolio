import { Analytics } from "@vercel/analytics/react";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import { hideSplash, waitForBoot } from "./lib/boot";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { ThemeProvider } from "./providers/ThemeProvider";

/** Anciennes pages, désormais des sections de l'accueil : les liens existants continuent de fonctionner. */
const legacyRoutes: Record<string, string> = {
  "/projets": "projets",
  "/services": "methode",
  "/a-propos": "a-propos",
  "/contact": "contact",
};

function resolvePage(): "home" | "404" {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path in legacyRoutes) {
    window.history.replaceState(null, "", `/#${legacyRoutes[path]}`);
    return "home";
  }
  return path === "/" || path === "/index.html" ? "home" : "404";
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [page] = useState(resolvePage);

  useEffect(() => {
    let alive = true;
    waitForBoot().then(() => {
      if (!alive) return;
      setReady(true);
      hideSplash();
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        {/* Rien n'est monté avant les polices : les animations d'entrée partent proprement */}
        {ready && (
          <>
            <ScrollProgress />
            <Navbar />
            <main className="relative">
              <ErrorBoundary>{page === "home" ? <Home /> : <NotFoundPage />}</ErrorBoundary>
            </main>
            <Footer />
          </>
        )}
        <Analytics />
      </MotionConfig>
    </ThemeProvider>
  );
}
