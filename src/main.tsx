import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Le prérendu écrit description et canonical dans le <head> ; <Seo> prend le relais,
// on retire donc les versions statiques pour ne jamais les avoir en double.
document.head.querySelectorAll("[data-prerender]").forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
