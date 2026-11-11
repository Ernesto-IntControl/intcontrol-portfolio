import { useEffect, useState } from "react";

export function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());
  // Prérendu (pas de navigateur) : pas d'heure figée au moment du build dans le HTML
  const [time, setTime] = useState(() => (typeof window === "undefined" ? "--:--" : format()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
