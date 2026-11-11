import { WifiOff } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

/** Connexion coupée : on le dit, plutôt que de laisser croire à une panne du site. */
export default function OfflineNotice() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  if (online) return null;
  return (
    <p
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex w-fit items-center gap-2 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-xs shadow-lg"
    >
      <WifiOff className="h-3.5 w-3.5 text-fun" aria-hidden />
      Connexion perdue. Le contenu déjà chargé reste consultable.
    </p>
  );
}
