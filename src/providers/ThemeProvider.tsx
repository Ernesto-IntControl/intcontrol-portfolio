import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  // La barre du navigateur mobile suit le thème choisi, pas seulement celui du système
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", theme === "dark" ? "#07090c" : "#f4f5f7"));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);

  // Suit le thème système tant que l'utilisateur n'a rien choisi explicitement
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        /* stockage indisponible : on suit le système */
      }
      const next: Theme = e.matches ? "light" : "dark";
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* navigation privée : le choix ne sera pas mémorisé */
      }

      let committed = false;
      const commit = () => {
        if (committed) return;
        committed = true;
        applyTheme(next);
        flushSync(() => setTheme(next));
      };

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!("startViewTransition" in document) || reduceMotion) {
        commit();
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      const transition = document.startViewTransition(commit);
      // Si le navigateur ne produit pas de frame à temps, on bascule sans animation
      window.setTimeout(() => {
        if (committed) return;
        transition.skipTransition();
        commit();
      }, 400);
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    },
    [theme],
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans <ThemeProvider>");
  return ctx;
}
