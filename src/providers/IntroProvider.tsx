import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import IntroOverlay from "@/src/components/layout/IntroOverlay";
import { useLenis } from "./SmoothScroll";

/*
 * Intro de marque jouée à l'arrivée sur le site (une fois par session) :
 *   enter  → l'emblème se dessine, INTCONTROL se forme, le sous-titre se décode
 *   exit   → les lettres s'envolent, le rideau se lève, l'emblème rejoint le logo
 *   done   → l'overlay est retiré, la page est interactive
 * `revealed` passe à vrai pendant la sortie : le hero et la navigation s'animent
 * au moment où le rideau les découvre.
 */

export type IntroPhase = "enter" | "exit" | "done";

/** Durées (ms) : assez long pour impressionner, assez court pour ne pas lasser. */
export const INTRO_ENTER_MS = 2300;
export const INTRO_EXIT_MS = 1500;
const REVEAL_AFTER_EXIT_MS = 550;
const STORAGE_KEY = "intcontrol:intro-played";

interface IntroState {
  /** L'intro est jouée pendant ce chargement. */
  played: boolean;
  /** Le contenu peut lancer ses animations d'entrée. */
  revealed: boolean;
  /** L'intro est terminée et retirée. */
  done: boolean;
}

const IntroContext = createContext<IntroState>({ played: false, revealed: true, done: true });

/** Pas d'intro si l'utilisateur préfère moins d'animations, ou s'il l'a déjà vue dans cette session. */
export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [played] = useState(shouldPlayIntro);
  const [phase, setPhase] = useState<IntroPhase>(played ? "enter" : "done");
  const [revealed, setRevealed] = useState(!played);
  const lenis = useLenis();

  // Phase d'entrée, puis sortie automatique
  useEffect(() => {
    if (!played) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* navigation privée : l'intro rejouera au prochain chargement */
    }
    const id = window.setTimeout(() => setPhase((p) => (p === "enter" ? "exit" : p)), INTRO_ENTER_MS);
    return () => window.clearTimeout(id);
  }, [played]);

  // Sortie : révélation du contenu, puis retrait de l'overlay
  useEffect(() => {
    if (phase !== "exit") return;
    const reveal = window.setTimeout(() => setRevealed(true), REVEAL_AFTER_EXIT_MS);
    const finish = window.setTimeout(() => setPhase("done"), INTRO_EXIT_MS);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
    };
  }, [phase]);

  // Pas de scroll pendant l'intro (molette via Lenis, tactile via overflow)
  const locked = phase !== "done";
  useEffect(() => {
    if (!locked) return;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
    };
  }, [locked, lenis]);

  // Un clic, un toucher ou une touche passent directement à la sortie
  const skip = useCallback(() => setPhase((p) => (p === "enter" ? "exit" : p)), []);
  useEffect(() => {
    if (phase !== "enter") return;
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skip]);

  return (
    <IntroContext.Provider value={{ played, revealed, done: phase === "done" }}>
      {children}
      {phase !== "done" && <IntroOverlay phase={phase} onSkip={skip} />}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
