import { clsx, type ClassValue } from "clsx";

/** Concatène des classes conditionnelles (sans fusion des conflits Tailwind : on évite d'en créer). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
