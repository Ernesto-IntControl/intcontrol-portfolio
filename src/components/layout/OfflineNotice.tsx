import { WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { EASE_OUT_EXPO } from "@/src/lib/motion";

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

/**
 * Connexion coupée : on le dit, juste au-dessus du dock, plutôt que de laisser
 * croire à une panne du site. Ce qui est déjà chargé reste consultable.
 */
export default function OfflineNotice() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          role="status"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="pointer-events-none fixed inset-x-0 bottom-[calc(max(0.875rem,env(safe-area-inset-bottom))+4.25rem)] z-50 flex justify-center px-4"
        >
          <p className="flex items-center gap-2 rounded-full border border-line-strong bg-bg/90 px-4 py-2 text-xs text-fg shadow-[var(--shadow-float)] backdrop-blur-xl">
            <WifiOff className="h-3.5 w-3.5 text-amber-500" aria-hidden />
            Connexion perdue. Le contenu déjà chargé reste consultable.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
