import { Home, Layers, LayoutGrid, Mail, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { useIntro } from "@/src/providers/IntroProvider";
import { cn } from "@/src/lib/utils";

const items = [
  { name: "Accueil", to: "/", icon: Home },
  { name: "Projets", to: "/projets", icon: LayoutGrid },
  { name: "Services", to: "/services", icon: Layers },
  { name: "À propos", to: "/a-propos", icon: UserRound },
  { name: "Contact", to: "/contact", icon: Mail },
];

/**
 * Navigation principale : un dock flottant en bas d'écran, à portée de pouce,
 * identique sur téléphone et sur ordinateur. La page courante affiche son nom,
 * les autres se déplient au survol. Les transitions sont en CSS pur : rien à
 * mesurer en JavaScript, donc fluide même sur un appareil modeste.
 */
export default function Dock() {
  const { revealed } = useIntro();
  const typing = useTypingOnTouch();
  const shown = revealed && !typing;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-2 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
      <motion.nav
        aria-label="Navigation principale"
        initial={{ y: 96, opacity: 0 }}
        animate={shown ? { y: 0, opacity: 1 } : { y: 96, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: shown ? 0.15 : 0 }}
        // Masqué (intro, saisie au clavier) : ni cliquable ni atteignable au clavier
        inert={!shown}
        className="pointer-events-auto rounded-full border border-line bg-bg/75 p-1.5 shadow-[var(--shadow-float)] backdrop-blur-xl"
      >
        <ul className="flex items-center gap-0.5">
          {items.map(({ name, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  cn(
                    // Sous 360 px de large, les boutons se resserrent pour que le libellé actif tienne en entier
                    "group relative flex h-11 min-w-10 items-center justify-center rounded-full px-3 transition-colors duration-500 min-[360px]:min-w-11 min-[360px]:px-3.5",
                    isActive ? "text-invert-fg" : "text-muted hover:text-fg",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 rounded-full bg-invert transition-[opacity,scale] duration-500 ease-out-expo",
                        isActive ? "scale-100 opacity-100" : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-10",
                      )}
                    />
                    <Icon className="relative h-[18px] w-[18px] shrink-0" strokeWidth={1.9} aria-hidden />
                    {/* Le libellé se déplie via grid 0fr → 1fr : une largeur animée sans mesure JS */}
                    <span
                      className={cn(
                        "relative grid transition-[grid-template-columns,margin] duration-500 ease-out-expo",
                        isActive ? "ml-2 grid-cols-[1fr]" : "ml-0 grid-cols-[0fr] group-hover:ml-2 group-hover:grid-cols-[1fr]",
                      )}
                    >
                      <span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">{name}</span>
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}

/** Sur écran tactile, le dock s'efface pendant la saisie : il ne doit pas flotter au-dessus du clavier. */
function useTypingOnTouch() {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    const isField = (target: EventTarget | null) =>
      target instanceof HTMLElement && target.matches("input, textarea, select, [contenteditable='true']");
    const onFocusIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onFocusOut = () => setTyping(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return typing;
}
