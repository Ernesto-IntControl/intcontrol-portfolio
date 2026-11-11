import { renderToString } from "react-dom/server";
import { Route, Routes, StaticRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { pageMeta, SITE_URL, type PagePath } from "./data/seo";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ServicesPage from "./pages/ServicesPage";
import { ThemeProvider } from "./providers/ThemeProvider";

export { pageMeta, SITE_URL };

/** Rend une page en HTML, pour le prérendu au build (scripts/prerender.mjs). */
export function render(path: PagePath) {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={path}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </StaticRouter>
    </ThemeProvider>,
  );
}
