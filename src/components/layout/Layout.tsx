import type { ReactNode } from "react";
import Dock from "./Dock";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OfflineNotice from "./OfflineNotice";

/** Structure commune à toutes les pages, partagée par l'app et par le prérendu. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
      <Dock />
      <OfflineNotice />
      <div className="grain" aria-hidden />
    </>
  );
}
