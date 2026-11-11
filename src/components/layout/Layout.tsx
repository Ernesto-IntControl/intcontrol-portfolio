import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OfflineNotice from "./OfflineNotice";

/** Structure commune à toutes les pages, partagée par l'app et par le prérendu. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <OfflineNotice />
    </>
  );
}
